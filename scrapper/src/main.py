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
    driver.get('https://www.kayak.es/')
    
    # Tu código adicional aquí...
    # Espera hasta que el elemento div con la clase P4zO-submit-buttons esté presente en el DOM
    div_element = wait.until(ec.presence_of_element_located((By.CLASS_NAME, 'P4zO-submit-buttons')))

    # Encuentra el primer botón dentro del div
    first_button = div_element.find_element(By.TAG_NAME, 'button')

    # Haz clic en el primer botón
    first_button.click()
    randomTime(5,10)
    # Espera hasta que el elemento div con la clase zcIg esté presente en el DOM
    main_div = wait.until(ec.presence_of_element_located((By.CLASS_NAME, 'zcIg')))

    # Encuentra el primer div hijo dentro del div principal
    first_child_div = main_div.find_element(By.TAG_NAME, 'div')
    randomTime(4,15)
    first_child_div.click()
    one_way = main_div.find_element(By.XPATH, "//*[@id='oneway']")
    one_way.click()
    randomTime(4,15)
    
    # Espera hasta que el elemento div con la clase BCcW esté presente en el DOM
    
    main_div = wait.until(ec.presence_of_element_located((By.CLASS_NAME, 'BCcW')))
    #div_origin = wait.until(ec.presence_of_element_located((By.CLASS_NAME, 'zEiP-formField zEiP-origin')))


    # Encuentra el input dentro del div principal
    input_element = main_div.find_element(By.TAG_NAME, 'input')
    # Haz clic en el input para asegurarte de que está seleccionado
    input_element.click()

    #div_destination = wait.until(ec.presence_of_element_located((By.CLASS_NAME, 'zEiP-formField zEiP-destination')))
    #div_destination = wait.until(ec.presence_of_element_located((By.CLASS_NAME, 'zEiP-formField zEiP-destination')))
    
    
    padre_div = wait.until(ec.presence_of_element_located((By.CLASS_NAME, 'zEiP-formFieldOutline')))
    
    # Encuentra el tercer div dentro del div padre
    tercer_div = padre_div.find_elements(By.XPATH, './div')[2]  # El índice es 2 ya que Python usa índices base 0
    
    # Encuentra el div con la clase BCcW dentro del tercer div
    bccw_div = tercer_div.find_element(By.CLASS_NAME, 'BCcW')
    
    # Encuentra el div dentro del div BCcW (puedes ajustar el selector según la estructura real)
    otro_div = bccw_div.find_element(By.TAG_NAME, 'div')
    
    # Encuentra el input con la clase k_my-input dentro del último div
    input_element = otro_div.find_element(By.CLASS_NAME, 'k_my-input')
    
    # Borra el contenido actual del input
    input_element.clear()

    # Escribe "Madrid" en el input
    input_element.send_keys("Madrid")
    print("TERMINADOOOOOOOOO______--------")

    # Espera hasta que el elemento div con las clases zEiP-formField y zEiP-submit esté presente en el DOM
    div_element = wait.until(ec.presence_of_element_located((By.CLASS_NAME, 'zEiP-formField.zEiP-submit')))

    # Encuentra el botón dentro del div
    button_element = div_element.find_element(By.TAG_NAME, 'button')

    # Haz clic en el botón
    button_element.click()
    
    print("TERMINADOOOOOOOOO______--------")
    input()