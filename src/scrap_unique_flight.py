from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from fake_useragent import UserAgent
import undetected_chromedriver as uc


if __name__ == '__main__':
    options = webdriver.ChromeOptions()
    options.add_argument('--user-data-dir=/Users/imanoldt/Library/Application Support/Google/Chrome/Default')
    driver = uc.Chrome(options=options,
    )
    #ua = UserAgent()
    #driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    #driver = uc.Chrome(headless=True,use_subprocess=False)
    # Configurar opciones para Chrome
    options.add_argument('--incognito')  # Abrir Chrome en modo incógnito


    #user_agent = ua.random
    #print(user_agent)
    #options.add_argument(f"user-agent={user_agent}")



    driver.get('https://www.skyscanner.es')
    # driver.get('https://bot.sannysoft.com')

    # Espera un poco para que la página cargue
    random_time(0,5)

    # RECHAZAR COOKIES:
    driver.find_element(By.ID, 'acceptCookieButton').click()
    random_time(0,2)
    destino = driver.find_element(By.ID, 'originInput-input').click()
    random_time(0,3)

    #destino.sendKey('MAD')




    # https://www.skyscanner.es/sttc/px/captcha-v2/index.html?url=Lz8=&uuid=07b5f693-d192-11ee-81c8-a2a57ccf1032&vid=
    # https://www.skyscanner.es/sttc/px/captcha-v2/index.html?url=Lz8=&uuid=268a9da6-d192-11ee-a527-76df0eb2e36a&vid=




