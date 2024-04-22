import schedule
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.common.exceptions import NoSuchElementException

from flight_scrp import iniciar_webdriver
from rnd_time import randomTime
from save_csv import guardar_en_csv
import undetected_chromedriver as uc

from datetime import datetime, timedelta
import time
import json
import logging

# Variables globales para almacenar la última ruta y fecha procesada
last_processed_route = None
last_processed_date = None

def prueba(rutas, departure_cod, arrival_cod, flight_date_start, flight_date_end):
    if __name__ == '__main__':

        start_time = time.time()  # Momento inicial de la tarea programada
        global last_processed_route, last_processed_date

        try:
            fecha_actual = datetime.now()
            # Llama a la función iniciar_webdriver con los parámetros adecuados
            driver = iniciar_webdriver(headless=False, pos='izquierda')
            wait = WebDriverWait(driver, 30)

            # Inicializar index a None
            index = None

            # Recorre todas las fechas dentro del rango proporcionado
            current_date = datetime.strptime(flight_date_start, "%Y-%m-%d") if last_processed_date is None else last_processed_date
            end_date = datetime.strptime(flight_date_end, "%Y-%m-%d")

            while current_date <= end_date:
                if last_processed_route is not None:
                # Buscamos la última ruta procesada en el JSON
                    index = next((i for i, ruta in enumerate(rutas) if ruta['departure_cod'] == last_processed_route['departure_cod'] and ruta['arrival_cod'] == last_processed_route['arrival_cod']), None)
                if index is not None:
                    rutas = rutas[index:]

                if current_date.date() < datetime.now().date():
                    current_date += timedelta(days=1)
                    continue

                # Construye la URL utilizando los parámetros
                flight_date = current_date.strftime("%Y-%m-%d")
                url = f"https://www.kayak.es/flights/{departure_cod}-{arrival_cod}/{flight_date}?sort=bestflight_a"
                driver.get(url)
                randomTime(10, 15)

                # Verificar si se ha activado la verificación de seguridad
                if "https://www.kayak.es/security" in driver.current_url:
                    print("Se ha activado la verificación de seguridad. Esperando y reiniciando...")
                    driver.quit()  # Cerrar el navegador
                    time.sleep(60)  # Esperar un minuto
                    last_processed_route = {'departure_cod': departure_cod, 'arrival_cod': arrival_cod}
                    last_processed_date = current_date
                    break  # Salir del bucle y reiniciar desde aquí

                try:
                    # COOKIES
                    div_element = wait.until(ec.presence_of_element_located((By.CLASS_NAME, 'P4zO-submit-buttons')))
                    print(div_element)
                    first_button = div_element.find_element(By.TAG_NAME, 'button')
                    print(first_button)
                    first_button.click()
                    randomTime(4, 10)
                    # Scroll down the page to trigger loading of additional elements
                    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                    randomTime(4, 10)

                except Exception as q:
                    print(f"Error: {q}")
                    print("LAS COOKIES YA HAN SIDO ACEPTADAS")

                # Find the 'show more' button using JavaScript
                while True:
                    try:
                        show_more_button = driver.find_element(By.CSS_SELECTOR, 'div[role="button"].ULvh-button.show-more-button')
                        randomTime(5, 10)
                        # Click the 'show more' button using JavaScript
                        driver.execute_script("arguments[0].click();", show_more_button)
                        # Wait for a short time to allow additional content to load (adjust as needed)
                        randomTime(2, 3)
                        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                        randomTime(5, 15)
                    except NoSuchElementException:
                        # If the button is not found, it means there are no more results to load
                        driver.execute_script("window.scrollTo(0, 0);")
                        randomTime(2, 5)
                        print("No more results to load.")
                        break
                

                elementos = driver.find_elements(By.CLASS_NAME, 'nrc6')

                for e in elementos:
                    #print("---------EMPIEZA_AQUI_LA_BUSQUEDA----------")

                    flight_info = e.text.split('\n')
                    if len(flight_info) == 14:
                        try:
                            departure_time = flight_info[0]
                            departure_airport = flight_info[-12]
                            arrival_airport = flight_info[-10]
                            next_day = flight_info[1]
                            stops = flight_info[-9]
                            stop_airports = flight_info[-8].split(', ')
                            duration = flight_info[-7]
                            airlines = flight_info[-6]
                            price = flight_info[-3]
                            info_date_save = fecha_actual.strftime("%Y-%m-%d %H:%M:%S")
                            guardar_en_csv(departure_time, departure_airport, arrival_airport, stop_airports, duration, airlines, price, info_date_save, flight_date)


                        except IndexError as i:
                            print("---------------INDEX ERROR----------")
                            print(f"Error al acceder a la lista: {i}")
                            print(e.text)
                            print("----------------------------------------------")
                    elif len(flight_info) == 13:
                        try:
                            #print("--------13-----------")
                            # departure_time = flight_info[0]
                            departure_time = flight_info[-13]
                            # departure_airport = flight_info[1]
                            departure_airport = flight_info[-12]

                            arrival_airport = flight_info[-10]
                            stops = flight_info[-9]
                            stop_airports = flight_info[-8].split(', ')
                            duration = flight_info[-7]
                            airlines = flight_info[-6]
                            price = flight_info[-3]
                            info_date_save = fecha_actual.strftime("%Y-%m-%d %H:%M:%S")
                            guardar_en_csv(departure_time, departure_airport, arrival_airport, stop_airports, duration, airlines, price, info_date_save, flight_date)


                        except IndexError as i:
                            print("---------------INDEX ERROR----------")
                            print(f"Error al acceder a la lista: {i}")
                            print(e.text)
                            print("----------------------------------------------")
                    elif len(flight_info) == 12:
                        try:
                            #print("--------12-----------")
                            # departure_time = flight_info[0]
                            departure_time = flight_info[-12]
                            # departure_airport = flight_info[1]
                            departure_airport = flight_info[-11]
                            arrival_airport = flight_info[-9]
                            stop_airports = flight_info[-8].split(', ')
                            duration = flight_info[-7]
                            airlines = flight_info[-6]
                            price = flight_info[-3]
                            info_date_save = fecha_actual.strftime("%Y-%m-%d %H:%M:%S")
                            guardar_en_csv(departure_time, departure_airport, arrival_airport, stop_airports, duration, airlines, price, info_date_save, flight_date)



                        except IndexError as i:
                            print("---------------INDEX ERROR----------")
                            print(f"Error al acceder a la lista: {i}")
                            print(e.text)
                            print("----------------------------------------------")
                    else:
                        print("_____________DATOS CON FALLOS______________")
                        print(e.text)
                        print("___________________________________________")
                
                randomTime(5, 10)
                print(f"He encontrado: {len(elementos)} resultados")
                randomTime(10, 15)

                current_date += timedelta(days=1)

        except Exception as q:
            print(f"Error: {q}")
        finally:
            # Cerrar el navegador al finalizar
            driver.quit()
        

    end_time = time.time()  # Momento final de la tarea programada
    elapsed_time = end_time - start_time  # Tiempo transcurrido
    log_message = f"Ruta: {departure_cod}-{arrival_cod}, Fecha inicio: {flight_date_start}, Fecha fin: {flight_date_end}, Tiempo de ejecución: {elapsed_time} segundos"
    logging.info(log_message)

# Cargar rutas desde el archivo JSON
with open('rutas.json', 'r') as file:
    rutas = json.load(file)


# Programar la ejecución de la función para cada ruta en el JSON
for ruta in rutas:
    schedule.every().day.at("20:24").do(prueba, rutas, ruta['departure_cod'], ruta['arrival_cod'], ruta['date_start'], ruta['date_end'])
    schedule.every().day.at("01:07").do(prueba, rutas, ruta['departure_cod'], ruta['arrival_cod'], ruta['date_start'], ruta['date_end'])

# Ejecuta el planificador en bucle
while True:
    schedule.run_pending()
    time.sleep(1)

print("-------TERMINADO--------")