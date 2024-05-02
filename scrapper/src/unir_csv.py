import pandas as pd
import glob

# Lista todos los archivos CSV en el directorio actual
archivos_csv = glob.glob("*.csv")

# Leer el primer archivo CSV para obtener la cabecera
primer_csv = pd.read_csv(archivos_csv[0])

# Leer los otros archivos CSV y unirlos en uno solo
datos_unidos = pd.concat([pd.read_csv(f) for f in archivos_csv])

# Escribir los datos unidos en un nuevo archivo CSV en el directorio actual
datos_unidos.to_csv("datos_unidos_N.csv", index=False)

print("Los archivos CSV se han unido exitosamente en 'datos_unidos.csv'")
