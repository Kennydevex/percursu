<?php

namespace Percursu\Models\Percursu;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'task',
        'from',
        'to',
        'ongoing',
        'employer',
        'responsibility',
        'attachment'
    ];
}