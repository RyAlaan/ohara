# CATEGORY API SPEC

## CREATE CATEGORY API

Endpoint : POST /api/categories/

Headers :

-   Accept : application/json
-   Content-Type : application/json
-   Authorization : bearer `<token> admin`

Request Body :

```json
{
    "name": "psychology"
}
```

Response Body :

```json
{
    "statusCode": 200,
    "status": true,
    "message": "category data created successfully",
    "data": {
        "id": 1,
        "name": "Psychology"
    }
}
```

## GET ALL CATEGORIES API

Endpoint : POST /api/categories/

Headers :

-   Accept : application/json
-   Content-Type : application/json

Response Body :

```json
{
    "statusCode": 200,
    "status": true,
    "message": "category data retrieved successfully",
    "data": [
        {
            "id" : 1,
            "name": "John Doe",
            "books" : [
                ...books
            ]
        },
        ...categories
    ]
}
```

## GET SINGLE CATEGORY API

Endpoint : GET /api/categories/:id

Headers :

-   Accept : application/json
-   Content-Type : application/json

Response

```json
{
    "status" : true,
    "statusCode" : 200,
    "message" : "category data retrieved successfully",
    "data" : {
        "id" : 2,
        "name" : "fiction",
        "books" : [
            ...books,
        ]
    }
}
```

## UPDATE CATEGORY API

Endpoint : PATCH /api/categories/:id

Headers :

-   Accept : application/json
-   Content-Type : application/json
-   Authorization : bearer `<token> admin`

Request Body :

```json
{
    "name": "science"
}
```

Response Body :

```json
{
    "statusCode": 200,
    "status": true,
    "message": "category data updated successfully",
    "data": {
        "id": 3,
        "name": "Science"
    }
}
```

## DELETE CATEGORY API

Endpoint : GET /auth/categories/:id

Headers :

-   Accept : application/json
-   Content-Type : application/json
-   Authorization : bearer `<token> admin`

```json
{   
    "statusCode": 200,
    "status": true,
    "message": "category data deleted successfully",
    "data": null
}
```
