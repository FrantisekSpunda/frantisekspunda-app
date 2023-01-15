<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Listings;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    /**
     * Show all listings
     */
    public function index()
    {
        return Inertia::render('Home', [
            'title' => 'Bobek',
            'description' => 'Toto je hlavní bobek webu bobek.cz',
            'widgets' => [
                [
                    'type' => 'table',
                    'name' => 'listings',
                    'label' => 'Položky',
                    'columnSpan' => 12,
                    'data' => Listings::all()
                ]
            ]
        ]);
    }

    public function show(Listings $listing)
    {
        return Inertia::render('Detail', [
            'title' => $listing->title,

        ]);
    }
}
