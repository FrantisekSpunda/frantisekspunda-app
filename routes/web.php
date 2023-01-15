<?php

use App\Http\Controllers\ListingController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Models\Listings;

Route::get('/login', function () {
    return Inertia::render('Auth', [
        'title' => 'Přihlášení',
        'description' => 'Přihlášení pro zeleninu'
    ]);
});

Route::get('/', [ListingController::class, 'index']);

Route::get('/listings/{listing}', [ListingController::class, 'show']);
