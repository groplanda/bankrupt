<?php namespace Acme\Settings\Components;

use Acme\Settings\Models\Video;

class Videos extends \Cms\Classes\ComponentBase
{
    public $videos;

    public function componentDetails()
    {
        return [
            'name' => 'Видео',
            'description' => 'Видео отзывы'
        ];
    }

    public function onRun()
    {
      $query = Video::orderBy('sort_order', 'asc')->where('is_show', 1)->get();
      $this->videos = $query;
    }

}