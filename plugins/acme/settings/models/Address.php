<?php namespace Acme\Settings\Models;

use Model;

/**
 * Model
 */
class Address extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\Sortable;
    use \October\Rain\Database\Traits\SimpleTree;

    const SORT_ORDER = 'name';

    protected $jsonable = ['phone'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'acme_settings_address';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];
}
