const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/cityCode.json');

// Endpoint para obtener ciudades que empiezan con un prefijo dado
router.get('/search', (req, res) => {
  const prefix = (req.query.prefix || '').toLowerCase();
  console.log(`Searching for cities starting with: ${prefix}`);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading city data file:', err);
      res.status(500).send('Error reading city data file.');
      return;
    }

    let cities;
    try {
      cities = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing city data file:', parseErr);
      res.status(500).send('Error parsing city data file.');
      return;
    }

    if (!Array.isArray(cities)) {
      console.error('City data is not an array.');
      res.status(500).send('City data is not in the expected format.');
      return;
    }

    const matchedCities = cities.filter(city => city.city && city.city.toLowerCase().startsWith(prefix));
    res.json(matchedCities);
  });
});

module.exports = router;
