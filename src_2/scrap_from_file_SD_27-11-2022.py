'''
Copia de seguridad del 27-11-2022, previo a incrementar la cantidad de datos capturados.

El programa actual recoge los siguientes datos de un listado de URLs con vuelos de IDA y VUELTA

vuelo = {
                "num_ida" : num_ida,
                "fecha_ida" : fecha_ida,
                "num_vuelta" : num_vuelta,
                "fecha_vuelta" : fecha_vuelta,
                "fecha_busqueda" : datetime.datetime.now(),
                "precio" : precio,
                "vendedor" : vendedor,
            }

Los datos son guardados en un CSV.

'''

import os
import selenium.webdriver as webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By

from CSV import CSV
import datetime
import time
import random


def randomTime(min, max):
    tiempo = random.uniform(min, max)
    print("esperando {} segundos".format(round(tiempo,2)))
    time.sleep(tiempo)
    return

def inicializarBrowser():
    # intialzie chrome service
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0'
    firefox_driver = os.path.join(os.getcwd(), '..\\Drivers', 'geckodriver.exe')
    firefox_service = Service(firefox_driver)
    firefox_options = Options()
    firefox_options.set_preference("browser.privatebrowsing.autostart", user_agent)

    browser = webdriver.Firefox(service=firefox_service, options=firefox_options)

    return browser

def comprobar_bot_detectado(browser):
    detectado = False
    try:
        if (browser.find_element("xpath","/html/body/div/div/section[2]").text == "¿Eres una persona o un robot?"):
            print("Bot detectado por la plataforma.")
            detectado = True
    except:
        pass

    return detectado

def navegar_y_descargar_datos(url):
    browser = inicializarBrowser()
    browser.get(url)

    randomTime(1,3)
    try:
        # ACEPTAR COOKIES:
        browser.find_element(By.ID, 'acceptCookieButton').click()
        randomTime(2,3)# esperar a que se cargue

        # Si puede aceptar las cookies que despliegue la informacion y obtenga datos
        try:

            # DESPLEGAR ELEMENTOS
            browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/button").click()
            randomTime(0.5,1)# esperar a que se cargue
            browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[2]/button").click()
            #randomTime(1,2)# esperar a que se cargue

            # RECOPILAR DATOS
            num_ida = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/div[2]/div/div/div[1]/span").text
            #print(num_ida)
            num_vuelta = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[2]/div[2]/div/div/div[1]/span").text
            #print(num_vuelta)
            precio = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[4]/div[1]/div[2]/div/div[2]/span[2]").text
            #print(precio)
            vendedor = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[4]/div[1]/div[1]/span").text
            #print(vendedor)
            fecha_ida = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/div[1]/div/h4[2]").text
            #print(fecha_ida)
            fecha_vuelta = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[2]/div[1]/div/h4[2]").text
            #print(fecha_vuelta)

            vuelo = {
                "num_ida" : num_ida,
                "fecha_ida" : fecha_ida,
                "num_vuelta" : num_vuelta,
                "fecha_vuelta" : fecha_vuelta,
                "fecha_busqueda" : datetime.datetime.now(),
                "precio" : precio,
                "vendedor" : vendedor,
            }

            print(vuelo)

            CSV.escribir_vuelo(vuelo)

        except:
            print("ERROR al intentar obtener elementos del HTML.")

            # ANALISIS DE FALLA: COMPROBACION DE VUELO NO EXISTENTE
            try:
                browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div/button")
                print("El vuelo buscado no existe o se han agotado los billetes.")

            # ANALISIS DE FALLA: COMPROBACION DE BOT DETECTADO --> REINTENTAR  
            except:
                if (comprobar_bot_detectado(browser)):
                    lista_url_fallidas.append(linea)
                else:
                    print("Error desconocido.")
                    lista_url_fallidas.append(linea)

    except:
        print("Error al intentar aceptar las cookies.")
        if (comprobar_bot_detectado(browser)):
            lista_url_fallidas.append(linea)
        else:
            print("Error desconocido.")

    browser.quit() 
    return

#############################################################################
#############################____MAIN____####################################
#############################################################################


# Carga de URLs a scrapear de fichero
f = open('..\\data\\urls.txt', "r")
lineas = f.readlines()
f.close()
lista_url_fallidas = []

iteracion = 0
for linea in lineas:
    iteracion += 1
    print("\n Escaneando linea {} sobre {}...".format(iteracion, len(lineas)) )
    navegar_y_descargar_datos(linea)

print("Listado de direcciones fallidas: {}".format(lista_url_fallidas))

if(lista_url_fallidas):
    print("Reintentando direcciones fallidas...")
    for url in lista_url_fallidas:
        navegar_y_descargar_datos(url)
        
print("Fin del escaneo. Cerrando el programa...")