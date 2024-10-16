module.exports = app => {
    const bootcamps = require('../controllers/bootcamp.controller.js');
    const router = require('express').Router();
  
    // rutas
    router.post("/", bootcamps.createBootcamp); // Crear un nuevo Bootcamp
    router.post("/:bootcampId/user/:userId", bootcamps.addUser); // Agregar un usuario al Bootcamp
    router.get("/:id", bootcamps.findById); // Obtener Bootcamp por ID
    router.get("/", bootcamps.findAll); // Obtener todos los Bootcamp
  
    // Usar enrutador con prefijo para las rutas de Bootcamp
    app.use('/api/bootcamps', router);
};
