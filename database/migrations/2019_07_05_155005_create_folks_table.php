<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFolksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('folks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 150)->unique();
            $table->enum('gender', ['m', 'f'])->nullable();
            $table->string('avatar', 100)->nullable()->default('default.svg');
            $table->string('ic', 50)>unique();
            $table->string('nif', 50)>unique();
            $table->date('birthdate')->nullable();
            $table->unsignedBigInteger('category_id');
            $table->timestamps();


            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('folks');
    }
}
