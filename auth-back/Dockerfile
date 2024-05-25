# Usa una imagen base oficial de Node.js
FROM node:18

# Crea un directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto de la aplicación
EXPOSE 7903

# Comando para ejecutar la aplicación
CMD ["sh", "-c", "npm install && npx nodemon app.js"]
