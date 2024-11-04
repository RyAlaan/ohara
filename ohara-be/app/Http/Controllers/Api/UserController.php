<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * @param Illuminate\Http\Request
     */
    public function index(Request $request)
    {
        // querying
        $query = User::query();

        // filtering by name
        if ($request->has('name')) {
            $name = $request->input('name');
            $query->where('name', $name);
        }

        // filtering by email
        if ($request->has('email')) {
            $email = $request->input('email');
            $query->where('email', $email);
        }

        // filtering by gender
        if ($request->has('gender')) {
            $gender = $request->input('gender');
            $query->whereHas('userDetail', function ($q) use ($gender) {
                $q->where('gender', $gender);
            });
        }

        // eager loading userDetail before pagination
        $query->with('userDetail');

        // pagination
        $perPage = 10;
        if ($request->has("perPage")) {
            $perPage = $request->input("perPage");
        }

        $users = $query->paginate($request->query('pageSize', $perPage));

        // dd($users);

        // return
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'data retrieved successfully',
            'pagination' => [
                'perPage' => $users->perPage(),
                'totalData' => $users->total(),
                'currentPage' => $users->currentPage(),
                'nextPageUrl' => $users->nextPageUrl(),
                'prevPageUrl' => $users->previousPageUrl(),
            ],
            'data' => $users->items(),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param Illuminate\Http\Request
     * @return Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // validate data
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:6|',
            'email' =>  'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'nullable',
            'profile' => 'required|mimes:jpg,jpeg,png|max:2048',
            'phone' => 'required|unique:user_details',
            'address' => 'required',
            'gender' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => [$validator->errors()],
                'data' => null,
            ], 422);
        }

        // upload profile
        $profileName = null;
        if ($request->hasFile('profile')) {
            $profile = $request->file('profile');
            $profileName = $profile->hashName();
            $profile->storeAs('public/users', $profileName);
        }

        // create data
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role ? $request->role : 'user',
        ]);

        UserDetail::create([
            'user_id' => $user->id,
            'profile' =>
            $request->file('profile')  ?
                '/storage/users/' . $profile->hashName()
                : "",
            'gender' => $request->gender,
            'address' => $request->address,
            'phone' => $request->phone,
        ]);

        $user->load('userDetail')->get();

        // return
        return response()->json([
            'status' => true,
            'statusCode' => 201,
            'message' => 'data created successfully',
            'data' => $user,
        ], 201);
    }

    /**
     * Display the specified resource.
     * 
     * @param id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // get data
        $user = User::where('id', $id)->with('userDetail')->first();

        if (!$user) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'data user not found',
                'data' => null,
            ], 404);
        }

        // return data
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'data user retrieved successfully',
            'data' => $user,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id)
    {
        // validate data
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:6|',
            'role' => 'required',
            'phone' => 'required|unique:user_details',
            'address' => 'required',
            'gender' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => $validator->messages(),
                'data' => null,
            ], 422);
        }

        // search user
        $user = User::with('userDetail')->find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'data not found',
                'data' => null,
            ], 404);
        }

        // update user
        $user->update([
            'name' => $request->name,
            'role' => $request->role,
        ]);

        // formatting phone number
        $phone =
            substr($request->phone, 0, 4) . '-' . substr($request->phone, 4, 4) . '-' . substr($request->phone, 8);

        // update user detail
        if ($request->hasFile('profile')) {

            // upload new image
            $profile = $request->file('profile');
            $profile->storeAs('public/users', $profile->hashName());

            // delete old image
            Storage::delete('public/users/' . $user->userDetail->profile);

            // update book with new image
            $user->userDetail->update([
                'gender' => $request->gender,
                'profile' => '/storage/users/' . $profile,
                'phone' => $phone,
                'address' => $request->address,
            ]);
        } else {
            // update book without image
            $user->userDetail->update([
                'gender' => $request->gender,
                'phone' => $phone,
                'address' => $request->address,
            ]);
        }

        // return 
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'data updated successfully',
            'data' => $user,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // get user by id
        $user = User::where('id', $id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'data user not found',
                'data' => null,
            ], 404);
        }

        // delete data
        $user->delete();

        // return 
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'data deleted successfully',
            'data' => null,
        ], 200);
    }
}
