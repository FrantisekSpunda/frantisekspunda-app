<?php

use App\Http\Controllers\ListingsController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/login', function () {
    return Inertia::render('Auth', [
        'title' => 'Přihlášení',
        'description' => 'Přihlášení pro zeleninu'
    ]);
});
Route::get('/', [ListingsController::class, 'index']);

// show edit form
Route::get('/listings/{listings}', [ListingsController::class, 'show']);

Route::get('/create', [ListingsController::class, 'show']);

Route::get('/delete', [ListingsController::class, 'delete']);

Route::post('/listings/call/{action}', [ListingsController::class, 'call']);
