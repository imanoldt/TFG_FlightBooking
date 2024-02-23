import time
import random

def random_time(min, max):
    tiempo = random.uniform(min, max)
    print("Esperando %f segundos", tiempo)
    time.sleep(tiempo)
    return tiempo