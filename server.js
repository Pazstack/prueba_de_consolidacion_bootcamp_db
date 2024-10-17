const express = require('express');
const db = require('./models'); 
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); 
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Probar la conexión a la base de datos
db.sequelize.authenticate()
    .then(async () => {
        console.log('Conexión a la base de datos establecida con éxito.');
        await db.sequelize.sync(); 
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

// Ruta para la raíz
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
    console.log('Solicitud POST recibida en /create-users'); // Línea de registro para depuración

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

// Ruta para crear Bootcamps
app.post('/create-bootcamps', async (req, res) => {
    console.log('Solicitud POST recibida en /create-bootcamps'); // x2

    const bootcamps = [
        {
            title: 'Introduciendo El Bootcamp De React.',
            cue: 10,
            description: 'React es la librería más usada en JavaScript para el desarrollo de interfaces.'
        },
        {
            title: 'Bootcamp Desarrollo Web Full Stack.',
            cue: 12,
            description: 'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.'
        },
        {
            title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning.',
            cue: 18,
            description: 'Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.'
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

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}.`);
});
