module.exports = {
    getUserIdFromReq: function (request) {
        if (request.user) {
            return request.user.user.id;
        }
        return null;
    }
}