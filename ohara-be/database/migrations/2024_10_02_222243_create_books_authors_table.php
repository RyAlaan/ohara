<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books_authors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("author_id");
            $table->string("book_id");
            $table->timestamps();
            $table->foreign("author_id")->references("id")->on("authors")->onUpdate("CASCADE")->onDelete("CASCADE");
            $table->foreign("book_id")->references("id")->on("books")->onUpdate("CASCADE")->onDelete("CASCADE");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books_authors');
    }
};
