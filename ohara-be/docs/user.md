# USER API SPEC

## CREATE USER API

Endpoint : POST /api/users/

Headers :

-   Accept : application/json
-   Content-Type : application/json
-   Authorization : bearer `<token> admin`

Request Body :

```json
{
    "name": "John Doe",
    "email": "jphndoe@mail.com",
    "password": "password",
    "role": "user",
    "gender": "male",
    "address": "Jl. Mawar No 51, Desa. Foosha, Kec. Dawn, Kab. Shiganshina, Maria",
    "phone": "085711112222"
}
```

Response Body :

```json
{
    "statusCode": 200,
    "status": true,
    "message": "user created successfully",
    "data": {
        "name": "John Doe",
        "email": "jphndoe@mail.com",
        "role": "user",
        "createdAt": "2024-09-07 06:03:00",
        "updatedAt": "2024-09-07 06:03:00",
        "userDetail": {
            "gender": "male",
            "address": "Jl. Mawar No 51, Desa. Foosha, Kec. Dawn, Kab. Shiganshina, Maria",
            "phone": "085711112222",
            "createdAt": "2024-09-07 06:03:00",
            "updatedAt": "2024-09-07 06:03:00"
        }
    }
}
```

## GET ALL USER API

Endpoint : POST /api/users/

Headers :

-   Accept : application/json
-   Content-Type : application/json
-   Authorization : bearer `<token> admin`

Response Body :

```json
{
    "statusCode": 200,
    "status": true,
    "message": "users data retrieved successfully",
    "page" : {
        "perPage" : "10",
        "totalData" : "156",
        "currentPage" : "1",
        "nextPageUrl" : "/api/users?page=2",
        "prevPageUrl" : null,
    },
    "data": [
        {
            "name": "John Doe",
            "email": "jphndoe@mail.com",
            "role": "user",
            "createdAt": "2024-09-07 06:03:00",
            "updatedAt": "2024-09-07 06:03:00",
            "userDetail": {
                "gender": "male",
                "address": "Jl. Mawar No 51, Desa. Foosha, Kec. Dawn, Kab. Shiganshina, Maria",
                "phone": "085711112222",
                "createdAt": "2024-09-07 06:03:00",
                "updatedAt": "2024-09-07 06:03:00"
            }
        },
        ...users
    ]
}
```

## UPDATE USER API

Endpoint : PATCH /api/users/

Headers :

-   Accept : application/json
-   Content-Type : application/json
-   Authorization : bearer `<token>`

Request Body :

```json
{
    "name": "John Doe",
    "email": "jphndoe@mail.com",
    "password": "password",
    "role": "user",
    "gender": "male",
    "address": "Jl. Mawar No 51, Desa. Foosha, Kec. Dawn, Kab. Shiganshina, Maria",
    "phone": "085711112222"
}
```

Response Body :

```json
{
    "statusCode": 200,
    "status": true,
    "message": "some message here",
    "data": {
        "name": "John Doe",
        "email": "jphndoe@mail.com",
        "role": "user",
        "createdAt": "2024-09-07 06:03:00",
        "updatedAt": "2024-09-07 06:03:00",
        "userDetail": {
            "gender": "male",
            "address": "Jl. Mawar No 51, Desa. Foosha, Kec. Dawn, Kab. Shiganshina, Maria",
            "phone": "085711112222",
            "createdAt": "2024-09-07 06:03:00",
            "updatedAt": "2024-09-07 06:03:00"
        }
    }
}
```

## DELETE USER API

Endpoint : GET /auth/users/:id

Headers :

-   Accept : application/json
-   Content-Type : application/json
-   Authorization : bearer `<token> admin`

```json
{
    "statusCode": 200,
    "status": true,
    "message": "data user deleted successfully",
    "data": null
}
```
