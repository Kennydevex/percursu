<?php

namespace Percursu\Models\System;

use Laratrust\Models\LaratrustPermission;


class Permission extends LaratrustPermission
{
    protected $fillable = [
        'name',
        'display_name',
        'description',
    ];

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = ucwords($value);
    }

    public function setDisplay_nameAttribute($value)
    {
        $this->attributes['display_name'] = strtolower($value);
    }
}
