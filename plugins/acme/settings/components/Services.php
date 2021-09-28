<?php namespace Acme\Settings\Components;

use Cms\Classes\ComponentBase;
use Acme\Settings\Models\Service;
use Response;

class Services extends ComponentBase
{
    public $service;

    public function componentDetails()
    {
        return [
            'name'          => 'Блок услуги',
            'description'   => 'Добавить блок с услугами'
        ];
    }

    public function defineProperties()
    {
        return [
            'serviceName' => [
                'title'             => 'Выберите раздел',
                'type'              => 'dropdown',
                'default'           => 'us'
            ],

            'servicesType' => [
              'title'             => 'Внешний вид',
              'type'              => 'dropdown',
              'default'           => 'base',
              'placeholder' => 'Выберите тип',
              'options'     => ['base'=>'По умолчанию', 'list'=>'Две колонки модал', 'special'=>'Две колонки']
            ]
        ];

    }

    public function onRender()
    {
      $view = $this->property('servicesType');
      if($view == 'list') {
          return $this->renderPartial('@_list.htm');
      }
      if($view == 'special') {
        return $this->renderPartial('@_special.htm');
    }
    }

    public function getServiceNameOptions()
    {
        return Service::all()->lists('title', 'id');
    }

    public function onRun()
    {
        $service = new Service;
        $this->service = $service -> where( 'id', '=', $this->property('serviceName') )->first();
    }


}