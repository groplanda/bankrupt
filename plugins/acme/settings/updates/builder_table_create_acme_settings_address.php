<?php namespace Acme\Settings\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateAcmeSettingsAddress extends Migration
{
    public function up()
    {
        Schema::create('acme_settings_address', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->string('name')->nullable();
            $table->string('post_code')->nullable();
            $table->string('street')->nullable();
            $table->text('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('open')->nullable();
            $table->string('open_sm')->nullable();
            $table->text('map')->nullable();
            $table->integer('sort_order')->default(0);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('acme_settings_address');
    }
}
