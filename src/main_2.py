#https://www.kayak.es/flights/BIO-MAD/2024-03-26?sort=bestflight_a
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.keys import Keys

from flight_scrp import iniciar_webdriver
from rnd_time import randomTime

if __name__ == '__main__':
    # Llama a la función iniciar_webdriver con los parámetros adecuados
    driver = iniciar_webdriver(headless=False, pos='izquierda')
    wait = WebDriverWait(driver, 30)
    dest = input("Introduce el destino: ")
    origen = input("Introduce el origen: ")
    #bestflight_a
    #duration_a
    #price_a
    driver.get('https://www.kayak.es/flights/'+origen+'-'+dest+'/2024-03-26?sort=bestflight_a')

    #COOKIES
    div_element = wait.until(ec.presence_of_element_located((By.CLASS_NAME, 'P4zO-submit-buttons')))
    first_button = div_element.find_element(By.TAG_NAME, 'button')
    first_button.click()
    
# Encuentra el div principal que contiene la lista de vuelos
div_principal = driver.find_element(By.XPATH, '//*[@class="ev1_-results-list"]/div/div[2]/div')
print(div_principal)

# Encuentra todos los elementos dentro del div principal con la clase 'nrc6'
elementos_vuelos = div_principal.find_elements(By.CLASS_NAME, 'nrc6')

# Itera sobre los elementos de vuelo e imprime su texto o realiza las operaciones que necesites
for elemento in elementos_vuelos:
    print(elemento.text)
    
    
    print("TERMINADOOOOOOOOO______--------")
    input()