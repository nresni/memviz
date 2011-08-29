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
                /*$response = array('data' => $body, 'success' => true);
                $response = new Response(json_encode($response));*/
                $response = new Response('{"data":[{"key":"adendesk_frontoffice:developer:Company:5346428:Contract","value":{"contracts":[{"customer_relationship":[{"email":"dverloop@figarocms.fr","name":"VERLOOP Delphine","telephone":"03 59 31 64 07"}],"services":[{"product":{"family":{"name":"Offre","brand":{"name":"Keljob","code":"5000106"},"code":"5000008"},"name":"Offre","code":"5003238","reference":"01OFFEN0107"},"end_at":"2012-05-31T21:59:00.000Z","auto_renewall":false,"start_at":"2011-05-31T22:00:00.000Z","quantity":"1","code":"5213728"}],"created_at":"2010-08-03T08:17:21.000Z","code":"5213997","commercial":{"email":"mdelathebeaudiere@figarocms.fr","name":"DE LA THEBEAUDIERE Matth","telephone":"01 76 62 32 32"},"customer_type":{"code":"EN","type":"Entreprise"}},{"customer_relationship":[{"email":"dverloop@figarocms.fr","name":"VERLOOP Delphine","telephone":"03 59 31 64 07"}],"services":[{"product":{"family":{"name":"Offre","brand":{"name":"Cadremploi","code":"5000101"},"code":"5000008"},"name":"Offre","code":"5003217","reference":"02OFFEN0107"},"end_at":"2012-05-31T21:59:00.000Z","auto_renewall":false,"start_at":"2011-05-31T22:00:00.000Z","quantity":"1","code":"5213748"}],"created_at":"2010-08-03T08:20:53.000Z","code":"5214017","commercial":{"email":"mdelathebeaudiere@figarocms.fr","name":"DE LA THEBEAUDIERE Matth","telephone":"01 76 62 32 32"},"customer_type":{"code":"EN","type":"Entreprise"}}],"success":true}}],"success":true}');
                $response->headers->set('Content-Type', 'application/json');

                return $response;
            });
    }
}
