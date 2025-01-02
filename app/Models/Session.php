<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    protected $table = 'sessions';
    public $timestamps = false;

    protected $casts = [
        'last_activity' => 'datetime',
        'payload' => 'array',
    ];

    protected $fillable = [
        'id',
        'user_id',
        'ip_address',
        'user_agent',
        'payload',
        'last_activity'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Helper method untuk mendapatkan activity type dari payload
    public function getActivityTypeAttribute()
    {
        return $this->payload['activity_type'] ?? 'session';
    }

    // Helper method untuk mendapatkan description dari payload
    public function getDescriptionAttribute()
    {
        return $this->payload['description'] ?? 'Session activity';
    }
}
