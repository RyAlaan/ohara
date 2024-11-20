<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\BorrowingController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

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
    Route::get('/{id}', [UserController::class, 'show']);
    Route::put('/{id}', [UserController::class, 'update']);
    Route::delete('/{id}', [UserController::class, 'destroy'])->middleware('auth.admin');
});


Route::prefix('/categories')->group(function () {
    Route::post('/', [CategoryController::class, 'store']);
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/{id}', [CategoryController::class, 'show']);
    Route::put('/{id}', [CategoryController::class, 'update']);
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
});

Route::prefix('/books')->group(function () {
    Route::post('/', [BookController::class, 'store']);
    Route::get('/', [BookController::class, 'index']);
    Route::get('/{id}', [BookController::class, 'show']);
    Route::put('/{id}', [BookController::class, 'update']);
    Route::delete('/{id}', [BookController::class, 'destroy']);
});

Route::prefix('/borrowings')->group(function () {
    Route::post('/', [BorrowingController::class, 'store'])->middleware('auth.user');
    Route::get('/', [BorrowingController::class, 'index'])->middleware('auth.admin');
    Route::get('/{id}', [BorrowingController::class, 'show']);
    Route::put('/{id}', [BorrowingController::class, 'update']);
    Route::delete('/{id}', [BorrowingController::class, 'destroy']);
});

// Route::prefix('/dashboard')->middleware(['auth:sanctum', 'admin'])->group(function(){
// });


Route::get('/laporan/peminjaman', [DashboardController::class, 'exportLaporan'])->name('laporan.peminjaman');
