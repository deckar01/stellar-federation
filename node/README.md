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

Next, the domain(s), Stellar address(s), and SSL certificate at the top of
stellarFederation.js. (Per the comment, https://ngrok.com/ can give
you an SSL-secured localtunnel if you'd like to test federation.)

```js
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
```

##Usage

Run the server.

```bash
node stellarFederation.js
```

##Domains

If the domain name of the email addresses you are hosting federation services 
for is example.com then this should be hosted on a server that is resolved at 
any of the following domains:

- stellar.example.com
- example.com
- www.example.com

The easiest way to offer Stellar federation on a domain without impacting other
services on that domain is to simply host this service at the subdomain stellar.example.com.

Multiple domains can be serviced by this single instance.