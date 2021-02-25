<?php namespace Acme\quiz\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateAcmeQuizQuestions extends Migration
{
    public function up()
    {
        Schema::create('acme_quiz_questions', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('title');
            $table->text('questions');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('acme_quiz_questions');
    }
}
