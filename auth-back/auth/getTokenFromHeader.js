function getTokenFromHeader(header) {
    if (header && header.authorization) {
        const parted = header.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }else {
            return null;
        }
    }else {
        return null;
    }
}

module.exports = getTokenFromHeader;
 