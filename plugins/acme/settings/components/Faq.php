<?php namespace Acme\Settings\Components;

use Acme\Settings\Models\Answer;

class Faq extends \Cms\Classes\ComponentBase
{
    public $answers;

    public function componentDetails()
    {
        return [
            'name' => 'FAQ',
            'description' => 'Ответы на вопросы'
        ];
    }

    public function onRun()
    {
      $query = Answer::orderBy('sort_order', 'asc')->get();
      $this->answers = $query;
    }

}