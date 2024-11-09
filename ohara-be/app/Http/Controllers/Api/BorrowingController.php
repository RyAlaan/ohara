<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class BorrowingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // querying
        $query = Borrowing::query();

        // filtering by status
        if ($request->has('status')) {
            $status = $request->input('status');
            $query->where('status', $status);
        }

        // filtering by categories
        if ($request->has('categories')) {
            $categories = $request->input('categories');
            $query->whereHas('book', function ($q) use ($categories) {
                $q->whereHas('categories', function ($q) use ($categories) {
                    $q->where('name', $categories);
                });
            });
        }

        // filtering by email
        if ($request->has('email')) {
            $email = $request->input('email');
            $query->whereHas('user', function ($q) use ($email) {
                $q->where('email', $email);
            });
        }

        // filtering by title
        if ($request->has('title')) {
            $title = $request->input('title');
            $query->whereHas('book', function ($q) use ($title) {
                $q->where('title', $title);
            });
        }

        // filtering by isbn
        if ($request->has('isbn')) {
            $isbn = $request->input('isbn');
            $query->whereHas('book', function ($q) use ($isbn) {
                $q->where('ISBN', $isbn);
            });
        }

        // eager loading
        $query->with(['book.categories', 'book.authors', 'user.userDetail']);

        // pagination
        $perPage = 25;
        if ($request->has("perPage")) {
            $perPage = $request->input("perPage");
        }

        $borrowing = $query->paginate($request->query('pageSize', $perPage));

        // return
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'borrowing data retrieved successfully',
            'pagination' => [
                'perPage' => $borrowing->perPage(),
                'totalData' => $borrowing->total(),
                'currentPage' => $borrowing->currentPage(),
                'nextPageUrl' => $borrowing->nextPageUrl(),
                'prevPageUrl' => $borrowing->previousPageUrl(),
            ],
            'data' => $borrowing->items(),
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validate data
        $validator = Validator::make($request->all(), [
            'book_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => 'please provide the book code',
                'data' => $validator->errors()
            ], 422);
        }

        // find book data
        $book = Book::where('id', $request->book_id);

        if (!$book) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'book not found',
                'data' => null
            ], 404);
        }

        if ($book->stock <= 0) {
            return response()->json([
                'status' => false,
                'statusCode' => 409,
                'message' => 'this book is empty',
                'data' => null
            ], 409);
        }

        $book->stock--;
        $book->save();

        // check is user has awaiting confirmation borrowing
        $user_id = auth()->guard('api')->user()->id;

        $userData = Borrowing::where('user_id', $user_id)
            ->whereIn('status', ['awaiting confirmation', 'borrowed'])
            ->get();


        if ($userData->isNotEmpty()) {
            return response()->json([
                'status' => false,
                'statusCode' => 409,
                'message' => 'please return your borrowed before borrowing again',
                'data' => null,
            ], 409);
        }

        // create data
        $borrowing_id = Str::uuid();

        $curr = Carbon::now();

        $borrowing = Borrowing::create([
            'id' => $borrowing_id,
            'user_id' => $user_id,
            'book_id' => $request->book_id,
            'status' => 'awaiting confirmation',
            'exp_date' => $curr->addDays(2),
            'start_date' => null,
            'end_date' => null,
        ]);

        // get borrowing 
        $data = Borrowing::with(['book.categories', 'book.authors', 'user.userDetail'])->find($borrowing->id);

        // return
        return response()->json([
            'status' => true,
            'statusCode' => 201,
            'message' => 'borrowing data created successfully',
            'data' => $data,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // check is data exists
        $borrowing = Borrowing::with(['book.categories', 'book.authors', 'user.userDetail'])->find($id);

        // return 
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'borrowing data retrieved successfully',
            'data' => $borrowing,
        ], 200);
    }

    /**
     * Confirm borrowing data.
     */
    public function confirmBorrowing(Request $request)
    {
        // validate data
        $validator = Validator($request->all(), [
            'borrowing_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => $validator->errors(),
                'data' => null,
            ], 422);
        }

        // check is data exists
        $borrowing = Borrowing::with(['book.categories', 'book.authors', 'user.userDetail'])->find($request->borrowing_id);

        if (!$borrowing) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'borrowing data not found',
                'data' => null
            ], 404);
        }

        $curr = Carbon::now();

        if ($borrowing->exp_date < $curr) {
            $borrowing->status = 'rejected';
            $borrowing->save();

            return response()->json([
                'status' => false,
                'statusCode' => 409,
                'message' => 'this borrowing data is expired',
                'data' => null,
            ], 409);
        }

        if ($borrowing->status != 'awaiting confirmation') {
            return response()->json([
                'status' => false,
                'statusCode' => 409,
                'message' => 'this borrowing data is already confirmed',
                'data' => null,
            ], 409);
        }

        // update borrowing data
        $borrowing->update([
            'exp_date' => null,
            'start_date' => $curr,
            'end_date' => $curr->addDay(10),
            'status' => 'borrowed',
        ]);

        // return 
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'borrowing data confirmed successfully',
            'data' => $borrowing,
        ], 200);
    }

    /**
     * Return borrowing data.
     */
    public function returnBorrowing(Request $request)
    {
        // validate data
        $validator = Validator($request->all(), [
            'borrowing_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => $validator->errors(),
                'data' => null,
            ], 422);
        }

        // check is data exists
        $borrowing = Borrowing::find($request->borrowing_id);

        if (!$borrowing) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'borrowing data not found',
                'data' => null
            ], 404);
        }

        if ($borrowing->status != 'borrowed') {
            return response()->json([
                'status' => false,
                'statusCode' => 400,
                'message' => 'this book has been returned',
                'data' => null,
            ], 400);
        }

        $borrowing->book->stock++;

        $curr = Carbon::now();

        if ($borrowing->end_date < $curr) {
            $overdueDays = $curr->diffInDays($borrowing->end_date);
            $fineAmount = $overdueDays * 500;

            $borrowing->status = 'returned';
            $borrowing->fine = $fineAmount;
            $borrowing->save();

            return response()->json([
                'status' => false,
                'statusCode' => 200,
                'message' => "This borrowing data is overdue. A fine of Rp. $fineAmount has been applied.",
                'data' => $borrowing,
            ], 200);
        }

        // update borrowing data
        $borrowing->status = 'returned';
        $borrowing->save();

        // return 
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'borrowing data returned successfully',
            'data' => $borrowing,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id)
    {
        $borrowing = Borrowing::find($id);

        if (!$borrowing) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'borrowing data not found',
                'data' => null
            ], 404);
        }

        $borrowing->delete();

        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'borrowing data deleted successfully',
        ], 200);
    }
}
