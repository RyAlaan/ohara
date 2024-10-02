<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Borrowing extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'start_date',
        'end_date',
        'status',
    ];

    /**
     * Get the user that owns the Borrowing
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the book that owns the Borrowing
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function Book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
