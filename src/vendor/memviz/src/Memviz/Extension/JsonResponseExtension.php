<?php
namespace Memviz\Extension;

use Silex\Application;
use Silex\ExtensionInterface;
use Symfony\Component\HttpFoundation\Response;

class JsonResponseExtension implements ExtensionInterface
{
    /**
     * Registers an extension.
     *
     * @param \Silex\Application $app An Application instance
     *
     * @return json response
     */
    function register(Application $app)
    {
        $app['json'] = $app->protect(function ($body) use ($app)
            {
                $response = array('data' => $body, 'success' => true);
                $response = new Response(json_encode($response));
                $response->headers->set('Content-Type', 'application/json');

                return $response;
            });
    }
}
