<?php namespace Acme\Settings\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateAcmeSettingsAdvantages3 extends Migration
{
    public function up()
    {
        Schema::table('acme_settings_advantages', function($table)
        {
            $table->string('image')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('acme_settings_advantages', function($table)
        {
            $table->dropColumn('image');
        });
    }
}
