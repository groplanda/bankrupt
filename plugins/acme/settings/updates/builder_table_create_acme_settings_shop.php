<?php namespace Acme\Settings\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateAcmeSettingsShop extends Migration
{
    public function up()
    {
        Schema::create('acme_settings_shop', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->integer('sort_order')->nullable()->default(0);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('acme_settings_shop');
    }
}
