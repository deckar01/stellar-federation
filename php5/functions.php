<?php
if(!defined('STELLAR-FEDERATION')) exit();

//Extract email domain from request domain
function getEmailDomainFromRequest()
{
	$host = $_SERVER['SERVER_NAME'];
	
	//stellar subdomain (will match stellar.org for now)
	if(strlen($host) > 8 && substr($host, 0, 7) == 'stellar'){
		return substr($host, 8, strlen($host) - 8);
	}
	//www subdomain
	if(strlen($host) > 4 && substr($host, 0, 3) == 'stellar'){
		return substr($host, 4, strlen($host) - 4);
	}
	//Use as is
	return $host;
}

//Validate domain
function validateEmailDomain($emailDomain, $data)
{
	return isset($data[$emailDomain]);
}
