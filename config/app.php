<?php

return [

    'name' => env('APP_NAME', 'Percursu'),
    'env' => env('APP_ENV', 'production'),
    'debug' => env('APP_DEBUG', false),
    'url' => env('APP_URL', 'http://localhost'),
    'asset_url' => env('ASSET_URL', null),
    'timezone' => 'UTC',
    'locale' => 'pt',
    'fallback_locale' => 'en',
    'faker_locale' => 'en_US',
    'key' => env('APP_KEY'),
    'cipher' => 'AES-256-CBC',

    'providers' => [

        /*
         * Laravel Framework Service Providers...
         */
        Illuminate\Auth\AuthServiceProvider::class,
        Illuminate\Broadcasting\BroadcastServiceProvider::class,
        Illuminate\Bus\BusServiceProvider::class,
        Illuminate\Cache\CacheServiceProvider::class,
        Illuminate\Foundation\Providers\ConsoleSupportServiceProvider::class,
        Illuminate\Cookie\CookieServiceProvider::class,
        Illuminate\Database\DatabaseServiceProvider::class,
        Illuminate\Encryption\EncryptionServiceProvider::class,
        Illuminate\Filesystem\FilesystemServiceProvider::class,
        Illuminate\Foundation\Providers\FoundationServiceProvider::class,
        Illuminate\Hashing\HashServiceProvider::class,
        Illuminate\Mail\MailServiceProvider::class,
        Illuminate\Notifications\NotificationServiceProvider::class,
        Illuminate\Pagination\PaginationServiceProvider::class,
        Illuminate\Pipeline\PipelineServiceProvider::class,
        Illuminate\Queue\QueueServiceProvider::class,
        Illuminate\Redis\RedisServiceProvider::class,
        Illuminate\Auth\Passwords\PasswordResetServiceProvider::class,
        Illuminate\Session\SessionServiceProvider::class,
        Illuminate\Translation\TranslationServiceProvider::class,
        Illuminate\Validation\ValidationServiceProvider::class,
        Illuminate\View\ViewServiceProvider::class,

        /*
         * Package Service Providers...
         */

        /*
         * Application Service Providers...
         */
        Percursu\Providers\AppServiceProvider::class,
        Percursu\Providers\AuthServiceProvider::class,
        // Percursu\Providers\BroadcastServiceProvider::class,
        Percursu\Providers\EventServiceProvider::class,
        Percursu\Providers\RouteServiceProvider::class,

    ],

    /*
    |--------------------------------------------------------------------------
    | Class Aliases
    |--------------------------------------------------------------------------
    |
    | This array of class aliases will be registered when this application
    | is started. However, feel free to register as many as you wish as
    | the aliases are "lazy" loaded so they don't hinder performance.
    |
    */

    'aliases' => [

        'App' => Illuminate\Support\Facades\App::class,
        'Arr' => Illuminate\Support\Arr::class,
        'Artisan' => Illuminate\Support\Facades\Artisan::class,
        'Auth' => Illuminate\Support\Facades\Auth::class,
        'Blade' => Illuminate\Support\Facades\Blade::class,
        'Broadcast' => Illuminate\Support\Facades\Broadcast::class,
        'Bus' => Illuminate\Support\Facades\Bus::class,
        'Cache' => Illuminate\Support\Facades\Cache::class,
        'Config' => Illuminate\Support\Facades\Config::class,
        'Cookie' => Illuminate\Support\Facades\Cookie::class,
        'Crypt' => Illuminate\Support\Facades\Crypt::class,
        'DB' => Illuminate\Support\Facades\DB::class,
        'Eloquent' => Illuminate\Database\Eloquent\Model::class,
        'Event' => Illuminate\Support\Facades\Event::class,
        'File' => Illuminate\Support\Facades\File::class,
        'Gate' => Illuminate\Support\Facades\Gate::class,
        'Hash' => Illuminate\Support\Facades\Hash::class,
        'Lang' => Illuminate\Support\Facades\Lang::class,
        'Log' => Illuminate\Support\Facades\Log::class,
        'Mail' => Illuminate\Support\Facades\Mail::class,
        'Notification' => Illuminate\Support\Facades\Notification::class,
        'Password' => Illuminate\Support\Facades\Password::class,
        'Queue' => Illuminate\Support\Facades\Queue::class,
        'Redirect' => Illuminate\Support\Facades\Redirect::class,
        'Redis' => Illuminate\Support\Facades\Redis::class,
        'Request' => Illuminate\Support\Facades\Request::class,
        'Response' => Illuminate\Support\Facades\Response::class,
        'Route' => Illuminate\Support\Facades\Route::class,
        'Schema' => Illuminate\Support\Facades\Schema::class,
        'Session' => Illuminate\Support\Facades\Session::class,
        'Storage' => Illuminate\Support\Facades\Storage::class,
        'Str' => Illuminate\Support\Str::class,
        'URL' => Illuminate\Support\Facades\URL::class,
        'Validator' => Illuminate\Support\Facades\Validator::class,
        'View' => Illuminate\Support\Facades\View::class,

        // Personal Aliases
        // Modelos do sistema
        'User' => Percursu\Models\System\User::class,
        'Role' => Percursu\Models\System\Role::class,
        'Permission' => Percursu\Models\System\Permission::class,

        'Tag' => Percursu\Models\CMS\Tag::class,
        'Post' => Percursu\Models\CMS\Post::class,

        'Address' => Percursu\Models\Helpers\Address::class,
        'Category' => Percursu\Models\Helpers\Category::class,
        'Courier' => Percursu\Models\Helpers\Courier::class,
        'Entity' => Percursu\Models\Helpers\Entity::class,
        'Folk' => Percursu\Models\Helpers\Folk::class,
        'Location' => Percursu\Models\Helpers\Location::class,
        'Phone' => Percursu\Models\Helpers\Phone::class,
        'Site' => Percursu\Models\Helpers\Site::class,
        'Social' => Percursu\Models\Helpers\Social::class,

        'Charge' => Percursu\Models\Percursu\Charge::class,
        'Experience' => Percursu\Models\Percursu\Experience::class,
        'Formation' => Percursu\Models\Percursu\Formation::class,
        'Media' => Percursu\Models\Percursu\Media::class,
        'Partner' => Percursu\Models\Percursu\Partner::class,
        'Skill' => Percursu\Models\Percursu\Skill::class,
        'Company' => Percursu\Models\Percursu\Company::class,


        'ChargeCollection' => Percursu\Http\Resources\Percursu\ChargeCollection::class,
        'ChargeResource' => Percursu\Http\Resources\Percursu\Charge::class,
        'PartnerCollection' => Percursu\Http\Resources\Percursu\PartnerCollection::class,
        'PartnerResource' => Percursu\Http\Resources\Percursu\Partner::class,
        'UserCollection' => Percursu\Http\Resources\System\UserCollection::class,
        'UserResource' => Percursu\Http\Resources\System\User::class,

        'CategoryCollection' => Percursu\Http\Resources\Helpers\CategoryCollection::class,
        'CategoryResource' => Percursu\Http\Resources\Helpers\Category::class,

        'TagCollection' => Percursu\Http\Resources\CMS\TagCollection::class,
        'TagResource' => Percursu\Http\Resources\CMS\Tag::class,



        //Helpers
        'Common' => Percursu\Helpers\Common::class,
    ],

];
