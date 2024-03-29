<?php

namespace ProcessWire;

class ImageFromPage extends WireData
{
	public function __construct() {
		$this->set('filename', ''); 
		$this->set('pageid', 0); 
	}

    public function set($key, $value)
    {
        if ($key == 'filename') {
            $value = wire('sanitizer')->filename($value);
        } else if ($key == 'pageid') {
            $value = (int) $value;
        }
        return parent::set($key, $value);
    }

    /**
     * If accessed as a string, then just output as a JSON string
     *
     */
    public function __toString()
    {
        return "{\"pageid\": $this->pageid, \"filename\": \"$this->filename\"}";
    }

}
