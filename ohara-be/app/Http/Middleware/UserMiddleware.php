<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Memeriksa apakah pengguna sudah login
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'You must be logged in to borrow books.');
        }

        // Memeriksa apakah pengguna memiliki role 'user'
        $user = Auth::user();
        if ($user->role !== 'user') {
            return redirect()->route('home')->with('error', 'You are not authorized to borrow books.');
        }

        // Jika lolos pengecekan, lanjutkan ke request berikutnya
        return $next($request);
    }
}
