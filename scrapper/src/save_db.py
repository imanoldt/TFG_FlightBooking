import pandas as pd
from influxdb_client import InfluxDBClient, Point, WriteOptions
from datetime import datetime
import os
import logging

# Configurar logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# Parámetros de conexión a InfluxDB
url = 'http://localhost:8086'
token = '385212cd308a4510dd31808eb7e45f10c3ecab467518f9b7b027e1eb9abb081a'
org = 'skysculptor'
bucket = 'data'

# Definición de códigos de llegada válidos y asociaciones con ciudades
valid_arrivals = {
    "BIO": "Bilbao",
    "LPA": "Gran Canaria",
    "MAD": "Madrid-Barajas",
    "IBZ": "Ibiza",
    "LGW": "Londres-Gatwick",
    "AGP": "Málaga-Costa del Sol",
    "CDG": "Charles de Gaulle",
    "BCN": "Barcelona-El Prat",
    "SVQ": "Sevilla",
    "AMS": "Ámsterdam-Schiphol",
    "LAX": "Los Ángeles",
    "ORY": "París-Orly",
}

def convert_duration_to_minutes(duration_str):
    try:
        logging.debug('Convirtiendo duración: %s', duration_str)
        if 'h' in duration_str and 'm' in duration_str:
            hours, minutes = duration_str.split('h')
            total_minutes = int(hours) * 60 + int(minutes.replace('m', '').strip())
            logging.debug('Duración en minutos: %d', total_minutes)
            return total_minutes
        elif 'h' in duration_str:
            hours = duration_str.replace('h', '').strip()
            total_minutes = int(hours) * 60
            logging.debug('Duración en minutos: %d', total_minutes)
            return total_minutes
        elif 'm' in duration_str:
            minutes = duration_str.replace('m', '').strip()
            total_minutes = int(minutes)
            logging.debug('Duración en minutos: %d', total_minutes)
            return total_minutes
        else:
            logging.debug('Duración inválida')
            return None
    except Exception as e:
        logging.error('Error convirtiendo duración: %s', e)
        return None

def clean_price(price_str):
    try:
        logging.debug('Limpiando precio: %s', price_str)
        if ' €' in price_str:
            price = int(float(price_str.replace(' €', '').replace(',', '.')))
            logging.debug('Precio limpio: %d', price)
            return price
        else:
            logging.debug('Precio inválido')
            return None
    except Exception as e:
        logging.error('Error limpiando precio: %s', e)
        return None

def is_valid_airport(airport_code, airport_name):
    logging.debug('Validando aeropuerto: %s, %s', airport_code, airport_name)
    if pd.isna(airport_code) or pd.isna(airport_name):
        logging.debug('Código o nombre de aeropuerto nulo')
        return False
    if airport_code in valid_arrivals and valid_arrivals[airport_code] in airport_name:
        logging.debug('Aeropuerto válido')
        return True
    logging.debug('Aeropuerto inválido')
    return False

def add_to_influxdb(departure_time, departure_airport, arrival_airport, stop_airports, duration, airlines, price, info_date_save, flight_date):
    logging.info('Añadiendo datos a InfluxDB')
    logging.debug('Datos recibidos: %s, %s, %s, %s, %s, %s, %s, %s, %s', departure_time, departure_airport, arrival_airport, stop_airports, duration, airlines, price, info_date_save, flight_date)
    
    # Extraer código y nombre del aeropuerto de salida
    departure_cod = departure_airport[:3].upper()
    departure_airport_name = departure_airport[3:]

    # Extraer código y nombre del aeropuerto de llegada
    arrival_cod = arrival_airport[:3].upper()
    arrival_airport_name = arrival_airport[3:]

    # Crear un DataFrame con los datos recibidos
    data = pd.DataFrame([{
        'Departure Time': departure_time,
        'Departure Airport': departure_airport_name,
        'Arrival Airport': arrival_airport_name,
        'Stop Airports': stop_airports,
        'Duration': duration,
        'Airlines': airlines,
        'Price': price,
        'Info Date Save': info_date_save,
        'Flight Date': flight_date,
        'Departure_Cod': departure_cod,
        'Arrival_Cod': arrival_cod
    }])

    logging.debug('DataFrame inicial: \n%s', data)

    # Aplicar limpieza y conversión
    data['Price'] = data['Price'].apply(clean_price)
    data['Duration'] = data['Duration'].apply(convert_duration_to_minutes)

    logging.debug('DataFrame después de limpieza: \n%s', data)

    # Filtrar por aeropuertos y códigos
    data['Valid Departure'] = (data['Departure_Cod'] == 'BIO') & (data['Departure Airport'] == 'Bilbao')
    data['Valid Arrival'] = data.apply(lambda row: is_valid_airport(row['Arrival_Cod'], row['Arrival Airport']), axis=1)

    logging.debug('DataFrame después de validación de aeropuertos: \n%s', data)

    # Separar filas con datos nulos, incorrectos, o aeropuertos no válidos
    error_rows = data[(data['Price'].isna() | data['Duration'].isna() | ~data['Valid Departure'] | ~data['Valid Arrival'])]
    clean_data = data.drop(index=error_rows.index)

    logging.info('Datos válidos: \n%s', clean_data)
    logging.info('Datos con errores: \n%s', error_rows)

    # Guardar los datos con errores
    if not error_rows.empty:
        if not os.path.exists('datos_errores.csv'):
            error_rows.to_csv('datos_errores.csv', index=False)
        else:
            error_rows.to_csv('datos_errores.csv', mode='a', header=False, index=False)
        logging.info('Datos con errores guardados en datos_errores.csv')

    # Preparar puntos de datos para InfluxDB si los datos están limpios
    if not clean_data.empty:
        # Crear cliente de InfluxDB
        client = InfluxDBClient(url=url, token=token, org=org)
        write_api = client.write_api(write_options=WriteOptions(batch_size=1000, flush_interval=10_000))

        # Convertir 'Info Date Save' a formato de fecha y hora
        clean_data['Info Date Save'] = pd.to_datetime(clean_data['Info Date Save'])

        # Preparar puntos de datos
        points = []
        for index, row in clean_data.iterrows():
            point = (
                Point("flight")
                .time(row['Info Date Save'])
                .tag("departure_airport", row['Departure Airport'])
                .tag("arrival_airport", row['Arrival Airport'])
                .tag("airline", row['Airlines'])
                .field("price", float(row['Price']))
                .field("duration", float(row['Duration']))
            )
            points.append(point)

        # Escribir todos los puntos de una vez
        write_api.write(bucket=bucket, record=points)

        # Cerrar el cliente
        write_api.close()
        client.close()

        logging.info("Datos limpios añadidos a InfluxDB correctamente.")
    else:
        logging.warning("No se encontraron datos limpios para añadir a InfluxDB.")
