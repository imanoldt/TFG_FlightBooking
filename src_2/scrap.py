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
#browser.get('https://www.skyscanner.es/transport/flights/bio/ein/221026/221102/?adultsv2=1&cabinclass=economy&childrenv2=&inboundaltsenabled=false&outboundaltsenabled=false&preferdirects=false&rtn=1')
browser.get('https://www.skyscanner.es/transport/flights/bio/ams/221114/221203/?adultsv2=1&cabinclass=economy&childrenv2=&inboundaltsenabled=false&outboundaltsenabled=false&preferdirects=false&rtn=1')
randomTime(3,5)
#time.sleep(3)

# click aceptar cookies
browser.find_element(By.ID, 'acceptCookieButton').click()
#time.sleep(3.1)
randomTime(17,20)# esperar a que se cargue

# browser.find_element(By.ID, 'cookiePreferencesButton').click()
# time.sleep(3)
# browser.find_element(By.XPATH, '/html/body/div/div/div[2]/div/div[4]/button[2]').click()
# time.sleep(3)

# link to search field (input)

for i in range(10):
    try:
        ret = browser.find_element("xpath", "/html/body/div[3]/div[4]/div/div[2]/div[1]/div/div[2]/div[2]/div[1]/div[3]/div["+ str((i+1)) + "]/div/div/a/div/div[2]/div/div/div/span").text
                                            #/html/body/div[3]/div[4]/div/div[2]/div[1]/div/div[2]/div[2]/div[1]/div[3]/div[5]/div/div/a/div/div[2]/div/div/div/span
        print(ret)
    except:
        print("Ignorando publi...")
