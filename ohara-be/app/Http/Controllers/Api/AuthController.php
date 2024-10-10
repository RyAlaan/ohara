<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Handle register request.
     * 
     * @param Illuminate\Http\Request $request
     *  @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        //set validation
        $validator = Validator::make($request->all(), [
            'name'      => 'required',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|min:6|confirmed'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => $validator->errors(),
                'data' => null,
            ], 422);
        }

        //create user
        $user = User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => bcrypt($request->password),
            'role'      => 'user',
        ]);

        //return response JSON user is created
        if ($user) {
            return response()->json([
                'status' => true,
                'statusCode' => 201,
                'message' => 'user registered successfully',
                'data'    => [
                    'user' => $user,
                ],
            ], 201);
        }

        //return JSON process insert failed 
        return response()->json([
            'status' => false,
            'statusCode' => 409,
            'message' => 'data user unable to create, please try again next time',
            'data' => null,
        ], 409);
    }

    /**
     * Handle login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
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
                'message' => $validator->errors(),
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
                'message' => 'Email or Password is invalid',
                'data' => null,
            ], 401);
        }

        //if auth success
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'user authenticated',
            'data' => [
                'user'    => auth()->guard('api')->user(),
                'token'   => $token
            ]
        ], 200);
    }

    /**
     * Handle authenticated user request.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function authMe()
    {
        // Get the currently authenticated user
        $user = auth()->guard('api')->user();

        // If the user is authenticated, return their details
        if ($user) {
            return response()->json([
                'status' => true,
                'statusCode' => 200,
                'message' => 'user authenticated',
                'data' => [
                    'user'    => $user
                ]
            ], 200);
        }

        // If no user is authenticated, return an error
        return response()->json([
            'status' => false,
            'statusCode' => 401,
            'message' => 'User not authenticated',
            'data' => null,
        ], 401);
    }


    public function logout()
    {
        //remove token
        $removeToken = JWTAuth::invalidate(JWTAuth::getToken());

        if ($removeToken) {
            return response()->json([
                'status' => true,
                'statusCode' => 200,
                'message' => 'logout success',
                'data' => null,
            ], 200);
        }
    }
}
