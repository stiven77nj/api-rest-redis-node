# Imagen de node
FROM node 
# Directorio de trabajo
WORKDIR /usr/app
# Se deben adjuntar las dependecias necesarias al directorio de trabajo
COPY package*.json ./
# Se debe ejecutar el comando "npm install", para instalar los modulos de nodejs
RUN npm install
# Agrupar el código fuente de la aplicación dentro de la imagen de Docker
COPY . .
# Comando para iniciar la aplicacion
CMD [ "npm", "start" ]