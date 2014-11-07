<?php
	define('STELLAR-FEDERATION', true);
	include('functions.php');
	include('config.php');
	
	$host = getEmailDomainFromRequest();
	if(!validateEmailDomain($host, $DATA))
	{
		header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found");
		exit("stellar.txt not found for email domain: $host");
	}
		
	header('Content-Type: text/plain');
	header('Access-Control-Allow-Origin: *');
 ?>
 [federation_url]
 https://<?php echo($_SERVER['HTTP_HOST'])?>/federation.php
