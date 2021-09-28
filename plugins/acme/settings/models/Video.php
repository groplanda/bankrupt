<?php namespace Acme\Settings\Models;

use Model;

/**
 * Model
 */
class Video extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\Sortable;
    use \October\Rain\Database\Traits\SimpleTree;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'acme_settings_video';

    /**
     * @var array Validation rules
     */
    public $rules = [
      'title' => 'required',
      'url' => 'required',
      'preview' => 'max:1024'
    ];
}
