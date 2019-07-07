<?php

namespace Percursu\Models\Helpers;

use Illuminate\Database\Eloquent\Model;

class Social extends Model
{
    public $timestamps = false;
    protected $fillable = ['name', 'link'];

    public function folk(){return $this->belongsTo('Folk');}
}
