<?php

$app = require_once __DIR__ . '/bootstrap.php';

$app->get('/', function () use ($app) {
    return $app['twig']->render('index.twig');
});

return $app;