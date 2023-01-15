<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Listings;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ListingsController extends Controller
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
                    'props' => [
                        'data' => Listings::all()
                    ]
                ]
            ]
        ]);
    }

    public function show(Listings $listings)
    {
        $listings = $listings->getAttributes();

        return Inertia::render('Home', [
            'title' => $listings['title'],
            'description' => 'Detail položky ' . $listings['title'],
            'widgets' => [
                [
                    'type' => 'form',
                    'name' => 'listing-form',
                    'label' => 'Úprava položky: ' . $listings['id'],
                    'columnSpan' => 6,
                    'children' => [
                        [
                            'type' => 'input-text',
                            'name' => 'title',
                            'props' => [
                                'type' => 'text',
                                'placeholder' => 'Nadpis',
                                'label' => 'Nadpis',
                                'required' => true
                            ]
                        ],
                        [
                            'type' => 'input-text',
                            'name' => 'company',
                            'props' => [
                                'type' => 'text',
                                'placeholder' => 'Společnost',
                                'label' => 'Společnost',
                                'required' => true
                            ]
                        ],
                        [
                            'type' => 'input-text',
                            'name' => 'location',
                            'props' => [
                                'type' => 'text',
                                'placeholder' => 'Lokace',
                                'label' => 'Lokace',
                                'required' => true
                            ]
                        ],
                        [
                            'type' => 'input-text',
                            'name' => 'website',
                            'props' => [
                                'type' => 'text',
                                'placeholder' => 'Web',
                                'label' => 'Web',
                                'required' => true
                            ]
                        ],
                        [
                            'type' => 'input-text',
                            'name' => 'email',
                            'props' => [
                                'type' => 'text',
                                'placeholder' => 'Email',
                                'label' => 'Email',
                                'required' => true
                            ]
                        ],
                        [
                            'type' => 'input-text',
                            'name' => 'tags',
                            'props' => [
                                'type' => 'text',
                                'placeholder' => 'Tagy',
                                'label' => 'Tagy',
                                'required' => true
                            ]
                        ],
                        [
                            'type' => 'input-text',
                            'name' => 'description',
                            'props' => [
                                'type' => 'text',
                                'placeholder' => 'Popis',
                                'label' => 'Popis',
                                'required' => true
                            ]
                        ],
                        [
                            'type' => 'button',
                            'name' => 'button-lol',
                            'label' => 'Odeslat',
                            'props' => [
                                'color' => 'primary',
                                'type' => 'submit'
                            ]
                        ]

                    ]
                ]
            ]

        ]);
    }


    //////////////////////////////// ? COPIED update to use
    // Store Listing Data
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'title' => 'required',
            'company' => ['required', Rule::unique('listings', 'company')],
            'location' => 'required',
            'website' => 'required',
            'email' => ['required', 'email'],
            'tags' => 'required',
            'description' => 'required'
        ]);

        if ($request->hasFile('logo')) {
            $formFields['logo'] = $request->file('logo')->store('logos', 'public');
        }

        $formFields['user_id'] = auth()->id();

        Listings::create($formFields);

        return redirect('/')->with('message', 'Listing created successfully!');
    }

    // Update Listing Data
    public function update(Request $request, Listings $listing)
    {
        // Make sure logged in user is owner
        if ($listing->user_id != auth()->id()) {
            abort(403, 'Unauthorized Action');
        }

        $formFields = $request->validate([
            'title' => 'required',
            'company' => ['required'],
            'location' => 'required',
            'website' => 'required',
            'email' => ['required', 'email'],
            'tags' => 'required',
            'description' => 'required'
        ]);

        if ($request->hasFile('logo')) {
            $formFields['logo'] = $request->file('logo')->store('logos', 'public');
        }

        $listing->update($formFields);

        return back()->with('message', 'Listing updated successfully!');
    }

    // Delete Listing
    public function destroy(Listings $listing)
    {
        // Make sure logged in user is owner
        if ($listing->user_id != auth()->id()) {
            abort(403, 'Unauthorized Action');
        }

        $listing->delete();
        return redirect('/')->with('message', 'Listing deleted successfully');
    }
}


// Common Resource Routes:
// index - Show all listings
// show - Show single listing
// create - Show form to create new listing
// edit - Show form to edit listing
// update - Update listing
// destroy - Delete listing