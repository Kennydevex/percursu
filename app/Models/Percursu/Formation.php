<?php

namespace Percursu\Models\Percursu;

use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'designation',
        'from',
        'to',
        'ongoing',
        'institution',
        'subjects',
        'level',
        'country',
        'city',
        'attachment'
    ];

    public function partner(){return $this->belongsTo('Partner');}

}