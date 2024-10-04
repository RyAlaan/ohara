<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Handle register request.
     */
    public function Register(Request $request)
    {
        // validate data
        $validator = Validator::make($request->all(), [
            'name'    => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => $validator->errors()->first(),
                'data' => null,
            ], 422);
        }

        // create data user
        $user = User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => bcrypt($request->password),
            'role' => 'user',
        ]);

        if ($user) {
            return response()->json([
                'status' => true,
                'statusCode' => 201,
                'message' => 'user registered successfully',
                'data' => [
                    'user' => $user
                ],
            ], 201);
        }

        // return error
        return response()->json([
            'status' => false,
            'statusCode' => 409,
            'message' => 'registered user failed',
            'data' => null,
        ], 409);
    }

    public function Login(Request $request)
    {
        //set validation
        $validator = Validator::make($request->all(), [
            'email'     => 'required',
            'password'  => 'required'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => $validator->errors()->first(),
                'data' => null,
            ], 422);
        }

        //get credentials from request
        $credentials = $request->only('email', 'password');

        //if auth failed
        if (!$token = auth()->guard('api')->attempt($credentials)) {
            return response()->json([
                'status' => false,
                'statusCode' => 401,
                'message' => "you're not unauthorized",
                'data' => null,
            ], 401);
        }

        // return
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => "login success",
            'data' => [
                'user' => auth()->guard('api')->user(),
                'token' => $token
            ],
        ], 200);
    }

    public function Me()
    {
        $user = auth()->guard('api')->user();

        if (!$user) {
            return response()->json([
                'status' => false,
                'statusCode' => 401,
                'message' => "Unauthenticated",
                'data' => null,
            ], 401);
        }

        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => "You're authenticated",
            'data' => $user,
        ], 200);
    }

    public function Logout()
    {
        $removeToken = JWTAuth::invalidate(JWTAuth::getToken());

        if ($removeToken) {
            //return response JSON
            return response()->json([
                'status' => true,
                'statusCode' => 200,
                'message' => 'Logout success',
                'data' => null,
            ], 200);
        }
    }
}
