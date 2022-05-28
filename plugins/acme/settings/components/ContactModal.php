<?php namespace Acme\Settings\Components;

use Cms\Classes\ComponentBase;
use Acme\Settings\Models\Address;

class ContactModal extends ComponentBase
{

  public function componentDetails()
  {
      return [
          'name'          => 'Список городов',
          'description'   => 'Список городов'
      ];
  }

  public function prepareVars()
  {
    return Address::orderBy('sort_order', 'asc')->get();
  }

  public function onRun()
  {
    $cidyId = false;
    if (isset($_COOKIE['selected_city']) && !empty($_COOKIE['selected_city'])) {
      $cidyId = $_COOKIE['selected_city'];
    }

    $this->page['contacts'] = $this->prepareVars();
    $this->page['selectedId'] = $cidyId;
  }

}
