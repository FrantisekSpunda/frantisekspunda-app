<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Listings;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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