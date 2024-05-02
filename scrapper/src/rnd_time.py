import time
import random


def randomTime(min, max):
    tiempo = random.uniform(min, max)
    print("esperando %f segundos", tiempo)
    time.sleep(tiempo)
    return time
