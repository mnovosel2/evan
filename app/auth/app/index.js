var uid = require('uid-safe');
module.exports = function () {
    var seneca = this;
    seneca.use('auth', {
            secure: true,
            restrict: '/api',
            default_plugins: {authTokenCookie: false}
        })
        .use('auth-token-header', {
            tokenkey: 'Authorization',
        });
    seneca.add({role: 'user', cmd: 'register'}, function (args, done) {
        args.clientSecret = uid.sync(11);
        this.prior(args, done)
    })
};