<?php

namespace Percursu\Models\Helpers;

use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    public $timestamps = false;
    protected $fillable = ['number'];

    public function folk(){return $this->belongsTo('Folk');}
}
