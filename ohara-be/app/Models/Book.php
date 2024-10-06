<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'ISBN',
        'name',
        'title',
        'synopsis',
        'publisher',
        'cover',
        'price',
        'stock',
    ];


    /**
     * The categories that the book belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'books_categories');
    }

    /**
     * Get the authors that the book belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function authors(): BelongsToMany
    {
        return $this->belongsToMany(Author::class, 'books_authors');
    }
}
