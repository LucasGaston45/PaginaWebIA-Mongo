// server.js
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const uri = "mongodb+srv://shadowalbornoz45:shadowalbornoz45@jarvisia.pcrupea.mongodb.net/?retryWrites=true&w=majority&appName=jarvisia";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function connectToMongo() {
  try {
  
    await client.connect();
    console.log("Conectado exitosamente a MongoDB");

   
    const db = client.db("HarwareJarvisIA");
    const collection = db.collection("clientes");

    
    app.post('/api/enviar', async (req, res) => {
      try {
        const nuevoCliente = req.body; 
        await collection.insertOne(nuevoCliente); 
        res.status(201).json({ message: 'Datos guardados correctamente' });
      } catch (error) {
        console.error('Error al guardar los datos:', error);
        res.status(500).json({ error: 'Error al guardar los datos' });
      }
    });

    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
}

connectToMongo();