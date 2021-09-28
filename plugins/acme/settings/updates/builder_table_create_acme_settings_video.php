<?php namespace Acme\Settings\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateAcmeSettingsVideo extends Migration
{
    public function up()
    {
        Schema::create('acme_settings_video', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->string('title')->nullable();
            $table->text('descr')->nullable();
            $table->string('url')->nullable();
            $table->string('preview')->nullable();
            $table->integer('sort_order')->nullable()->default(0);
            $table->boolean('is_show')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('acme_settings_video');
    }
}
