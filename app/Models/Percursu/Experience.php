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

    protected $casts = ['from' => 'datetime:Y-m', 'to' => 'datetime:Y-m',];

    // public function setDateAttribute( $value ) {
    //     $this->attributes['date'] = (new Carbon($value))->format('d/m/y');
    // }

}