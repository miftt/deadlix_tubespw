<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('watchlists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('movie_id');
            $table->timestamps();
            
            // Memastikan user tidak bisa menambahkan film yang sama dua kali
            $table->unique(['user_id', 'movie_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('watchlists');
    }
}; 