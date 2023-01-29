<?php

use App\Http\Controllers\ListingsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


// routes for login and register from
Route::get('/login', [UserController::class, 'login']);
Route::get('/register', [UserController::class, 'register']);
//actions on user
Route::post('/auth/call/{action}', [UserController::class, 'call']);


// show table with all items, edit and create form for listings
Route::get('/', [ListingsController::class, 'index']);
Route::get('/listings/{listings}', [ListingsController::class, 'show']);
Route::get('/create', [ListingsController::class, 'show']);
// actions on listings
Route::post('/listings/call/{action}', [ListingsController::class, 'call']);
