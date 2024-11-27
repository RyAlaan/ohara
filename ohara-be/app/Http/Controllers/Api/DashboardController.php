<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\Category;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Date;

class DashboardController extends Controller
{
    public function index()
    {
        // get data from database
        $categories = Category::with('books')->get();
        $users = User::all();
        $borrowings = Borrowing::all();
        $books = Book::latest()->take(5)->get();

        // setup date variable
        $lastMonthStart = Carbon::now()->subMonth()->startOfMonth()->toDateString();
        $lastMonthEnd = Carbon::now()->subMonth()->endOfMonth()->toDateString();

        $currMonthStart = Carbon::now()->startOfMonth()->toDateString();
        $currMonthEnd = Carbon::now()->endOfMonth()->toDateString();

        // get user percentage
        $usersLastMonth = User::whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])
            ->get();

        $usersThisMonth = User::whereBetween('created_at', [$currMonthStart, $currMonthEnd])
            ->get();

        if ($usersLastMonth->count() == 0) {
            $usersPercentage = $usersThisMonth->count() > 0 ? 100 : 0;
        } else {
            $usersPercentage = (($usersThisMonth - $usersLastMonth) / $usersLastMonth) * 100;
        }

        // get borrowing percentage
        $borrowingLastMonth = User::whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])
            ->get();

        $borrowingThisMonth = User::whereBetween('created_at', [$currMonthStart, $currMonthEnd])
            ->get();

        if ($borrowingLastMonth->count() == 0) {
            $borrowingPercentage = $borrowingThisMonth->count() > 0 ? 100 : 0;
        } else {
            $borrowingPercentage = (($borrowingThisMonth - $borrowingLastMonth) / $borrowingLastMonth) * 100;
        }

        // get categories data
        // Inisialisasi array untuk menyimpan data kategori
        $categoriesData = [];

        // Loop untuk mengisi data kategori
        foreach ($categories as $value) {
            $categoriesData[] = [
                'label' => $value->name,
                'value' => $value->books->count(),
            ];
        }

        usort($categoriesData, function ($a, $b) {
            return $b['value'] <=> $a['value'];
        });

        $topCategories = array_slice($categoriesData, 0, 4);

        $remainingCategories = array_slice($categoriesData, 4);
        $othersSum = array_sum(array_column($remainingCategories, 'value'));

        $topCategories[] = [
            'label' => 'others',
            'value' => $othersSum,
        ];
        
        $categoriesData = $topCategories;


        // get borrowing this week
        $borrowingThisWeek = Borrowing::whereBetween('created_at', [Carbon::now()->subDays(6), Carbon::now()])->get();

        $borrowingThisWeek = $borrowingThisWeek->groupBy(function ($date) {
            return Carbon::parse($date->created_at)->format('d M');
        })->map(function ($group) {
            return $group->count();
        });


        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'categories data retrieved successfully',
            'data' => [
                'categories' => [
                    'totalCategories' => $categories->count(),
                    'data' => $categoriesData,
                ],
                'users' => [
                    'usersPercentage' => $usersPercentage,
                    'totalUsers' => $users->count(),
                ],
                'borrowings' => [
                    'borrowingPercentage' => $borrowingPercentage,
                    'totalBorrowing' => $borrowings->count(),
                    'borrowingTarget' => 50,
                ],
                'borrowingThisWeek' => $borrowingThisWeek,
                'borrowingConfirmation' => $borrowings,
                'booksData' => $books,
            ]
        ]);
    }
}
