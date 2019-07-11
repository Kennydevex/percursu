<?php

namespace Percursu\Models\Helpers;

use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    public $timestamps = false;
    protected $fillable = ['number', 'type'];

    public function folk(){return $this->belongsTo('Folk');}
}
