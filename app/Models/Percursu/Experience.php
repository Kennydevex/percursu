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

    public function partner(){return $this->belongsTo('Partner');}

    public function getStatusAttribute($value){if ($value) {return true;}return false;}

}