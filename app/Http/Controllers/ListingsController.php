<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Listings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;

class ListingsController extends Controller
{
    /**
     * Show all listings
     */
    public function index()
    {
        if (!Auth::user()) return Inertia::location('/login');

        return Inertia::render('Home', [
            'title' => 'Bobek',
            'description' => 'Toto je hlavní bobek webu bobek.cz',
            'widgets' => [
                [
                    'type' => 'button',
                    'name' => 'delete this shit',
                    'columnSpan' => 2,
                    'props' => [
                        'type' => 'button',
                        'label' => 'Nový',
                        'color' => 'primary',
                        'action' => [
                            'redirect' => [
                                'url' => '/create'
                            ]
                        ]
                    ]
                ],
                [
                    'type' => 'table',
                    'name' => 'listings',
                    'columnSpan' => 12,
                    'props' => [
                        'label' => 'Položky',
                        'data' => Listings::all()
                    ]
                ]
            ]
        ]);
    }


    /**
     * Show form for single lising or form for create listing
     */
    public function show(Listings | null $listings = null)
    {
        if (!Auth::user()) return Inertia::location('/login');

        $columns = ['title', 'company', 'location', 'website', 'email', 'description', 'tags'];
        $columns = array_map(function ($column) {
            return [
                'type' => 'input',
                'columnSpan' => 12,
                'name' => $column,
                'props' => [
                    'type' => 'text',
                    'placeholder' => 'Vložte ' . $column,
                    'label' => $column,
                    'rules' => ['required', 'string']
                ]
            ];
        }, $columns);

        if ($listings) {
            $listingsAtt = $listings->getAttributes();
            foreach ($columns as $key => $column) {
                $column['props']['value'] = $listingsAtt[$column['name']];
                // $column->props['value'] = $listingsAtt[$column->name];
                $columns[$key] = $column;
            }
        }

        return Inertia::render('Home', [
            'title' => isset($listings['title']) || 'Create',
            'description' => $listings ? 'Detail položky ' . $listings['title'] : 'Nová položka',
            'widgets' => [
                [
                    'type' => 'form',
                    'name' => 'listing-form',
                    'columnSpan' => 6,
                    'props' => [
                        'label' => $listings ? 'Úprava položky: ' . $listings['id'] : 'Vytvoření nové položky',
                    ],
                    'children' => array_merge($columns, [
                        [
                            'type' => 'button',
                            'name' => 'send-listing',
                            'props' => [
                                'type' => 'submit',
                                'label' => 'Odeslat',
                                'color' => 'primary',
                                'action' => [
                                    'call' => [
                                        'type' => $listings ? 'update' : 'create',
                                        'table' => 'listings',
                                        'query' => [$listings ? $listings->getAttribute('id') : null]
                                    ]
                                ]
                            ]
                        ],
                    ])
                ],
                [
                    'type' => 'button',
                    'name' => 'delete this shit',
                    'columnSpan' => 2,
                    'props' => [
                        'type' => 'button',
                        'label' => 'odstranit',
                        'color' => 'primary',
                        'action' => [
                            'call' => [
                                'type' => 'delete',
                                'query' => [$listings ? $listings->getAttribute('id') : null]
                            ]
                        ]
                    ]
                ]
            ]
        ]);
    }

    // Update Listing Data
    public function update(Request $request)
    {
        $formFields = $request->validate([
            'id' => 'required',
            'payload' => [
                'title' => 'required',
                'company' => ['required'],
                'location' => 'required',
                'website' => 'required',
                'email' => ['required', 'email'],
                'tags' => 'required',
                'description' => 'required'
            ]
        ]);
        $listings = Listings::all()->find($request['id']);

        $listings->update($formFields['payload']);

        return response([
            'message' => 'Listing was updated'
        ]);
    }


    // Store Listing Data
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'payload' => [
                'title' => 'required',
                'company' => ['required', Rule::unique('listings', 'company')],
                'location' => 'required',
                'website' => 'required',
                'email' => ['required', 'email'],
                'tags' => 'required',
                'description' => 'required'
            ]
        ]);

        Listings::create($formFields['payload']);

        return response([
            'message' => 'Listing was created'
        ]);
    }


    // Delete Listing
    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required'
        ]);
        $listings = Listings::all()->find($request['id']);
        $listings->delete();
        return response([
            'message' => 'Listing was deleted'
        ]);
    }


    /**
     * All CRUD action on one route and function. This function 😄
     */
    public function call(Request $request, string $action)
    {
        switch ($action) {
            case 'delete': {
                    return self::destroy($request);
                }
            case 'create': {
                    return self::store($request);
                }
            case 'update': {
                    return self::update($request);
                }
        }
    }
}


// Common Resource Routes:
// index - Show all listings
// show - Show single listing
// create - Show form to create new listing
// edit - Show form to edit listing
// update - Update listing
// destroy - Delete listing