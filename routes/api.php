<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['json.response']], function () {
    Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
    });

    // public routes
    Route::post('/login', 'Api\AuthController@login')->name('login.api');
    Route::post('/register', 'Api\AuthController@register')->name('register.api');

    // private routes
    Route::middleware('auth:api')->group(function () {
        Route::get('/logout', 'Api\AuthController@logout')->name('logout');

        //hospital
        Route::get('/hospital', 'Api\HospitalController@index')->name('hospital.index');
        Route::post('/addhospital', 'Api\HospitalController@store')->name('hospital.save');
        Route::get('/edithospital/{id}', 'Api\HospitalController@show')->name('hospital.edit');
        Route::post('/updatehospital/{id}', 'Api\HospitalController@update')->name('hospital.update');
        Route::get('/deletehospital/{id}', 'Api\HospitalController@destroy')->name('hospital.delete');

        //news
        Route::get('/news', 'Api\NewsController@index')->name('news.index');
        Route::post('/addnews', 'Api\NewsController@store')->name('news.save');
        Route::get('/editnews/{id}', 'Api\NewsController@edit')->name('news.edit');
        Route::post('/updatenews/{id}', 'Api\NewsController@update')->name('news.update');
        Route::get('/deletenews/{id}', 'Api\NewsController@destroy')->name('news.delete');

        //dashboard
        Route::get('/analytics', 'Api\AnalyticsController@index')->name('analytics.index');
    });

});