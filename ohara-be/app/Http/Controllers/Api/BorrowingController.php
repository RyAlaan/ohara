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
    public function index()
    {
        //
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
    public function show(Borrowing $borrowing)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Borrowing $borrowing)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Borrowing $borrowing)
    {
        //
    }
}
