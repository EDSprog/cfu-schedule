const axios = require('axios')
/*
var passport = require('passport'),
	OAuth2Strategy = require('general-oauth2')


passport.use(new OAuth2Strategy({
    authorizationURL: 'https://auth.sandbox.ebay.com/oauth2/authorize',
    tokenURL: 'https://api.sandbox.ebay.com/identity/v1/oauth2/token',
    clientID: 'EdemDevl-ListingM-SBX-2abd43d69-8bbcfbf6',
    clientSecret: 'SBX-abd43d698d78-2b2d-4d79-82b3-ccb9',
    redirectUrlAsName: 'Edem_Devlet-EdemDevl-Listin-oylgio',
    callbackURL: 'Edem_Devlet-EdemDevl-Listin-oylgio'
  },
  function(accessToken, refreshToken, profile, cb) {
    cb(null, accessToken)
  }
));*/

const getAuthCodeConfig = {
  method: 'post',
  baseURL: 'https://api.sandbox.ebay.com/identity/v1/oauth2/token', 
  headers: {
  	'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic '+Buffer.from("EdemDevl-ListingM-SBX-2abd43d69-8bbcfbf6:SBX-abd43d698d78-2b2d-4d79-82b3-ccb9").toString('base64')
  },
  data: {
    grant_type: 'authorization_code',
    code: 'v^1.1#i^1#r^1#f^0#p^3#I^3#t^Ul41Xzg6QzYyQzc1ODVBODA2NzM1NzFCQTZBNDFERTAxMzA5NTRfMl8xI0VeMTI4NA==',
    redirect_uri: 'Edem_Devlet-EdemDevl-Listin-jirhil'
  }
}

//const getAuthCode = axios.create(getAuthCodeConfig)

axios(getAuthCodeConfig).then(function(res) {
	console.log(res)
}).catch(function(error) {
	console.log(error)
})


/*axios.get('https://auth.ebay.com/oauth2/authorize?client_id=EdemDevl-ListingM-PRD-2abd43d69-e43ead75&response_type=code&redirect_uri=Edem_Devlet-EdemDevl-Listin-oylgio&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly').then(function(res){
}).catch(function(err) {
	console.log(err)
})*/


/*Content-Type: application/x-www-form-urlencoded
Authorization: Basic RWRlbURldmwtTGlzdGluZ00tU0JYLTJhYmQ0M2Q2OS04YmJjZmJmNjpTQlgtYWJkNDNkNjk4ZDc4LTJiMmQtNGQ3OS04MmIzLWNjYjk=

grant_type=authorization_code&code=&redirect_uri=Edem_Devlet-EdemDevl-Listin-oylgio*/