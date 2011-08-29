<?php

namespace Memviz\Extension;

use Silex\Application;
use Silex\ExtensionInterface;
use Memviz\MemcacheCache;

class CacheExtension implements ExtensionInterface
{
    /**
     * Registers an extension.
     *
     * @param \Silex\Application $app An Application instance
     */
    function register(Application $app)
    {
        $app['cache'] = $app->share(function() use ($app)
            {
                if (!isset($app['cache.library'])) {
                    throw new \BadMethodCallException("You must defined a cache library");
                }

                switch ($app['cache.library']) {
                    case 'memcache':
                        $cache = new MemcacheCache();
                        break;
                    default:
                        throw new \InvalidArgumentException(sprintf("Unknow < %s > cache library", $app['cache.library']));
                }

                return $cache;
            });
    }

}
