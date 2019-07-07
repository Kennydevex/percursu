<?php

namespace Percursu\Models\System;


use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Laratrust\Traits\LaratrustUserTrait;

class User extends Authenticatable implements JWTSubject
{
    use LaratrustUserTrait;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 
        'username', 
        'password', 
        'status',
        'category_id', 
        'folk_id', 
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token',];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = ['email_verified_at' => 'datetime',];

    public function getJWTIdentifier(){return $this->getKey();}
    
    public function getJWTCustomClaims(){return [];}

    public function folk(){return $this->belongsTo('Folk');}

    public function posts(){return $this->hasMany('Post');}

    public function companies(){return $this->hasMany('Company');}

    public function getStatusAttribute($value){if ($value) {return true;}return false;}

    public function setEmailAttribute($value){$this->attributes['email'] = strtolower($value);}
}
