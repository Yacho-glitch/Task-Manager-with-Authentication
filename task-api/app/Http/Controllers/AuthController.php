<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller {

    // Register a new user
    public function register(Request $request) {
        // $request->validate([
        //     'name' => 'required|string',
        //     'email' => 'required|string|unique:users',
        //     'password' => 'required|string|confirmed'
        // ]);

        // $user = User::create([
        //     'name' => $request->name,
        //     'email' => $request->email,
        //     'password' => Hash::make($request->password)
        // ]);

        // return response()->json(['user' => $user], 201);

        // #######################################################

        $request->headers->set('Accept', 'application/json');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password'])
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ], 201);

        // ##################################################

        // return response()->json([
        //     'raw' => $request->getContent(),
        //     'parsed' => $request->all()
        // ]);
    }

    // Login existing user
    public function login(Request $request) {

        $request->headers->set('Accept', 'application/json');

        $validated = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ], 200);

    }
}
