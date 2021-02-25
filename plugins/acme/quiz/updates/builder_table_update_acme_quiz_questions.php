<?php namespace Acme\quiz\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateAcmeQuizQuestions extends Migration
{
    public function up()
    {
        Schema::table('acme_quiz_questions', function($table)
        {
            $table->integer('sort_order')->nullable()->default(0);
            $table->text('questions')->nullable()->change();
            $table->string('title', 191)->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('acme_quiz_questions', function($table)
        {
            $table->dropColumn('sort_order');
            $table->text('questions')->nullable(false)->change();
            $table->string('title', 191)->nullable(false)->change();
        });
    }
}
