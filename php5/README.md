#Serve Stellar federation from your domain using PHP5 and Apache2

##Dependencies

- PHP5
- Apache2

##Setup

SSL is required.
Apache can be configured to handle SSL by editing the config files to turn the SSL engine on and point it to the location of the certificate files.

See http://httpd.apache.org/docs/2.2/ssl/ for more info.

Next configure the domain(s), Stellar address(s) at the top of config.php

```php
$DATA = array(
  'example.com' =>
  array(  
    'user1' => 'user1@example.com Stellar address',
    'user2' => 'user2@example.com Stellar address',
  ),
  'example.net' =>
  array(  
    'user1' => 'user1@example.net Stellar address',
    'user2' => 'user2@example.net Stellar address',
  )
);
```

##Usage

- Clone into a directory on your Apache server.
- Edit the .htaccess file to use either mod_rewrite or a custom handler directive to serve stellar.txt
- Set the php5 folder as the root of your web host

##Domains

If the domain name of the email addresses you are hosting federation services for is example.com then this should be hosted on a server that is resolved at any of the following domains:

- stellar.example.com
- example.com
- www.example.com

##Hosting

The easiest way to offer Stellar federation on a domain without impacting other
services on that domain is to simply host this service at the subdomain stellar.example.com and to create a DNS record for the domain that directs requests to the server hosting this script.

### Example (Ubuntu 14.04)

Apache config for a virtual host acting as Stellar federation service:
- Usually stored in /etc/apache2/sites-available with a symlink from /etc/apache2/sites-enabled
- Certificate generated and stored at /etc/apache2/apache.pem
- Repo has been cloned to /var/www/stellar

```
<VirtualHost *:443>

        ServerName stellar.example.com
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/stellar/stellar-federation/php5

		SSLEngine on
		SSLCertificateFile /etc/apache2/apache.pem

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>

```
Multiple domains can be serviced by this single instance (add a ServerAlias directive for each domain).

## Common Issues

- Enable mod_ssl (See: /etc/apache2/mods-enabled.conf)
- Ensure Apache is listening on port 443 (See: /etc/apache2/ports.conf)