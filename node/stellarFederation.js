// Simple Stellar federation server.
//
// You may have to `npm i express` to install dependencies.

// Configure federation
var DOMAIN_NAME = 'example.com';
var STELLAR_ADDRESS = 'Stellar address goes here';

// Configure SSL, if you'd like to terminate it in Node. For testing
// without your own SSL certificate, use https://ngrok.com/ to set up
// an SSL-secured localtunnel.
var USE_SSL = false;
var PRIVATE_KEY = 'sslcert/server.key';
var PUBLIC_KEY = 'sslcert/server.crt';

// Include dependencies
var express = require('express');
var https = require('https');
var fs = require('fs');

// Create the server
var app = express();

// Accept federation requests
app.get('/stellar/federation', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.send({
    federation_json: {
      type:                'federation_record',
      destination:         req.query.destination,
      domain:              DOMAIN_NAME,
      destination_address: STELLAR_ADDRESS
    }
  });
});

// Accept federation URL requests
app.get('/stellar.txt', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.set('Access-Control-Allow-Origin', '*');
  res.send('[federation_url]\nhttps://' + DOMAIN_NAME + '/stellar/federation');
});

if (USE_SSL) {
  var privateKey  = fs.readFileSync(PRIVATE_KEY, 'utf8');
  var certificate = fs.readFileSync(PUBLIC_KEY, 'utf8');

  var server = https.createServer({key: privateKey, cert: certificate}, app);
  server.listen(5000);
} else {
  app.listen(5000);
}
