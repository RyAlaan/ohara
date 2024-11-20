<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use App\Models\Peminjaman;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function exportLaporan(Request $request)
    {


        // Ambil bulan dan tahun dari request, default ke bulan dan tahun saat ini
        $bulan = $request->query('bulan', date('m'));
        $tahun = $request->query('tahun', date('Y'));

        // Ambil data peminjaman dalam rentang waktu sebulan
        $peminjaman = Borrowing::whereMonth('start_date', $bulan)
            ->whereYear('start_date', $tahun)
            ->get();

        // Siapkan data untuk dikirim ke view PDF
        $data = [
            'peminjaman' => $peminjaman,
            'bulan' => $bulan,
            'tahun' => $tahun,
        ];

        // Generate PDF
        $pdf = Pdf::loadView('laporan.peminjaman', $data);

        // Return PDF sebagai response streaming
        return response()->streamDownload(function() use ($pdf) {
            echo $pdf->output();
        }, 'laporan_peminjaman_' . $bulan . '-' . $tahun . '.pdf');
    }
}

