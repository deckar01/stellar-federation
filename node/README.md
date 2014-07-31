#Serve Stellar federation from your domain using nodejs and express

##Dependencies

 - Nodejs
 - npm

##Setup

Install express and https.

```bash
npm install -g express
npm install -g https
```

Configure the domain, Stellar address, and SSL certificate at the top of stellarFederation.js.

```js
// Configure federation
var DOMAIN_NAME = 'example.com';
var STELLAR_ADDRESS = 'Stellar address goes here';

// Configure SSL
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
```

##Usage

Run the server.

```bash
node stellarFederation.js
```