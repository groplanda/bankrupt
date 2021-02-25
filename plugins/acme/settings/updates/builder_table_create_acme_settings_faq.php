<?php namespace Acme\Settings\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateAcmeSettingsFaq extends Migration
{
    public function up()
    {
        Schema::create('acme_settings_faq', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->integer('sort_order')->nullable()->default(1);
        });
    }

    public function down()
    {
        Schema::dropIfExists('acme_settings_faq');
    }
}
