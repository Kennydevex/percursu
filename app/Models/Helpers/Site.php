<?php

namespace Percursu\Models\Helpers;

use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    public $timestamps = false;
    protected $fillable = ['link'];

    public function folk(){return $this->belongsTo('Folk');}
}
