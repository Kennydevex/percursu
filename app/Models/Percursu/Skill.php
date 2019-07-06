<?php

namespace Percursu\Models\Percursu;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    public $timestamps = false;
    protected $fillable = ['name', 'description'];
}
