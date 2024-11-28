<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Author;
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
        if ($request->has('id')) {
            $id = $request->query('id');
            $query = $query->where('id', $id);
        }

        if ($request->has('title')) {
            $title = $request->query('title');
            $query = $query->where('title', $title);
        }

        if ($request->has('ISBN')) {
            $ISBN = $request->query('ISBN');
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
        // Validation
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'ISBN' => 'required|unique:books',
            'release_date' => 'required|date',
            'stock' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:1000',
            'publisher' => 'required',
            'synopsis' => 'required',
            'cover' => 'required|mimes:jpg,jpeg,png|max:2048',
            'authors' => 'required',
            'categories' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => $validator->messages(),
                'data' => null,
            ], 422);
        }

        // Upload image (if provided)
        $coverName = null;
        if ($request->hasFile('cover')) {
            $cover = $request->file('cover');
            $coverName = $cover->hashName();
            $cover->storeAs('public/books', $coverName);
        }

        // define category
        $categories = explode(', ', $request->categories);

        // define authors
        $authors = explode(', ', $request->authors);

        // create book data
        $book = Book::create([
            'title' => $request->title,
            'ISBN' => $request->ISBN,
            'release_date' => $request->release_date,
            'stock' => $request->stock,
            'price' => $request->price,
            'publisher' => $request->publisher,
            'synopsis' => $request->synopsis,
            'cover' => $coverName,
        ]);

        // connect book to categories with attach method
        $book->categories()->attach($categories);

        // connect book to authors
        foreach ($authors as $author) {
            $author = Author::firstOrCreate(['name' => $author]);

            $book->authors()->attach($author->id);
        }

        // load author and categories
        $book->load(['categories', 'authors']);

        $book->categories->makeHidden('pivot');
        $book->authors->makeHidden('pivot');

        // Return response
        return response()->json([
            'status' => true,
            'statusCode' => 201,
            'message' => 'Book data created successfully',
            'data' => $book
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // check is data exists
        $book = Book::where('id', $id)->with(['authors', 'categories'])->first();

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
        // validate data
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'ISBN' => 'required|unique:books',
            'release_date' => 'required|date',
            'stock' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:1000',
            'publisher' => 'required',
            'synopsis' => 'required',
            'cover' => 'required|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($validator->failed()) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => $validator->errors(),
                'data' => null,
            ], 422);
        }

        // check is data exists
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'book data not found',
                'data' => null,
            ], 404);
        }

        $coverName = null;
        // delete and create new image
        if ($request->hasFile('cover')) {
            // delete old image
            Storage::delete('public/books', $book->cover);
            
            // upload new image
            $cover = $request->file('cover');
            $coverName = $cover->hashName();
            $cover->storeAs('public/books', $coverName);
        }

       // define category
        $categories = explode(', ', $request->categories);

        // define authors
        $authors = explode(', ', $request->authors);

        // update book
        $book->update([
            'id' => $id,
            'title' => $request->title,
            'ISBN' => $request->ISBN,
            'release_date' => $request->release_date,
            'stock' => $request->stock,
            'price' => $request->price,
            'publisher' => $request->publisher,
            'synopsis' => $request->synopsis,
        ]);

        // update cover if any
        if ($coverName) {
            $book->update([
                'cover' => $coverName
            ]);
        }

        // connect book to categories
        $book->categories()->sync($categories);

        // connect book to authors
        foreach ($authors as $author) {
            $author = Author::firstOrCreate(['name' => $author]);

            $book->authors()->sync($author->id);
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
        $book = Book::find($id);

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
