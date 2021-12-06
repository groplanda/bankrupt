<?php namespace Acme\Settings\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateAcmeSettingsCases extends Migration
{
    public function up()
    {
        Schema::table('acme_settings_cases', function($table)
        {
            $table->boolean('is_active')->nullable();
            $table->integer('sort_order')->nullable()->default(0);
        });
    }
    
    public function down()
    {
        Schema::table('acme_settings_cases', function($table)
        {
            $table->dropColumn('is_active');
            $table->dropColumn('sort_order');
        });
    }
}
