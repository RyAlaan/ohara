<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserDetail extends Model
{
    use HasFactory;

    /**
     * Atribut mana saja yang bisa diisi.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "user_id",
        "gender",
        "profile",
        "phone",
        'address',
    ];

    /**
     * Get the user that owns the UserDetail
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
