#https://www.kayak.es/flights/BIO-MAD/2024-03-26?sort=bestflight_a
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.common.exceptions import NoSuchElementException

from flight_scrp import iniciar_webdriver
from rnd_time import randomTime

if __name__ == '__main__':
    # Llama a la función iniciar_webdriver con los parámetros adecuados
    driver = iniciar_webdriver(headless=False, pos='izquierda')
    wait = WebDriverWait(driver, 30)
    #dest = input("Introduce el destino: ")
    #origen = input("Introduce el origen: ")
    #bestflight_a
    #duration_a
    #price_a
    #url ="https://www.kayak.es/flights/"+origen+"-"+dest+"/2024-03-27?sort=bestflight_a"
    url = "https://www.kayak.es/flights/WAW-LAX/2024-03-27?sort=bestflight_a"
    driver.get(url)
    randomTime(3,5)

    #COOKIES
    div_element = wait.until(ec.presence_of_element_located((By.CLASS_NAME, 'P4zO-submit-buttons')))
    first_button = div_element.find_element(By.TAG_NAME, 'button')
    first_button.click()
    randomTime(4,5)
    # Scroll down the page to trigger loading of additional elements
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    randomTime(5,10)

    while True:
        try:
        # Find the 'show more' button using JavaScript
            show_more_button = driver.find_element(By.CSS_SELECTOR, 'div[role="button"].ULvh-button.show-more-button')

        # Click the 'show more' button using JavaScript
            driver.execute_script("arguments[0].click();", show_more_button)
        # Wait for a short time to allow additional content to load (adjust as needed)
            randomTime(2, 3)
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        except NoSuchElementException:
        # If the button is not found, it means there are no more results to load
            driver.execute_script("window.scrollTo(0, 0);")
            print("No more results to load.")
            break

    randomTime(2,5)

    elementos = driver.find_elements(By.CLASS_NAME, 'nrc6')

    for e in elementos:
        #e.find_element(By.CSS_SELECTOR, 'div > div.nrc6-wrapper > div > div.nrc6-content-section > div.nrc6-main > div > ol > li > div > div > div.VY2U > div.vmXl.vmXl-mod-variant-large > span:nth-child(1)')
        #print(e.text)
        print("---------EMPIEZA AQUI BUSQUEDA----------")

        flight_info = e.text.split('\n')
        if len(flight_info) == 14:
            departure_time = flight_info[0]
            next_day = flight_info[1]
            stops = flight_info[-9]
            stop_airports = flight_info[-8].split(', ')
            duration = flight_info[-7]
            airlines = flight_info[-6]
            price = flight_info[-3]
            print("---------14----------")
            print(f"Departure Time: {departure_time} {next_day}")
            print(f"Departure Airport: BOG")  # Origen puede ser fijo como BOG si no cambia
            print(f"Arrival Airport: {flight_info[-10]}")
            print(f"Stops: {stops}")
            print(f"Stop Airports: {', '.join(stop_airports)}")
            print(f"Duration: {duration}")
            print(f"Airlines: {airlines}")
            print(f"Price: {price}")
            print("-------------------")
        elif len(flight_info) == 13:
            print("--------13-----------")
            departure_time = flight_info[0]
            departure_airport = flight_info[1]
            stops = flight_info[-9]
            stop_airports = flight_info[-8].split(', ')
            duration = flight_info[-7]
            airlines = flight_info[-6]
            price = flight_info[-3]

            print(f"Departure Time: {departure_time}")
            print(f"Departure Airport: BOG")  # Origen puede ser fijo como BOG si no cambia
            print(f"Arrival Airport: {flight_info[-10]}")
            print(f"Stops: {stops}")
            print(f"Stop Airports: {', '.join(stop_airports)}")
            print(f"Duration: {duration}")
            print(f"Airlines: {airlines}")
            print(f"Price: {price}")
            print("-------------------")
        elif len(flight_info) == 12:
            print("--------12-----------")
            departure_time = flight_info[0]
            departure_airport = flight_info[1]
            stop_airports = flight_info[-8].split(', ')
            duration = flight_info[-7]
            airlines = flight_info[-6]
            price = flight_info[-3]

            print(f"Departure Time: {departure_time}")
            print(f"Departure Airport: BOG")  # Origen puede ser fijo como BOG si no cambia
            print(f"Arrival Airport: {flight_info[-9]}")
            print(f"Stop Airports: {', '.join(stop_airports)}")
            print(f"Duration: {duration}")
            print(f"Airlines: {airlines}")
            print(f"Price: {price}")
            print("-------------------")


        else:
            print("_____________DATOS CON FALLOS______________")
            print(e.text)
            print("______________")

        # flight_info = e.text.split('\n')
        # departure_time = flight_info[0]
        # departure_airport = origen
        # arrival_airport = flight_info[4]
        # arrival_time = flight_info[4]
        # next_day = flight_info[1]
        # stops = flight_info[5]
        # stop_airports = flight_info[6].split(', ')
        # duration = flight_info[7]
        # airlines = flight_info[8]
        # price = flight_info[-2]
        #
        # print(f"Departure Time: {departure_time} {next_day}")
        # print(f"Departure Airport: {departure_airport}")
        # print(f"Arrival Airport: {arrival_airport}")
        # print(f"Stops: {stops}")
        # print(f"Stop Airports: {', '.join(stop_airports)}")
        # print(f"Duration: {duration}")
        # print(f"Airlines: {airlines}")
        # print(f"Price: {price}")
        # print("-------------------")


    print(len(elementos))

print("TERMINADOOOOOOOOO______--------")
input()