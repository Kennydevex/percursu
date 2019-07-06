<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExperiencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('task', 100);
            $table->date('from')->default(new DateTime());
            $table->date('to')->nullable();
            $table->boolean('ongoing')->nullable()->default(false);
            $table->string('employer', 120)->nullable();
            $table->multiLineString('responsibility')->nullable();
            $table->string('attachment', 100)->nullable()->default('default.svg');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('experiences');
    }
}
