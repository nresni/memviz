<?php

require_once __DIR__.'/vendor/silex.phar';

$app = new Silex\Application();

$app->register(new Silex\Extension\TwigExtension(), array(
    'twig.path' => __DIR__ . '/views',
    'twig.class_path' => __DIR__ . '/vendor/twig/lib'
));

return $app;
