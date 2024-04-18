function getUserInfo(user){
    return {
        id: user.id,
        email: user.email,
    };
}

module.exports = getUserInfo;