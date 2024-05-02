// Importar módulos necesarios
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Endpoint para obtener los datos de las ciudades
router.get('/city-data', (req, res) => {
    const filePath = path.join(__dirname, '../data/rutas.json'); // Ajusta la ruta según la estructura de tu proyecto
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(500).send('Error reading city data file.');
            return;
        }
        res.json(JSON.parse(data));
    });
});

module.exports = router;