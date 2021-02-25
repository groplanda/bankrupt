<?php namespace Acme\Settings\Models;

use Model;

/**
 * Model
 */
class Project extends Model
{
    use \October\Rain\Database\Traits\Validation;
    
    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'acme_settings_project';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'title' => 'required',
        'photo' => 'max:1024'
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }
}
