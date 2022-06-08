<?php namespace Acme\Settings\Components;

use Cms\Classes\ComponentBase;
use Acme\Settings\Models\Address;
use Cookie;

class ContactData extends ComponentBase
{

  public function componentDetails()
  {
      return [
          'name'          => 'Блок контактов',
          'description'   => 'показать контакты'
      ];
  }

  public function defineProperties()
    {
      return [
          'templateType' => [
            'title'       => 'Выбор',
            'type'        => 'dropdown',
            'default'     => 'default',
            'placeholder' => 'Выберите...',
            'options'     => ['default' => 'Шапка', 'footer' => 'Подвал', 'mobile' => 'Мобилка']
          ]
      ];
    }

    public function onRender()
    {
      $view = $this->property('templateType');

      if($view == 'footer') {
        return $this->renderPartial('@_footer.htm');
      }
      if($view == 'mobile') {
        return $this->renderPartial('@_mobile.htm');
      }
    }

  public function prepareVars()
  {
    $data = [];
    $count = Address::count();

    if ($count > 1) {
      if (isset($_COOKIE['selected_city']) && !empty($_COOKIE['selected_city'])) {
        $cidyId = $_COOKIE['selected_city'];
        $data = Address::findOrFail((int)$cidyId);
      } else {
        $data = Address::orderBy('sort_order', 'asc')->first();
      }
    } else {
      $data = Address::orderBy('sort_order', 'asc')->first();
    }

    return [
      'data' => $data,
      'count' => $count
    ];
  }

  public function onRun()
  {
    $result = $this->prepareVars();
    $this->page['contact'] = $result['data'];
    $this->page['count'] = $result['count'];
  }


}
