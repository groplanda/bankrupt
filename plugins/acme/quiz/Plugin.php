<?php namespace Acme\quiz;

use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public function registerComponents()
    {
        return [
            'Acme\Quiz\Components\Quiz' => 'quiz'
        ];
    }

    public function registerSettings()
    {
    }
}
