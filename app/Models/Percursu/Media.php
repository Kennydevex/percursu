<?php

namespace Percursu\Models\Percursu;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'name', 
        'description', 
        'type'
    ];
}
