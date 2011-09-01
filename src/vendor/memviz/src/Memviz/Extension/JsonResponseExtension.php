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
        $string = "sXmlData||<?xml version='1.0' encoding='iso-8859-1'?><data><toto>tutu</toto><JobCategory>2101000:673_674_675_676_811_677_678</JobCategory></data>||erfzefzesXmlData||<?xml version='1.2' encoding='iso-8859-1'?><data><toto>tutu</toto><JobCategory>2101000:673_674_675_676_811_677_678</JobCategory></data>||erfzefze";

        preg_match('/(<\?xml.*>)/', $string, $matches);

        var_dump($matches);

        die();

        $app['json'] = $app->protect(function ($body) use ($app)
            {
                for ($i = 0; $i < count($body); $i++) {
                    if (is_string($body[$i]['value']) && preg_match('/.*(<\?xml.*>+).*/', $body[$i]['value'], $matches)) {
                        $body[$i]['value'] = $app->escape($body[$i]['value']);
                        $body[$i]['type'] = "STRING";
                    } else {
                        $body[$i]['type'] = "JSON";
                    }
                }

                $response = array('data' => $body, 'success' => true);
                $response = new Response(json_encode($response));
                $response->headers->set('Content-Type', 'application/json');

                return $response;
            });
    }
}
