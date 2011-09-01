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
        $scope = $this;
        $app['json'] = $app->protect(function ($body) use ($app, $scope)
            {
                for ($i = 0; $i < count($body); $i++) {
                    if (is_string($body[$i]['value']) && preg_match_all('/(<[^<>]*>)\1*/', $body[$i]['value'], $matches)) {
                        $body[$i]['value'] = $scope->formatXML($body[$i]['value'], $matches, $app);
                        $body[$i]['type'] = 'XML';
                    } else {
                        $body[$i]['type'] = 'JSON/STRING';
                    }
                }

                $response = array('data' => $body, 'success' => true);
                $response = new Response(json_encode($response));
                $response->headers->set('Content-Type', 'application/json');

                return $response;
            });
    }

    /**
     * @param  string $value
     * @param  array  $matches
     * @return array
     */
    public function formatXML($value, array $matches)
    {
        $headers = array();
        for ($i = 0; $i < count($matches[1]); $i++) {
            if (strstr($matches[1][$i], '<?xml')) {
                $headers[] = $matches[1][$i];
            }
        }

        $headers = array_unique($headers);

        $xml = array();
        if (count($headers) == 1) {
            $arr = explode($headers[0], $value);
            foreach ($arr as $v) {
                if (false !== $pos = strrpos($v, '>')) {
                    $v = substr($v, 0, ($pos + 1));
                    $xml[] = new \SimpleXMLElement($headers[0] . "<a>" . $v . "</a>");
                }
            }
        } else if (count($headers) > 1) {
            //@todo: experimental
            $headers = array_reverse($headers);
            $lastHeaderPos = $length = strlen($value);
            foreach ($headers as $header) {
                $headerPos = strrpos($value, $header);
                $v = substr($value, ($headerPos), $lastHeaderPos);
                $pos = strrpos($v, '>');
                $xml[] = new \SimpleXMLElement(substr($v, 0, ($pos + 1)));
                $lastHeaderPos = $headerPos - $length;
            }

            $xml = array_reverse($xml);
        }

        return $xml;
    }
}
