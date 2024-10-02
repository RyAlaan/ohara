<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Author extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    /**
     * The books that belong to the Author
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function Books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'books_authors');
    }
}
