const express = require('express');
const db = require('./models'); 
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.authenticate()
    .then(async () => {
        console.log('Conexión a la base de datos establecida con éxito.');
        await db.sequelize.sync();
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

app.get('/', (req, res) => {
    res.send('¡Hola! El servidor está funcionando :).');
});

// Ruta para obtener todos los usuarios
app.get('/users', async (req, res) => {
    try {
        const users = await db.users.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios', details: error.message });
    }
});

// Ruta para crear usuarios
app.post('/create-users', async (req, res) => {
    const users = [
        { firstName: 'Mateo', lastName: 'Díaz', email: 'mateo.diaz@correo.com', password: await bcrypt.hash('contraseña1', 10) },
        { firstName: 'Santiago', lastName: 'Mejías', email: 'santiago.mejias@correo.com', password: await bcrypt.hash('contraseña2', 10) },
        { firstName: 'Lucas', lastName: 'Rojas', email: 'lucas.rojas@correo.com', password: await bcrypt.hash('contraseña3', 10) },
        { firstName: 'Facundo', lastName: 'Fernandez', email: 'facundo.fernandez@correo.com', password: await bcrypt.hash('contraseña4', 10) },
    ];

    try {
        for (const userData of users) {
            await db.users.create(userData);
        }
        res.status(201).json({ message: 'Usuarios creados con éxito.' });
    } catch (error) {
        console.error('Error al crear los usuarios:', error);
        res.status(500).json({ error: 'Error al crear los usuarios', details: error.message });
    }
});

// Ruta para crear bootcamps
app.post('/create-bootcamps', async (req, res) => {
    const bootcamps = [
        {
            title: 'Introducción a React',
            cue: 10,
            description: 'React es la librería más usada en JavaScript para el desarrollo de interfaces.'
        },
        {
            title: 'Desarrollo Web Full Stack',
            cue: 12,
            description: 'Crearás aplicaciones web con JavaScript, nodeJS, Angular, MongoDB, ExpressJS.'
        },
        {
            title: 'Big Data e IA',
            cue: 18,
            description: 'Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data.'
        }
    ];

    try {
        for (const bootcampData of bootcamps) {
            await db.bootcamps.create(bootcampData);
        }
        res.status(201).json({ message: 'Bootcamps creados con éxito.' });
    } catch (error) {
        console.error('Error al crear los bootcamps:', error);
        res.status(500).json({ error: 'Error al crear los bootcamps', details: error.message });
    }
});

// Añadir esta ruta para obtener los bootcamps
app.get('/bootcamps', async (req, res) => {
    try {
        const bootcamps = await db.bootcamps.findAll(); // Obtiene todos los bootcamps
        res.json(bootcamps); // Envía la lista de bootcamps como respuesta
    } catch (error) {
        console.error('Error al obtener los bootcamps:', error);
        res.status(500).json({ error: 'Error al obtener los bootcamps', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}.`);
});
