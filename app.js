const express = require('express'); // Se importa el paquete express
const { request, response } = require('express');
const cors = require('cors');
const redis = require('redis'); // Se importa el paquete redis
require('dotenv').config(); // Lee el archivo de enviroments ".env"


// !---- CONEXION A REDIS ----

const client = redis.createClient({
  socket: {
    host: 'redis-server',
    port: process.env.PORT_REDIS // 6379
  }
});

client.on( 'error', err  => {
  console.log('Redis client Error', err);
});

client.connect();

// ! ---- Middlewares ----

// Crear el servidor de express
const app = express();

// Cors 
app.use( cors() );
// Lectura y parseo del body
app.use( express.json() );


// ! ---- ENDPOINTS ----


// Establecer visitas iniciales
client.set('students', '');


// * ---- Crear estudiante ----
app.post('/addUser', async ( req, res ) => {
  const { name } = req.body;
  await client.set('students', name);
  res.send('Estudiantes registrado');
});


// * ---- Obtener estudiante ----
app.get('/getUser', async ( req, res ) => {
  client.get('students', (err, students) => {
    res.send('Students', students);
  });
});


// * -----------------

// Metodo listen para correr el servidor
app.listen( process.env.PORT, () => {
    console.log(`aplicacion corriendo en el puerto... ${process.env.PORT}`);
});
