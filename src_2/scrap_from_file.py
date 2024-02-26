import os
import selenium.webdriver as webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By

from CSV import CSV
from utils import Utils

from datetime import datetime
import time
import random
import traceback

#browser = None

def randomTime(min, max):
    tiempo = random.uniform(min, max)
    print("esperando {} segundos".format(round(tiempo,2)))
    time.sleep(tiempo)
    return

def inicializarBrowser():
    # intialzie chrome service
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0'
    firefox_driver = os.path.join(os.getcwd(), '..\Drivers', 'geckodriver.exe')
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
            #browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[2]/button").click()
            #randomTime(1,2)# esperar a que se cargue

            # RECOPILAR DATOS
            num_vuelo = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/div[2]/div/div/div[1]/span").text
            #print(num_ida)
            fecha_vuelo = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/div[1]/div/h4[2]").text            #print(num_vuelta)
            precio = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[4]/div[1]/div[2]/div/div[2]/span[2]").text
            #print(precio)
            vendedor = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[4]/div[1]/div[1]/span").text
            #print(vendedor)
            #fecha_ida = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/div[1]/div/h4[2]").text
            #print(fecha_ida)
            #fecha_vuelta = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[2]/div[1]/div/h4[2]").text
            #print(fecha_vuelta)
            aeropuerto_salida = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/button/div[2]/div/div[2]/div[1]/span[2]/div/span").text
            aeropuerto_destino = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/button/div[2]/div/div[2]/div[3]/span[2]/div/span").text
            hora_salida = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/button/div[2]/div/div[2]/div[1]/span[1]/div/span").text
            hora_llegada = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/button/div[2]/div/div[2]/div[3]/span[1]/div/span").text
            # if escala:
            try:
                aeropuerto_escala = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/button/div[2]/div/div[2]/div[2]/div[2]/div/span/div/span").text
                tiempo_escala = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/div[2]/div/div/div[3]/div[1]/span").text
                print("Vuelo con escala...")
            except:
                aeropuerto_escala = None
                tiempo_escala = None
                print("Vuelo sin escala...")
                
            # GENERAR METADATOS
            fecha_busqueda = datetime.now()
            anyo_busqueda = fecha_busqueda.year
            mes_busqueda = fecha_busqueda.month
            dia_semana_busqueda = fecha_busqueda.weekday() # L=0; M=1; X=2; J=3; V=4; S=5; D=6
            dia_mes_busqueda = fecha_busqueda.day
            hora_busqueda = fecha_busqueda.hour
            progreso_mes = Utils.calcular_progreso_mes()
            progreso_semana = Utils.calcular_progreso_semana()
            progreso_dia = Utils.calcular_progreso_dia()
            
            # Dia de la semana busqueda --> progreso de la semana.
            #   L,M,X,J,V,S,D
            
            # Hora del dia busqueda --> progreso del dia.
            #   1/24 ... 24/24
            
            # Dia de mes busqueda --> progreso del mes.
            #   1/31 ... 31/31
            

            vuelo = {
                "num_vuelo" : num_vuelo,
                "aeropuerto_salida" : aeropuerto_salida,
                "aeropuerto_destino" : aeropuerto_destino,
                "aeropuerto_escala" : aeropuerto_escala,
                "tiempo_escala" : tiempo_escala,
                "fecha_vuelo" : fecha_vuelo,
                "hora_salida" : hora_salida,
                "hora_llegada" : hora_llegada,
                "fecha_busqueda" : datetime.now(),
                "anyo_busqueda" : anyo_busqueda,
                "mes_busqueda" : mes_busqueda,
                "dia_semana_busqueda" : dia_semana_busqueda,
                "dia_mes_busqueda" : dia_mes_busqueda,
                "hora_busqueda" : hora_busqueda,
                "progreso_mes" : progreso_mes,
                "progreso_semana" : progreso_semana,
                "progreso_dia" : progreso_dia,
                "precio" : precio,
                "vendedor" : vendedor,
            }

            print(vuelo)

            CSV.escribir_vuelo(vuelo, "test.csv")

        except Exception:
            print("ERROR al intentar obtener elementos del HTML.")
            print(traceback.format_exc())

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
f = open("..\\data\\urls_test.txt", "r")
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