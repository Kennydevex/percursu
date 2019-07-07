<?php

namespace Percursu\Models\Percursu;

use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    protected $fillable = ['status', 'folk_id'];

    public function formations(){return $this->hasMany('Formation');}

    public function experiences(){return $this->hasMany('Post');}

    public function skills(){return $this->hasMany('Experience');}

    public function charges(){return $this->belongsToMany('charge');}

    public function getStatusAttribute($value){if ($value) {return true;}return false;}

}
