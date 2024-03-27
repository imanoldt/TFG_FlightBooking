import csv
from datetime import datetime

def guardar_en_csv(departure_time, departure_airport, arrival_airport, stop_airports, duration, airlines, price, info_date_save, flight_date):
    # Obtener los códigos de aeropuertos de los primeros tres caracteres de departure_airport y arrival_airport
    departure_cod = departure_airport[:3]
    arrival_cod = arrival_airport[:3]

    # Eliminar los códigos de aeropuerto de departure_airport y arrival_airport
    departure_airport = departure_airport[3:]
    arrival_airport = arrival_airport[3:]

    # Extraer el valor de "Arrival Time" de departure_time
    arrival_time = departure_time.split(' – ')[1]

    # Eliminar "– 19:35" de departure_time
    departure_time = departure_time.split(' – ')[0]

    # Obtener la fecha y hora actual
    fecha_actual = datetime.now()

    # Crear una lista con los datos a guardar
    data = [
        ["Departure Time", "Arrival Time", "Departure Airport", "Departure_Cod", "Arrival Airport", "Arrival_Cod",
         "Stop Airports", "Duration", "Airlines", "Price", "Info Date Save", "Flight Date"],
        [departure_time, arrival_time, departure_airport, departure_cod, arrival_airport, arrival_cod,
         ', '.join(stop_airports), duration, airlines, price, info_date_save, flight_date]
    ]

    # Obtener la fecha actual
    fecha_formateada = fecha_actual.strftime("%Y-%m-%d")

    # Nombre del archivo CSV (puedes ajustar según tus necesidades)
    nombre_archivo = f"datos_vuelos_{fecha_formateada}_NR.csv"

    # Verificar si el archivo ya existe
    existe_archivo = False
    try:
        with open(nombre_archivo, 'r') as archivo_existente:
            existe_archivo = True
    except FileNotFoundError:
        pass

    # Escribir o añadir datos al archivo CSV
    with open(nombre_archivo, 'a', newline='', encoding='utf-8') as archivo_csv:
        # Crear el escritor CSV
        csv_writer = csv.writer(archivo_csv)

        # Si el archivo no existe, escribir la cabecera
        if not existe_archivo:
            csv_writer.writerows(data)
        else:
            # Escribir una nueva fila con los datos
            csv_writer.writerow(data[1])
