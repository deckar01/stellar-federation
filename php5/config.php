<?php 
if(!defined('STELLAR-FEDERATION')) exit();

//TODO - Put in persistant store and add CRUD API
//TODO - Allow default address for a domain
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