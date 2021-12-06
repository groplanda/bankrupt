<?php namespace Acme\Settings\Components;

use Acme\Settings\Models\BriefCase;

class Brief extends \Cms\Classes\ComponentBase
{
    public $briefs;

    public function componentDetails()
    {
        return [
            'name' => 'Дела',
            'description' => 'Отобразить дела на сайте'
        ];
    }

    public function onRun()
    {
      $this->briefs = BriefCase::orderBy('sort_order', 'asc')->where('is_active', 1)->get();
    }
}