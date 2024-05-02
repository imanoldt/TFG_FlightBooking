const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/rutas.json'); // Asegúrate de que la ruta al archivo JSON sea correcta

// Endpoint para obtener los detalles de una ciudad específica
router.get('/:cityName', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading city data file.');
      return;
    }
    const cities = JSON.parse(data);
    const city = cities[req.params.cityName.toLowerCase()];

    if (city) {
      res.json(city);
    } else {
      res.status(404).send('City not found');
    }
  });
});

module.exports = router;
