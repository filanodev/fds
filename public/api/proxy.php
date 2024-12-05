<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Si c'est une requête OPTIONS (pre-flight), on arrête ici
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Récupérer le chemin après /api/proxy/
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path_parts = explode('/api/proxy/', $path, 2);
$api_path = isset($path_parts[1]) ? $path_parts[1] : '';

// Construire l'URL de l'API Piketplace
$api_url = 'https://mainnet-backend.piketplace.com/api/v1/' . $api_path;

// Ajouter les paramètres de requête s'il y en a
if ($_SERVER['QUERY_STRING']) {
    $api_url .= '?' . $_SERVER['QUERY_STRING'];
}

// Initialiser cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Transférer les en-têtes de la requête originale
$headers = [];
foreach (getallheaders() as $name => $value) {
    if (strtolower($name) !== 'host') {
        $headers[] = "$name: $value";
    }
}
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// Transférer la méthode HTTP
$method = $_SERVER['REQUEST_METHOD'];
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

// Si c'est une requête POST, transférer les données
if ($method === 'POST') {
    $input = file_get_contents('php://input');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
}

// Exécuter la requête
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Gérer les erreurs
if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Proxy Error: ' . curl_error($ch)]);
} else {
    http_response_code($http_code);
    echo $response;
}

curl_close($ch);
