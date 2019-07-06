<?php

namespace Percursu\Models\Helpers;

use Illuminate\Database\Eloquent\Model;

class Folk extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'name', 
        'lastname',
        'gender', 
        'avatar', 
        'ic', 
        'nif', 
        'birthdate', 
        'category_id'
    ];

    public function getFullnameAttribute() {
        return $this->name . ' ' . $this->lastname;
    }
}
