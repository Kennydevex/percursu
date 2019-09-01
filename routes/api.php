<?php

use Illuminate\Http\Request;

Route::prefix('v1')->group(function () {
    Route::group(['namespace' => 'Auth', 'prefix' => 'auth',], function ($router) {
        Route::post('register', 'AuthController@register');
        Route::post('login', 'AuthController@login');
        Route::get('refresh', 'AuthController@refresh');
        Route::middleware('auth:api')->group(function () {
            Route::get('user', 'AuthController@me');
            Route::post('logout', 'AuthController@logout');
        });
    });

    Route::group(['namespace' => 'System', 'prefix' => 'system', 'middleware' => ['role:write222r']], function ($router) {
        Route::resource('users', 'UserController');
        Route::get('changeUserActivation/{id}', 'UserController@changeUserActivation');
        Route::resource('permissions', 'PermissionController');
        Route::resource('roles', 'RoleController');
    });

    Route::group(['namespace' => 'Percursu', 'prefix' => 'percursu',], function ($router) {
        Route::resource('partners', 'PartnerController');
        Route::get('changePartnerActivation/{id}', 'PartnerController@changePartnerActivation');
        Route::get('activedPartners', 'PartnerController@activedPartners');
        Route::resource('charges', 'ChargeController');
        Route::resource('experiences', 'ExperienceController');
        Route::resource('formations', 'FormationController');
        Route::resource('medias', 'MediaController');
        Route::resource('skills', 'SkillController');
        Route::resource('companies', 'CompanyController');
    });

    Route::group(['namespace' => 'Helpers', 'prefix' => 'helpers',], function ($router) {
        Route::resource('addresses', 'AddressController');
        Route::resource('avatars', 'AvatarController');
        Route::resource('categories', 'CategoryController');
        Route::resource('couriers', 'CourierController');
        Route::resource('entities', 'EntityController');
        Route::resource('folks', 'FolkController');
        Route::resource('locations', 'LocationController');
        Route::resource('phones', 'PhoneController');
        Route::resource('sites', 'SiteController');
        Route::resource('socials', 'SocialController');
    });

    Route::group(['namespace' => 'CMS', 'prefix' => 'cms',], function ($router) {
        Route::resource('posts', 'PostController');
        Route::resource('tags', 'TagController');
    });

    Route::group(['namespace' => 'Helpers', 'prefix' => 'helpers',], function ($router) {
        Route::resource('categories', 'CategoryController');
        Route::resource('entities', 'EntityController');
        Route::resource('folks', 'FolkController');
    });
});
