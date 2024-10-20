<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // query data
        $query = Book::query();

        // search by 
        if ($request->has('title')) {
            $title = $request->items('title');
            $query = $query->where('title', $title);
        }

        if ($request->has('ISBN')) {
            $ISBN = $request->items('ISBN');
            $query = $query->where('ISBN', $ISBN);
        }

        // relation
        $query->with('categories')->with('authors');

        // pagination
        $perPage = 20;
        if ($request->has("perPage")) {
            $perPage = $request->input("perPage");
        }

        $books = $query->paginate($request->query('pageSize', $perPage));

        // return
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'book data retrieved successfully',
            'pagination' => [
                'perPage' => $books->perPage(),
                'totalData' => $books->total(),
                'currentPage' => $books->currentPage(),
                'nextPageUrl' => $books->nextPageUrl(),
                'prevPageUrl' => $books->previousPageUrl(),
            ],
            'data' => $books->items(),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validation
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'ISBN' => 'required|unique:books',
            'releaseDate' => 'required|date',
            'stock' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:1000',
            'publisher' => 'required',
            'synopsis' => 'required',
            'cover' => 'required|images|mimes:jpg,jpeg,png|max:2048',
            'authors.name' => 'required',
            'categories.id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => $validator->messages(),
                'data' => null,
            ], 422);
        }

        // upload image
        $cover = $request->file('cover');
        $cover->storeAs('public/books', $cover->hashName());

        // create book id
        $id = Book::generateProductCode();

        // create data
        $book = Book::create([
            'id' => $id,
            'title' => $request->title,
            'ISBN' => $request->ISBN,
            'releaseDate' => $request->releaseDate,
            'stock' => $request->stock,
            'price' => $request->price,
            'publisher' => $request->publisher,
            'synopsis' => $request->synopsis,
            'cover' => $cover->hashName(),
        ]);

        // return
        return response()->json([
            'status' => true,
            'statusCode' => 201,
            'message' => 'book data created successfully',
            'data' => $book
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // check is data exists
        $book = Book::where($id)->with('authors')->with('categories')->get();

        // return 
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'book data retrieved successfully',
            'data' => $book,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // check is data exists
        $book = Book::where($id)->get();

        if (!$book) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'book data not found',
                'data' => null,
            ], 404);
        }

        // validate data
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'ISBN' => 'required|unique:books',
            'releaseDate' => 'required|date',
            'stock' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:1000',
            'publisher' => 'required',
            'synopsis' => 'required',
            'cover' => 'required|images|mimes:jpg,jpeg,png|max:2048',
        ]);

        if (!$book) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => $validator->errors(),
                'data' => null,
            ], 422);
        }

        // delete and create new image
        // check if image is uploaded
        if ($request->hasFile('cover')) {

            // upload new image
            $cover = $request->file('cover');
            $cover->storeAs('public/books', $cover->hashName());

            // delete old image
            Storage::delete('public/books/' . $book->cover);

            // update book with new image
            $book->update([
                'id' => $id,
                'title' => $request->title,
                'ISBN' => $request->ISBN,
                'releaseDate' => $request->releaseDate,
                'stock' => $request->stock,
                'price' => $request->price,
                'publisher' => $request->publisher,
                'synopsis' => $request->synopsis,
                'cover' => $cover->hashName(),
            ]);
        } else {
            // update book without image
            $book->update([
                'id' => $id,
                'title' => $request->title,
                'ISBN' => $request->ISBN,
                'releaseDate' => $request->releaseDate,
                'stock' => $request->stock,
                'price' => $request->price,
                'publisher' => $request->publisher,
                'synopsis' => $request->synopsis,
            ]);
        }

        // return
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'book data updated successfully',
            'data' => $book,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // check is data exists
        $book = Book::where($id)->get();

        // delete data
        $book->delete();

        // return
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'book data deleted successfully',
            'data' => null,
        ], 200);
    }
}
