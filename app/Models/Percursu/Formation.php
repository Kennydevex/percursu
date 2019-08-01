<?php

namespace Percursu\Models\Percursu;

use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    public $timestamps = false;

    protected $dateFormat = 'y-m';
    
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

    protected $casts = ['from' => 'datetime:Y-m', 'to' => 'datetime:Y-m',];

    // public function setDateAttribute( $value ) {
    //     $this->attributes['date'] = (new Carbon($value))->format('d/m/y');
    // }
}