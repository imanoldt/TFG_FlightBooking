const { jsonResponse } = require('../lib/jsonResponse');
const router = require('express').Router();
const User = require('../schema/user');




router.get('/', (req, res) => {
    res.status(200).json(jsonResponse(200, req.user));
});

router.get('/favorites', async (req, res) => {
    console.log("Fetching favorites for user:", req.user?.id);
    if (!req.user) {
        console.log("User is not authenticated.");
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            console.log("User not found.");
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("Favorites fetched successfully:", user.favorites);
        res.json({ favorites: user.favorites });
    } catch (error) {
        console.error('Error fetching favorites', error);
        res.status(500).send(error);
    }
});


router.post('/update-favorites', async (req, res) => {
    console.log("Update favorites request started for user:", req.user?.id);
    if (!req.user) {
        console.log("Authentication required");
        return res.status(401).json({ message: 'Authentication required' });
    }

    const { city } = req.body;
    console.log("Request to update favorites with city:", city);
    try {
        const user = await User.findById(req.user.id); // Cambia _id a id
        if (!user) {
            console.log("User not found in database");
            return res.status(404).json({ message: 'User not found' });
        }

        const index = user.favorites.indexOf(city);
        if (index === -1) {
            user.favorites.push(city);
            console.log("Added city to favorites:", city);
        } else {
            user.favorites.splice(index, 1);
            console.log("Removed city from favorites:", city);
        }
        await user.save();
        console.log("Favorites updated successfully:", user.favorites);
        res.json({ favorites: user.favorites });
    } catch (error) {
        console.error('Error updating favorites', error);
        res.status(500).send(error);
    }
});


module.exports = router;