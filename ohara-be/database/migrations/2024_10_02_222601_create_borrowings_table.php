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
        Schema::create('borrowings', function (Blueprint $table) {
            $table->string("id")->primary();
            $table->unsignedBigInteger("user_id");
            $table->string("book_id");
            $table->timestamp("exp_date")->nullable();
            $table->timestamp("start_date")->nullable();
            $table->timestamp("end_date")->nullable();
            $table->enum("status", ['awaiting confirmation', 'borrowed', 'lost', 'returned']);
            $table->decimal('fine', 10, 2)->default(0);
            $table->timestamps();
            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("NO ACTION");
            $table->foreign("book_id")->references("id")->on("books")->onUpdate("CASCADE")->onDelete("NO ACTION");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('borrowings');
    }
};
