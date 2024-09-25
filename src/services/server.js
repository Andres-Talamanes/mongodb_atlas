// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const port = 5000; 
const uri = "mongodb://localhost:27017"; //URI de MongoDB

const client = new MongoClient(uri);

// Middleware para permitir CORS
app.use(cors());
app.use(bodyParser.json());

async function connectDB() {
    try {
        await client.connect();
        console.log("Conectado a MongoDB");
    } catch (err) {
        console.error("Error conectando a MongoDB:", err);
    }
}

// Endpoint para guardar datos en la colección
app.post('/api/ejemplo_de_mongo', async (req, res) => {
    const { nombre, edad, ciudad } = req.body; // Extrae los datos del cuerpo de la solicitud
    const collection = client.db("ejemplo_de_mongo").collection("ejemplo_de_mongo");

    try {
        const resultado = await collection.insertOne({ nombre, edad, ciudad });
        res.status(201).send({ id: resultado.insertedId });
    } catch (error) {
        console.error('Error al insertar el documento:', error);
        res.status(500).send('Error al guardar los datos');
    }
});

// Inicia el servidor y conectaa a la base de datos
app.listen(port, () => {
    connectDB();
    console.log(`Servidor escuchando en http://localhost:${port}`);
});