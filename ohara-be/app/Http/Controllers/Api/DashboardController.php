<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\Category;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // get data from database
        $categories = Category::with('books')->get();
        $users = User::all();
        $borrowings = Borrowing::where('status', 'awaiting confirmation')->with(['book.categories', 'book.authors', 'user.userDetail'])->get();
        $books = Book::latest()->take(5)->get();

        // setup date variable
        $lastMonthStart = Carbon::now()->subMonth()->startOfMonth()->toDateString();
        $lastMonthEnd = Carbon::now()->subMonth()->endOfMonth()->toDateString();

        $currMonthStart = Carbon::now()->startOfMonth()->toDateString();
        $currMonthEnd = Carbon::now()->endOfMonth()->toDateString();

        // get user percentage
        $usersLastMonth = User::whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])
            ->count();

        $usersThisMonth = User::whereBetween('created_at', [$currMonthStart, $currMonthEnd])
            ->count();

        if ($usersLastMonth == 0) {
            $usersPercentage = $usersThisMonth > 0 ? 100 : 0;
        } else {
            $usersPercentage = (($usersThisMonth - $usersLastMonth) / $usersLastMonth) * 100;
        }

        // get borrowing percentage
        $borrowingLastMonth = User::whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])
            ->count();

        $borrowingThisMonth = User::whereBetween('created_at', [$currMonthStart, $currMonthEnd])
            ->count();

        if ($borrowingLastMonth == 0) {
            $borrowingPercentage = $borrowingThisMonth > 0 ? 100 : 0;
        } else {
            $borrowingPercentage = (($borrowingThisMonth - $borrowingLastMonth) / $borrowingLastMonth) * 100;
        }

        // get categories data
        $categoriesData = [];

        foreach ($categories as $key => $value) {
            $categoriesData[] = [
                'id' => $key,
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

    // public function exportLaporan(Request $request)
    // {
    //     // Ambil bulan dan tahun dari request, default ke bulan dan tahun saat ini
    //     $bulan = $request->query('bulan', date('m'));
    //     $tahun = $request->query('tahun', date('Y'));

    //     // Ambil data peminjaman dalam rentang waktu sebulan
    //     $peminjaman = Borrowing::whereMonth('start_date', $bulan)
    //         ->whereYear('start_date', $tahun)
    //         ->get();

    //     // Siapkan data untuk dikirim ke view PDF
    //     $data = [
    //         'peminjaman' => $peminjaman,
    //         'bulan' => $bulan,
    //         'tahun' => $tahun,
    //     ];

    //     // Generate PDF
    //     $pdf = Pdf::loadView('laporan.peminjaman', $data);

    //     // Return PDF sebagai response streaming
    //     return response()->streamDownload(function () use ($pdf) {
    //         echo $pdf->output();
    //     }, 'laporan_peminjaman_' . $bulan . '-' . $tahun . '.pdf');
    // }
}
