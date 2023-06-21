const express = require('express');
const mariadb = require('mariadb');
const { MongoClient } = require('mongodb');

// Configuración de MariaDB
const mariadbConfig = {
  host: 'mariadb',
  port: 3306,
  user: 'root',
  password: 'secret',
  database: 'Mi-Maria-db',
};

// Configuración de MongoDB
const mongodbConfig = {
  host: 'mongodb',
  port: 27017,
  user: 'AguasFsa',
  password: 'secretpassword',
  database: 'Mi-Mongodb',
};

// Crear la aplicación Express
const app = express();
app.use(express.json());

// Endpoint de verificación de conexión a MariaDB
app.get('/check-mariadb-connection', async (req, res) => {
  try {
    // Intentar establecer la conexión a MariaDB
    const connection = await mariadb.createConnection(mariadbConfig);
    await connection.end();

    // La conexión fue exitosa
    res.status(200).send('Conexión exitosa a MariaDB');
  } catch (error) {
    // Ocurrió un error al establecer la conexión
    console.error('Error en la conexión a MariaDB:', error);
    res.status(500).send('Error en la conexión a MariaDB');
  }
});

// Endpoint de verificación de conexión a MongoDB
app.get('/check-mongodb-connection', async (req, res) => {
    try {
        
      // Construir la URL de conexión con las credenciales
      const url = `mongodb://${mongodbConfig.user}:${mongodbConfig.password}@${mongodbConfig.database}:${mongodbConfig.port}`;
    
  
      // Intentar establecer la conexión a MongoDB
      const client = new MongoClient(url);
      await client.connect();
      const db = client.db(mongodbConfig.database);
      const collection = db.collection('miColeccion'); //  colección en MongoDB
      await collection.find().toArray(); // consulta para obtener todos los documentos en una colección
      await client.close();
  
      // La conexión y consulta fueron exitosas
      res.status(200).send('Conexión exitosa a MongoDB');
    } catch (error) {
      // Ocurrió un error al establecer la conexión o hacer la consulta
      console.error('Error en la conexión a MongoDB:', error);
      res.status(500).send('Error en la conexión a MongoDB');
    }
});
  
  
  
  
  

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor en línea en el puerto 3000');
});
