import sqlite3

def crear_tabla_si_no_existe():
    # Conectar a la base de datos o crearla si no existe
    conexion = sqlite3.connect('vuelos.db')
    cursor = conexion.cursor()

    # Crear tabla si no existe
    cursor.execute('''CREATE TABLE IF NOT EXISTS vuelos (
                        departure_time TEXT,
                        arrival_time TEXT,
                        departure_airport TEXT,
                        departure_cod TEXT,
                        arrival_airport TEXT,
                        arrival_cod TEXT,
                        stop_airports TEXT,
                        duration TEXT,
                        airlines TEXT,
                        price TEXT,
                        info_date_save TEXT,
                        flight_date TEXT
                     )''')

    # Confirmar los cambios y cerrar la conexión
    conexion.commit()
    conexion.close()


import sqlite3

def guardar_en_db(departure_time, arrival_time, departure_airport, arrival_airport, stop_airports, duration, airlines, price, info_date_save, flight_date):
    # Obtener los códigos de aeropuertos de los primeros tres caracteres de departure_airport y arrival_airport
    departure_cod = departure_airport[:3]
    arrival_cod = arrival_airport[:3]

    # Conectar a la base de datos
    conexion = sqlite3.connect('vuelos.db')
    cursor = conexion.cursor()

    # Insertar datos en la tabla vuelos
    cursor.execute('''INSERT INTO vuelos (departure_time, arrival_time, departure_airport, departure_cod, arrival_airport, arrival_cod, stop_airports, duration, airlines, price, info_date_save, flight_date)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                   (departure_time, arrival_time, departure_airport, departure_cod, arrival_airport, arrival_cod, ', '.join(stop_airports), duration, airlines, price, info_date_save, flight_date))

    # Confirmar los cambios y cerrar la conexión
    conexion.commit()
    conexion.close()


# Llama a la función para crear la tabla si no existe
crear_tabla_si_no_existe()
