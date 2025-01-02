<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Carbon\Carbon;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'google_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getProfilePhotoUrlAttribute()
    {
        if ($this->profile_photo) {
            return asset('storage/profile-photos/' . $this->profile_photo);
        }

        return asset('default-avatar.png');
    }

    public function watchlists()
    {
        return $this->hasMany(Watchlists::class);
    }

    public function subscription()
    {
        return $this->hasOne(UserSubscription::class)->latest();
    }

    public function hasActiveSubscription()
    {
        return $this->subscription && $this->subscription->isActive();
    }

    public function getSubscriptionTypeAttribute()
    {
        return $this->subscription ? $this->subscription->product->name : null;
    }

    public function getSubscriptionDetailsAttribute()
    {
        if (!$this->subscription) {
            return null;
        }

        return [
            'type' => $this->subscription->product->name,
            'expires_at' => $this->subscription->expires_at,
            'status' => $this->subscription->status,
            'product' => $this->subscription->product
        ];
    }

    public function getIsPremiumAttribute()
    {
        if (!$this->subscription) {
            return false;
        }

        return $this->subscription->status === 'active'
            && Carbon::parse($this->subscription->expires_at)->isFuture();
    }

    protected $appends = [
        'is_premium'
    ];

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class);
    }
}
