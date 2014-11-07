/* 
  Simple Stellar federation server.

  If the domain name of the email addresses you are hosting federation services for is example.com then 
  this should be hosted on a server that is resolved at any of the following domains

  stellar.example.com
  example.com
  www.example.com

*/

//TODO - Put in persistant store and add CRUD API
//TODO - Allow default address for a domain
var DATA = 
{ 
  'example.com' :
  {  
    'user1' : 'user1@example.com Stellar address',
    'user2' : 'user2@example.com Stellar address',
  },
  'example.net' :
  {  
    'user1' : 'user1@example.net Stellar address',
    'user2' : 'user2@example.net Stellar address',
  }
};

// Configure SSL, if you'd like to terminate it in Node. For testing
// without your own SSL certificate, use https://ngrok.com/ to set up
// an SSL-secured localtunnel.
var USE_SSL = false;
var PRIVATE_KEY_PATH = 'sslcert/server.key';
var CERTIFICATE_PATH = 'sslcert/server.crt';

// Include dependencies
var express = require('express');
var https = require('https');
var fs = require('fs');

// Create the server
var app = express();

//Extract email domain from request domain
function getEmailDomainFromRequest(req)
{
  var host = ( req.headers.host.match(/:/g) ) ? req.headers.host.slice( 0, req.headers.host.indexOf(":") ) : req.headers.host
  //stellar subdomain (will match stellar.org for now)
  if(host.length > 8 && host.substr(0,7) === 'stellar'){
    return host.substr(8, host.length - 8);

  }
  //www subdomain
  if(host.length > 3 && host.substr(0,3) === 'www'){
    return host.substr(4, host.length - 4);
  }
  //Use as is
  return host;
}

//Validate domain
function validateEmailDomain(emailDomain)
{
  return 1 && DATA[emailDomain];
}

// Accept federation requests
app.get('/stellar/federation', function(req, res) {

  //Only type=federation is supported
  if(req.query.type != 'federation'){
    res.send(400, 'Unsupported type [' + req.query.type + ']');
    return;
  }

  //Get user from query string
  var user = req.query.user || req.query.destination
  if(!user){
    res.status(400).send('No user or destination specified in request');
    return;
  }  

  //Get and validate domain
  var emailDomain = getEmailDomainFromRequest(req);
  if(emailDomain != req.query.domain)
  {
    //TODO - Allow this service to host federation endpoint for other domains
    res.status(400).send('Requested domain [' + req.query.domain + '] doesn\'t match host domain [' + emailDomain + ']');
    return;
  }

  if(!validateEmailDomain(emailDomain))
  {
    res.status(404).send('No federation data found for email domain [' + emailDomain + ']');
    return;
  }

  if(!DATA[emailDomain][user]){
    //Possibly allows SPAM bots to harvest email addresses?
    res.status(404).send('Stellar address not found for user [' + user + '@' + emailDomain + ']');
  }  

  res.set('Access-Control-Allow-Origin', '*');
  res.send({
    federation_json: {
      type:                'federation_record',
      destination:         user,
      domain:              emailDomain,
      destination_address: DATA[emailDomain][user]
    }
  });
});

// Accept federation URL requests
app.get('/stellar.txt', function(req, res) {

  //Determine and validate the email domain
  var emailDomain = getEmailDomainFromRequest(req);
  if(!validateEmailDomain(emailDomain))
  {
    res.status(404).send('stellar.txt not found for email domain: ' + emailDomain);
    return;
  }

  res.set('Content-Type', 'text/plain');
  res.set('Access-Control-Allow-Origin', '*');
  res.send('[federation_url]\nhttps://' + req.get('host') + '/stellar/federation');
});

if (USE_SSL) {
  var privateKey  = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
  var certificate = fs.readFileSync(CERTIFICATE_PATH, 'utf8');

  var server = https.createServer({key: privateKey, cert: certificate}, app);

  console.log("Starting server on port 443");
  server.listen(443);
} else {
  console.log("Starting server on port 5000")
  // Needs to served behind reverse proxy
  app.listen(5000);
}
