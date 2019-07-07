<?php

use Illuminate\Http\Request;


Route::group(['namespace'=>'Auth','prefix' => 'v1',], function ($router) {
    Route::prefix('auth')->group(function () {
        Route::post('register', 'AuthController@register');
        Route::post('login', 'AuthController@login');
        Route::get('refresh', 'AuthController@refresh');
        Route::middleware('auth:api')->group(function () {
            Route::get('user', 'AuthController@me');
            Route::post('logout', 'AuthController@logout');
        });
    });
});
