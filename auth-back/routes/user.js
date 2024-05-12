const { jsonResponse } = require('../lib/jsonResponse');

const router = require('express').Router();

const User = require('../schema/user');

router.get('/', (req, res) => {
    res.status(200).json(jsonResponse(200, req.user));
});


router.post('/update-favorites', async (req, res) => {
    const { city } = req.body;

    if (!req.user) {
        return res.status(401).send('User not authenticated');
    }

    try {
        const user = await User.findById(req.user._id);
        const index = user.favorites.indexOf(city);
        
        if (index === -1) {
            user.favorites.push(city); // Añadir la ciudad a favoritos si no está
        } else {
            user.favorites.splice(index, 1); // Eliminar la ciudad de favoritos si ya está
        }

        await user.save();
        res.json(user.favorites);
    } catch (error) {
        console.error('Error updating favorites', error);
        res.status(500).send(error);
    }
});












module.exports = router;