<?php namespace Acme\Settings;

use System\Classes\PluginBase;
use Illuminate\Foundation\AliasLoader;

class Plugin extends PluginBase
{
    public function registerComponents()
    {
        return [
            'Acme\Settings\Components\Services' => 'services',
            'Acme\Settings\Components\Contents' => 'contents',
            'Acme\Settings\Components\Advantage' => 'advantage',
            'Acme\Settings\Components\feedbackForm' => 'feedbackform',
            'Acme\Settings\Components\feedbackList' => 'feedbacklist',
            'Acme\Settings\Components\Faq' => 'faq',
            'Acme\Settings\Components\Videos' => 'videos',
            'Acme\Settings\Components\Brief' => 'brief',
            'Acme\Settings\Components\ContactData' => 'ContactData',
            'Acme\Settings\Components\ContactModal' => 'ContactModal'
        ];
    }

    public function registerSettings()
    {

    }

    public function boot()
    {
      $this->app['Illuminate\Contracts\Http\Kernel']
      ->pushMiddleware('Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse');
    }

}
