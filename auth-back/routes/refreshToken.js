const getTokenFromHeader = require('../auth/getTokenFromHeader');
const { validateRefreshToken } = require('../auth/validateToken');
const { jsonResponse } = require('../lib/jsonResponse');

const router = require('express').Router();

router.post('/', async (req, res) => {
    const refreshToken = getTokenFromHeader(req.headers);

    if (refreshToken) {

        try {
            const foundToken = await Token.findOne({ token: refreshToken });
            if (!foundToken) {
                return res.status(401).send(jsonResponse(401, { error: 'Unauthorized' }));
            }

            const payload = validateRefreshToken(foundToken);
            if (payload) {
                const accessToken = generateAccessToken(payload.user);
                return res.status(200).send(jsonResponse(200, { accessToken }));
            } else {
                return res.status(401).send(jsonResponse(401, { error: 'Unauthorized' }));
            }

        } catch (error) {
            return res.status(401).send(jsonResponse(401, { error: 'Unauthorized' }));
        }

    } else {
        return res.status(401).send(jsonResponse(401, { error: 'Unauthorized' }));
    }
});

module.exports = router;
