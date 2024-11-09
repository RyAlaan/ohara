<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->guard('api')->user();

        if ($user && $user->role === 'user') {
            return $next($request->merge(['user_id' => $user->id]));
        }

        return response()->json([
            'status' => false,
            'statusCode' => 401,
            'message' => "you're unauthorized",
            'data' => null
        ], 401);
    }
}
