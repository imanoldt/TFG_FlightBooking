import undetected_chromedriver as uc
from fake_useragent import UserAgent
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import random


def random_time(min, max):
    tiempo = random.uniform(min, max)
    print("Esperando %f segundos", tiempo)
    time.sleep(tiempo)
    return tiempo

# Configuración de opciones del navegador
options = uc.ChromeOptions()

# Usar un user-agent aleatorio
ua = UserAgent()
user_agent = ua.random
options.add_argument(f'user-agent={user_agent}')
options.add_argument('--disable-blink-features=AutomationControlled')
options.add_argument('--disable-extensions')
options.add_argument('--disable-infobars')
options.add_argument('--disable-notifications')
options.add_argument('--disable-popup-blocking')


# Desactivar imágenes y JavaScript
prefs = {"profile.managed_default_content_settings.images": 2, "javascript": 2}
options.add_experimental_option("prefs", prefs)

# Excluir el switch de automatización
options.add_argument('--disable-blink-features=AutomationControlled')

# Configurar el proxy si es necesario
# options.add_argument('--proxy-server=http://your_proxy_server')

# Crear el controlador del navegador
driver = uc.Chrome(options=options)
# Visitar el sitio web
driver.get('https://www.skyscanner.es')

# Simular interacción humana
random_time(0,5)

# RECHAZAR COOKIES:
driver.find_element(By.ID, 'acceptCookieButton').click()
random_time(0,10)
destino = driver.find_element(By.ID, 'originInput-input').click().sendKeys('Madrid')
random_time(0,10)
# Cerrar el navegador al finalizar

