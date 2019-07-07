<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('designation', 100);
            $table->date('from');
            $table->date('to')->nullable();
            $table->boolean('ongoing')->nullable()->default(false);
            $table->string('institution', 120)->nullable();
            $table->multiLineString('subjects')->nullable();
            $table->enum('level', ['1', '2', '3', '4', '5'])->nullable();
            $table->string('country', 50)->nullable()->default('Cabo Verde');
            $table->string('city', 50)->nullable();
            $table->string('attachment', 100)->nullable()->default('default.svg');
            
            $table->unsignedBigInteger('partner_id');
            
            $table->foreign('partner_id')->references('id')->on('partners')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('formations');
    }
}
