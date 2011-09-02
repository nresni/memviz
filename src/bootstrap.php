<?php

require_once __DIR__.'/vendor/silex/autoload.php';

$app = new Silex\Application();

$app['autoloader']->registerNamespaces(array(
    'Doctrine' => __DIR__ . '/vendor/doctrine-common/lib',
    'Memviz' => __DIR__ . '/vendor/memviz/src',
    'Twig' => __DIR__ . '/vendor/twig/lib'
));

$app->register(new Silex\Extension\TwigExtension(), array(
    'twig.path' => __DIR__ . '/views',
    'twig.class_path' => __DIR__ . '/vendor/twig/lib'
));

$app->register(new Memviz\Extension\CacheExtension(), array('cache.library' => 'memcache'));
$app->register(new Memviz\Extension\JsonResponseExtension());

$app['debug'] = true;

return $app;
