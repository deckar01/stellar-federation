#Serve Stellar federation from your domain using nodejs and express

##Dependencies

- Nodejs
- npm

##Setup

SSL is required. You can choose whether to terminate SSL in node, or
to run the server behind a reverse proxy.

First, install express and https (assuming you want to terminate in
node).

```bash
npm install -g express
npm install -g https
```

Next, the domain, Stellar address, and SSL certificate at the top of
stellarFederation.js. (Per the comment, https://ngrok.com/ can give
you an SSL-secured localtunnel if you'd like to test federation.)

```js
// Configure federation
var DOMAIN_NAME = 'example.com';
var STELLAR_ADDRESS = 'Stellar address goes here';

// Configure SSL, if you'd like to terminate it in Node. For testing
// without your own SSL certificate, use https://ngrok.com/ to set up
// an SSL-secured localtunnel.
var USE_SSL = false;
var PRIVATE_KEY_PATH = 'sslcert/server.key';
var CERTIFICATE_PATH = 'sslcert/server.crt';
```

##Usage

Run the server.

```bash
node stellarFederation.js
```
