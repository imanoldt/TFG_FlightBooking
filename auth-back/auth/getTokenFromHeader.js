function getTokenFromHeader(header) {
    const authorization = header?.authorization;

    if (authorization) {
        const parted = authorization.split(' ');

        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

module.exports = getTokenFromHeader;
