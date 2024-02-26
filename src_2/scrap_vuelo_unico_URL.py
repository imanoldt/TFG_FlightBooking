import os
import selenium.webdriver as webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By

import time
import random

def randomTime(min, max):
    tiempo = random.uniform(min, max)
    print("esperando %f segundos", tiempo)
    time.sleep(tiempo)
    return

# intialzie chrome service
user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0'
firefox_driver = os.path.join(os.getcwd(), 'Drivers', 'geckodriver.exe')
firefox_service = Service(firefox_driver)
firefox_options = Options()
firefox_options.set_preference("browser.privatebrowsing.autostart", user_agent)

browser = webdriver.Firefox(service=firefox_service, options=firefox_options)

time.sleep(1)

# navigate to a webbsite
browser.get('https://www.skyscanner.es/transport/flights/bio/ams/221114/221203/config/9925-2211141720--32132-0-9451-2211141935|9451-2212031425--32132-0-9925-2212031630?adultsv2=1&cabinclass=economy&childrenv2=&inboundaltsenabled=false&outboundaltsenabled=false&preferdirects=false&rtn=1')
randomTime(3,5)
# click aceptar cookies

# RECHAZAR COOKIES:
browser.find_element(By.ID, 'acceptCookieButton').click()
randomTime(1,2)# esperar a que se cargue

browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/button").click()
randomTime(1,2)# esperar a que se cargue
browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[2]/button").click()
randomTime(1,2)# esperar a que se cargue



# link to search field (input)
#try:
num_ida = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/div[2]/div/div/div[1]/span").text
print(num_ida)
num_vuelta = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[2]/div[2]/div/div/div[1]/span").text
print(num_vuelta)
precio = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[4]/div[1]/div[2]/div/div[2]/span[2]").text
print(precio)
vendedor = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[4]/div[1]/div[1]/span").text
print(vendedor)
fecha_ida = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[1]/div[1]/div/h4[2]").text
print(fecha_ida)
fecha_vuelta = browser.find_element("xpath", "/html/body/div[2]/div[4]/div/div[2]/div/div[3]/div[1]/div[2]/div[1]/div/h4[2]").text
print(fecha_vuelta)
    
    
    
# except:
    # print("Ignorando publi...")
