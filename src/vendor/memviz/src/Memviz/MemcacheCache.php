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
                $fetched[] = array('key' => $id, 'value' => $this->fetch($id));
            }
        }

        return $fetched;
    }

    /**
     * Fetch all cache entries
     *
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

    /**
     * @param  array $servers
     * @return void
     */
    public function setServers($servers)
    {
        foreach ($servers as $config) {
            call_user_func_array(array($this->getMemcache(), 'addServer'), array_values($config));
        }
    }


    /**
     * Returns all cache ds
     *
     * @return array
     */
    public function getIds()
    {
        $keys = array();
        $allSlabs = $this->getMemcache()->getExtendedStats('slabs');

        foreach ($allSlabs as $server => $slabs) {
            if (is_array($slabs)) {
                foreach (array_keys($slabs) as $slabId) {
                    if (is_int($slabId)) {
                        $dump = $this->getMemcache()->getExtendedStats('cachedump', (int)$slabId);
                        if ($dump) {
                            foreach ($dump as $entries) {
                                if ($entries) {
                                    $keys = array_merge($keys, array_keys($entries));
                                }
                            }
                        }
                    }
                }
            }
        }

        return $keys;
    }
}
