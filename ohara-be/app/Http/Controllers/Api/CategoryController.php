<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        //  query data
        $query = Category::query();

        // search by name
        if ($request->has('name')) {
            $name = $request->query('name');
            $query = $query->where('name', $name);
        }

        if ($request->has('with')) {
            $with = $request->query('with');
            $query = $query->where($with);
        }

        $categories = $query->get();

        // return
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'categories data retrieved successfully',
            'data' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validator data
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:categories',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => $validator->errors(),
                'data' => null,
            ], 422);
        }

        //create category
        $category = Category::create([
            'name' => $request->name,
        ]);

        // return 
        return response()->json([
            'status' => true,
            'statusCode' => 201,
            'message' => 'category data created successfully',
            'data' => $category
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // find category data by id
        $category = Category::where($id)->with('books')->with('authors');

        if (!$category) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'category data not found',
                'data' => $category
            ], 404);
        }

        // return
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'category data retrieved successfully',
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // validate data
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:categories'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => $validator->errors(),
                'data' => null,
            ], 422);
        }

        // search data by id
        $category = Category::where($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'category data not found',
                'data' => null,
            ], 404);
        }

        //update data
        $category->name = $request->name;
        $category->save();

        // return
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'category data updated successfully',
            'data' => $category,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // search data by id
        $category = Category::where($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'category data not found',
                'data' => null,
            ], 404);
        }

        // delete data
        $category->delete();

        // return
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'category data deleted successfully',
            'data' => null,
        ], 200);
    }
}
