<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/login', function () {
    return Inertia::render('Auth', [
        'title' => 'Přihlášení',
        'description' => 'Přihlášení pro zeleninu'
    ]);
});
