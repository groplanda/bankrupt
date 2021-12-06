<?php namespace Acme\Settings\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateAcmeSettingsCases extends Migration
{
    public function up()
    {
        Schema::create('acme_settings_cases', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->string('name')->nullable();
            $table->string('case')->nullable();
            $table->string('link')->nullable();
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->text('props')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('acme_settings_cases');
    }
}
