<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function login()
    {
        if (Auth::user()) return Inertia::location('/');

        return Inertia::render('Auth', [
            'title' => 'Přihlášení',
            'description' => 'Přihlášení pro zemáky',
            'widgets' => [
                [
                    'type' => 'input',
                    'columnSpan' => 12,
                    'name' => 'email',
                    'props' => [
                        'type' => 'email',
                        'placeholder' => 'Napiště svůj email',
                        'label' => 'Emailová adresa',
                        'rules' => ['required', 'string', 'email']
                    ]
                ],
                [
                    'type' => 'input',
                    'columnSpan' => 12,
                    'name' => 'password',
                    'props' => [
                        'type' => 'password',
                        'placeholder' => 'Napište své heslo',
                        'label' => 'Heslo',
                        'rules' => ['required', 'string', 'password', 'min|6']
                    ]
                ], [
                    'type' => 'button',
                    'name' => 'login',
                    'columnSpan' => 2,
                    'props' => [
                        'type' => 'button',
                        'label' => 'Přihlásit se',
                        'color' => 'primary',
                        'action' => [
                            'call' => [
                                'type' => 'update',
                                'table' => 'auth'
                            ]
                        ]
                    ]
                ], [
                    'type' => 'text',
                    'columnSpan' => 12,
                    'props' => [
                        'text' => 'Nemáte ještě účet? Registrujte se'
                    ]
                ]
            ]
        ]);
    }

    public function register()
    {
        if (Auth::user()) return Inertia::location('/');

        return Inertia::render('Auth', [
            'title' => 'Registrace',
            'description' => 'Staň se zemákem i ty',
            'widgets' => [
                [
                    'type' => 'input',
                    'columnSpan' => 12,
                    'name' => 'name',
                    'props' => [
                        'type' => 'text',
                        'placeholder' => 'Napiště uživatelké jméno',
                        'label' => 'Uživatelské jméno',
                        'rules' => ['required', 'string', 'min|3']
                    ]
                ],
                [
                    'type' => 'input',
                    'columnSpan' => 12,
                    'name' => 'email',
                    'props' => [
                        'type' => 'email',
                        'placeholder' => 'Napiště svůj email',
                        'label' => 'Emailová adresa',
                        'rules' => ['required', 'string', 'email']
                    ]
                ],
                [
                    'type' => 'input',
                    'columnSpan' => 12,
                    'name' => 'password',
                    'props' => [
                        'type' => 'password',
                        'placeholder' => 'Napište své budoucí heslo',
                        'label' => 'Heslo',
                        'rules' => ['required', 'string', 'password', 'min|6']
                    ]
                ], [
                    'type' => 'button',
                    'name' => 'register',
                    'columnSpan' => 2,
                    'props' => [
                        'type' => 'button',
                        'label' => 'Registrovat',
                        'color' => 'primary',
                        'action' => [
                            'call' => [
                                'type' => 'create',
                                'table' => 'auth'
                            ]
                        ]
                    ]
                ], [
                    'type' => 'text',
                    'columnSpan' => 12,
                    'props' => [
                        'text' => 'Máte již účet? Přihlásit se'
                    ]
                ]
            ]
        ]);
    }

    public function store(Request $request)
    {
        $formFields = $request->validate([
            'payload' => [
                'name' => ['required', 'min:3'],
                'email' => ['required', 'email', Rule::unique('users', 'email')],
                'password' => ['required', 'confirmed', 'min:6']
            ]
        ]);

        // Hash password
        $formFields['payload']['password'] = bcrypt($formFields['payload']['password']);

        // Create user
        $user = User::create($formFields['payload']);

        // Login user
        auth()->login($user);

        return response([
            'message' => 'Uživatelský účet úspěšně vytvořen',
            'redirect' => [
                'url' => '/'
            ]
        ]);
    }

    public function authenticate(Request $request)
    {
        $formFields = $request->validate([
            'payload' => [
                'email' => ['required', 'email'],
                'password' => 'required'
            ]
        ]);

        if (auth()->attempt($formFields['payload'])) {
            $request->session()->regenerate();

            return response([
                'message' => 'Úspěšně přihlášen',
                'redirect' => [
                    'url' => '/'
                ]
            ]);
        }

        return response([
            'message' => 'Špatné přihlašovací údaje',
        ]);
    }

    public function logout(Request $request)
    {
        auth()->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response([
            'message' => 'Odhlášen',
            'redirect' => [
                'url' => '/login'
            ]
        ]);
    }


    /**
     * All CRUD action on one route and function. This function 😄
     */
    public function call(Request $request, string $action)
    {
        switch ($action) {
            case 'delete': {
                    return;
                    // return self::destroy($request);
                }
            case 'create': {
                    return self::store($request);
                }
            case 'update': {
                    return self::authenticate($request);
                }
        }
    }
}
