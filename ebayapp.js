const restify = require('restify')
const fs = require('fs')
var https_options = {
  key: fs.readFileSync('/home/edem/cfu-schedule/device.key'),
  certificate: fs.readFileSync('/home/edem/cfu-schedule/localhost:8080.crt')
};
const http_server = restify.createServer()
const server = restify.createServer(https_options)
var passport = require('passport'),
  OAuth2Strategy = require('general-oauth2')

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://auth.sandbox.ebay.com/oauth2/authorize',
    tokenURL: 'https://api.sandbox.ebay.com/identity/v1/oauth2/token',
    clientID: 'EdemDevl-ListingM-SBX-2abd43d69-8bbcfbf6',
    clientSecret: 'SBX-abd43d698d78-2b2d-4d79-82b3-ccb9',
    redirectUrlAsName: 'Edem_Devlet-EdemDevl-Listin-jirhil',
    callbackURL: 'Edem_Devlet-EdemDevl-Listin-jirhil'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken)
    cb(null, accessToken)
  }
));

server.get('/auth/ebay', passport.authenticate('oauth2'))
server.get('/auth/ebay/callback',
  passport.authenticate('oauth2', {failureRedirect: '/login'}),
  function(req, res) {
    console.log("GOOOD"+req)
    next();
});

server.get('/login', function(res, req) {
	console.log('error koroche'+req)
})

http_server.listen(3000, function() {
   console.log('%s listening at %s', http_server.name, http_server.url);
});
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
