<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'price',
        'duration',
        'features',
        'popular'
    ];

    protected $casts = [
        'features' => 'array',
        'popular' => 'boolean'
    ];
}
