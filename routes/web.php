<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Models\Listings;

Route::get('/login', function () {
    return Inertia::render('Auth', [
        'title' => 'Přihlášení',
        'description' => 'Přihlášení pro zeleninu'
    ]);
});

Route::get('/', function () {
    return Inertia::render('Home', [
        'title' => 'Bobek',
        'description' => 'Toto je hlavní bobek webu bobek.cz',
    ]);
});

Route::get('/listing', function () {
    return response(Listings::all());
});

// Route::get('/listing/{listing}', function (Listing $listing) {
//     return response($listing);
// });
