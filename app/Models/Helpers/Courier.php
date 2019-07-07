<?php

namespace Percursu\Models\Helpers;

use Illuminate\Database\Eloquent\Model;

class Courier extends Model
{
    public $timestamps = false;
    protected $fillable = ['email'];

    public function folk(){return $this->belongsTo('Folk');}
}
