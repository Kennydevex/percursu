<?php

namespace Percursu\Models\Helpers;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    public $timestamps = false;
    protected $fillable = ['lat', 'lng'];
}
