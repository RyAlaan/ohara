<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/authme', [AuthController::class, 'authMe']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::prefix('/users')->group(function () {
    Route::post('/', [UserController::class, 'store'])->middleware('auth.admin');
    Route::get('/', [UserController::class, 'index'])->middleware('auth.admin');
    Route::get('/{id}', [UserController::class, 'show'])->middleware('auth.admin');
    Route::put('/{id}', [UserController::class, 'update']);
    Route::delete('/{id}', [UserController::class, 'delete'])->middleware('auth.admin');
});
