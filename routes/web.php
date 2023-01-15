<?php

use App\Http\Controllers\ListingsController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Models\Listings;

Route::get('/login', function () {
    return Inertia::render('Auth', [
        'title' => 'Přihlášení',
        'description' => 'Přihlášení pro zeleninu'
    ]);
});

Route::get('/', [ListingsController::class, 'index']);

Route::get('/listings/{listings}', [ListingsController::class, 'show']);
