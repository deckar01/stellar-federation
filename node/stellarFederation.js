// Configure federation
var DOMAIN_NAME = 'example.com';
var STELLAR_ADDRESS = 'Stellar address goes here';

// Configure SSL
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

// Include dependencies
var express = require('express');
var https = require('https');

// Create the server
var app = express();
var server = https.createServer({key: privateKey, cert: certificate}, app);

// Accept federation requests
app.get('/federation', function(req, res) {
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
    res.send('[federation_url]\nhttp://' + DOMAIN_NAME + '/federation');
});

// Start the server
server.listen(443);