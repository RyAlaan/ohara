<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Book extends Model
{
    use HasFactory;

    protected $table = 'books';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'ISBN',
        'title',
        'synopsis',
        'release_date',
        'publisher',
        'cover',
        'price',
        'stock',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            // Format ID: ddmmyy0001
            $datePrefix = now()->format('dmy');
            $latestBook = self::where('id', 'like', "$datePrefix%")->latest('id')->first();

            if ($latestBook) {
                // Ambil ID terakhir dan tambahkan 1
                $lastNumber = substr($latestBook->id, -4);
                $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
            } else {
                $newNumber = '0001';
            }

            // Set ID baru
            $model->id = $datePrefix . $newNumber;
        });
    }

    public function getCoverAttribute($value)
    {
        return $value ? url('storage/books/' . $value) : null;
    }

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
