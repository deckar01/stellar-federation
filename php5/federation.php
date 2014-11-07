<?php
	define('STELLAR-FEDERATION', true);
	include('functions.php');
	include('config.php');

	//Only type=federation is supported
	if($_GET['type'] != 'federation'){
		header($_SERVER["SERVER_PROTOCOL"]." 400 Bad request");
		exit('Unsupported type [' . htmlspecialchars($_GET['type']) . ']');
	}

	//Get user from query string
	$user = isset($_GET['user']) ? $_GET['user'] :  $_GET['destination'];
	
	if(!$user){
		header($_SERVER["SERVER_PROTOCOL"]." 400 Bad request");
		exit('No user or destination specified in request');
	}
	
	//Get and validate domain
	$emailDomain = getEmailDomainFromRequest();
	if($emailDomain != $_GET['domain'])
	{
		//TODO - Allow this service to host federation endpoint for other domains
		header($_SERVER["SERVER_PROTOCOL"]." 400 Bad request");
		exit('Requested domain [' . htmlspecialchars($_GET['domain']) . '] doesn\'t match host domain [' . $emailDomain . ']');
	}

	if(!validateEmailDomain($emailDomain, $DATA))
	{
		header($_SERVER["SERVER_PROTOCOL"]." 400 Bad request");
		exit('No federation data found for email domain [' . htmlspecialchars($emailDomain) . ']');
	}

	if(!isset($DATA[$emailDomain][$user])){
		//Possibly allows SPAM bots to harvest email addresses?
		header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found");
		exit("Stellar address not found for user [$user@$emailDomain]");
	}

	header('Content-Type: application/json');
	header('Access-Control-Allow-Origin: *');
?>
federation_json: {
	type:                'federation_record',
	destination:         '<?php echo($user)?>',
	domain:              '<?php echo($emailDomain)?>',
	destination_address: '<?php echo($DATA[$emailDomain][$user])?>'
}