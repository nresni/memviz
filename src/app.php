<?php

$app = require_once __DIR__ . '/bootstrap.php';

$app->get('/', function () use ($app) {
    return $app['twig']->render('base.twig');
});

$app->get('/search', function() use ($app) {
    $app['cache']->setServers(array(array($app['request']->get('host'), $app['request']->get('port'))));

    if (false !== $query = $app['request']->get('query')) {
        return $app['json']($app['cache']->fetchKeyByRegex("/$query/"));
    } else {
        return $app['json']($app['cache']->fetchAll());
    }
});

return $app;