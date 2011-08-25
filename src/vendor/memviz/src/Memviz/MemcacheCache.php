<?php

namespace Memviz;

use Doctrine\Common\Cache\MemcacheCache as Memcache;

class MemcacheCache extends Memcache
{
    /**
     * @throws \BadMethodCallException
     * @param array $servers
     */
    public function __construct(array $servers = array())
    {
        if (!class_exists('Memcache')) {
            throw new \BadMethodCallException('You must have memcache installed.');
        }

        $memcache = new \Memcache();

        $servers = $servers ?: array(array('127.0.0.1', 11211));

        foreach ($servers as $config) {
            call_user_func_array(array($memcache, 'addServer'), array_values($config));
        }

        $this->setMemcache($memcache);
    }

    /**
     * Fetch cache entries where the id matches a PHP regular expressions
     *
     * @param  string $regex
     * @return array  $fetched  Array of the deleted cache ids
     */
    public function fetchKeyByRegex($regex)
    {
        $ids = $this->getIds();

        $fetched = array();
        foreach ($ids as $id) {
            if (preg_match($regex, $id)) {
                $fetched[$id] = $this->fetch($id);
            }
        }

        return $fetched;
    }

    /**
     * Fetch cache entries where the id matches a PHP regular expressions
     *
     * @param  string $regex
     * @return array  $fetched  Array of the deleted cache ids
     */
    public function fetchAll()
    {
        $ids = $this->getIds();

        $fetched = array();
        foreach ($ids as $id) {
            $fetched[] = array('key' => $id, 'value' => $this->fetch($id));
        }

        return $fetched;
    }
}
