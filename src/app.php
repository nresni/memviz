<?php

$app = require_once __DIR__ . '/bootstrap.php';

$app->get('/', function () use ($app) {
    return $app['twig']->render('index.twig');
});

$app->get('/all', function() use ($app) {
    return $app['json']($app['cache']->fetchAll());
});

$app->get('/{id}', function($id) use ($app) {
    return $app['json']($app['cache']->fetch($id));
});

$app->get('/search/key/{key}', function($key) use ($app) {
    return $app['json']($app['cache']->fetchKeyByRegex("/$key/"));
});

$app->get('/search/value/{value}', function($value) use ($app) {
    throw new \BadMethodCallException('Not implemented yet');
});

$app->get('/search/key/{key}/value/{value}', function($key, $value) use ($app) {
    throw new \BadMethodCallException('Not implemented yet');
});

return $app;