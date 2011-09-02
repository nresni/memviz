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
                        $body[$i]['type'] = 'xml';
                    } else if (is_bool($body[$i]['value'])) {
                        $body[$i]['type'] = 'boolean';
                    }
                    else {
                        $body[$i]['type'] = 'json/string';
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

        $headers = array_reverse($headers);
        $lastHeaderPos = $length = strlen($value);
        foreach ($headers as $header) {
            $pos = strrpos($value, $header, ($lastHeaderPos == $length ? 0 : $lastHeaderPos) - 1);

            $v = substr($value, ($pos), $lastHeaderPos);

            $p = strrpos($v, '>');
            $str = substr(trim(utf8_encode($v)), 0, ($p + 1));

            $arr = explode($header, $str);

            $xml[] = new \SimpleXMLElement($header . '<a>' . trim(utf8_encode($arr[1])) . '</a>');
            $lastHeaderPos = $pos - $length;
        }

        return $xml;
    }
}
