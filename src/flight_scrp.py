
import random
import os
import time
import undetected_chromedriver as uc

def randomTime(min, max):
    tiempo = random.uniform(min, max)
    print("Esperando %f segundos" % tiempo)
    time.sleep(tiempo)


def iniciar_webdriver(headless=False, pos='maximizada'):
    options = uc.ChromeOptions()
    options.add_argument('--password-store=basic')
    options.add_experimental_option('prefs',
                                    {
                                        'credentials_enable_service':False,
                                        'profile.password_manager_enabled':False,
                                    },
                                    )
    driver = uc.Chrome(options=options,
                       headless=headless,
                       log_level=3,
                       )
    if not headless:
        driver.maximize_window()
        if pos != 'maximizada':
            ancho, alto = driver.get_window_size().values()
            if pos == 'izquierda':
                driver.set_window_rect(x=0, y=0, width=ancho//2, height=alto)
            elif pos == 'derecha':
                driver.set_window_rect(x=ancho//2, y=0, width=ancho//2, height=alto)
    return driver
    
    
    
