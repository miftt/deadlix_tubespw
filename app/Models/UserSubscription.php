<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSubscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'starts_at',
        'expires_at',
        'status'
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'expires_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function isActive()
    {
        return $this->status === 'active' && $this->expires_at->isFuture();
    }

    public function getSubscriptionTypeAttribute()
    {
        return $this->product->name;
    }
}
