const router = require('express').Router();

router.get('/', (req, res) => {
    res.json([
       {
        "id": 1,
        "name": "Ciudad de a",
        "state": "Ciudad de a",
        "country": "México",
        "active": true
       } 
    ]);

    //AQUI IRAN LOS METODOS PARA LAS CIUDADES en general todo
});

module.exports = router;