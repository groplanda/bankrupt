<?php namespace Acme\quiz\Models;

use Model;

/**
 * Model
 */
class Question extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = false;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'acme_quiz_questions';

    protected $jsonable = ['questions'];

    /**
     * @var array Validation rules
     */
    public $rules = [
        'title'   => 'required',
    ];
}
