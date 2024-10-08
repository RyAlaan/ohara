# BOOK API SPEC

## CREATE BOOK API

Endpoint : POST /api/books/

Headers :

-   Accept : application/json
-   Content-Type : multipart/form-data
-   Authorization : bearer `<token> admin`

Request Body :

```json
{
    "title": "Mirai",
    "ISBN": "97860206527810",
    "releaseDate": "15-05-2018",
    "stock": 13,
    "price": 86000,
    "publisher": "PT. Gramedia Pustaka Utama",
    "synopsis": "synopsis text",
    "cover": "file",
    "authors": "Mamoru Hosoda, John Doe",
    "categories": "1, 2, 3"
}
```

Response Body :

```json
{
    "statusCode": 200,
    "status": true,
    "message": "book data created successfully",
    "data": {
        "id": ,
        "title": "Mirai",
        "ISBN": "97860206527810",
        "releaseDate": "15-05-2018",
        "stock": 13,
        "price": 86000,
        "publisher": "PT. Gramedia Pustaka Utama",
        "synopsis": "synopsis text",
        "cover": </file>,
        "createdAt": "2024-09-07 06:03:00",
        "updatedAt": "2024-09-07 06:03:00",
        "authors" : [
            {
                "id" : 1,
                "name" : "Mamoru Hosoda",
                "createdAt": "2024-09-07 06:03:00",
                "updatedAt": "2024-09-07 06:03:00",

            }
            {
                "id" : 1,
                "name" : "Mamoru Hosoda",
                "createdAt": "2024-09-07 06:03:00",
                "updatedAt": "2024-09-07 06:03:00",
            }
        ],
        "categories": [
            {
                "id" : 1,
                "name" : "psychology",
                "createdAt": "2024-09-07 06:03:00",
                "updatedAt": "2024-09-07 06:03:00",
            }
        ]
    }
}
```

## GET ALL BOOKS API

Endpoint : POST /api/books/

Headers :

-   Accept : application/json
-   Content-Type : application/json

Response Body :

```json
{
    "statusCode": 200,
    "status": true,
    "message": "books data retrieved successfully",
    "page" : {
        "perPage" : "25",
        "totalData" : "156",
        "currentPage" : "1",
        "nextPageUrl" : "/api/users?page=2",
        "prevPageUrl" : null,
    },
    "data": [
        {
            "id": "0001020124",
            "title": "Mirai",
            "ISBN": "97860206527810",
            "releaseDate": "15-05-2018",
            "stock": 13,
            "price": 86000,
            "publisher": "PT. Gramedia Pustaka Utama",
            "synopsis": "synopsis text",
            "cover": </file>,
            "createdAt": "2024-09-07 06:03:00",
            "updatedAt": "2024-09-07 06:03:00",
            "authors" : [
                {
                    "id" : 1,
                    "name" : "Mamoru Hosoda",
                    "createdAt": "2024-09-07 06:03:00",
                    "updatedAt": "2024-09-07 06:03:00",
                }
                {
                    "id" : 1,
                    "name" : "Mamoru Hosoda",
                    "createdAt": "2024-09-07 06:03:00",
                    "updatedAt": "2024-09-07 06:03:00",
                }
            ],
            "categories": [
                {
                    "id" : 1,
                    "name" : "psychology",
                    "createdAt": "2024-09-07 06:03:00",
                    "updatedAt": "2024-09-07 06:03:00",
                }
           ]
        },
        ...books,
    ]
}
```

## GET SINGLE BOOK API

Endpoint : GET /api/books/:id

Headers :

-   Accept : application/json
-   Content-Type : application/json

Response

```json
{
    "status" : true,
    "statusCode" : 200,
    "message" : "book data retrieved successfully",
    "data" : {
        "id" : 2,
        "name" : "fiction",
        "books" : {
            "id": "0001020124",
            "title": "Mirai",
            "ISBN": "97860206527810",
            "releaseDate": "15-05-2018",
            "stock": 13,
            "price": 86000,
            "publisher": "PT. Gramedia Pustaka Utama",
            "synopsis": "synopsis text",
            "cover": </file>,
            "createdAt": "2024-09-07 06:03:00",
            "updatedAt": "2024-09-07 06:03:00",
            "authors" : [
                {
                    "id" : 1,
                    "name" : "Mamoru Hosoda",
                    "createdAt": "2024-09-07 06:03:00",
                    "updatedAt": "2024-09-07 06:03:00",
                }
                {
                    "id" : 1,
                    "name" : "Mamoru Hosoda",
                    "createdAt": "2024-09-07 06:03:00",
                    "updatedAt": "2024-09-07 06:03:00",
                }
            ],
            "categories": [
                {
                    "id" : 1,
                    "name" : "psychology",
                    "createdAt": "2024-09-07 06:03:00",
                    "updatedAt": "2024-09-07 06:03:00",
                }
           ]
        },
    }
}
```

## UPDATE BOOK API

Endpoint : PATCH /api/books/:id

Headers :

-   Accept : application/json
-   Content-Type : multipart/form-data
-   Authorization : bearer `<token> admin`

Request Body :

```json
{
    "title": "Mirai",
    "ISBN": "97860206527810",
    "releaseDate": "15-05-2018",
    "stock": 13,
    "price": 86000,
    "publisher": "PT. Gramedia Pustaka Utama",
    "synopsis": "synopsis text",
    "cover": "file",
    "authors": "Mamoru Hosoda, John Doe",
    "categories": "1, 2, 3"
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

## DELETE BOOK API

Endpoint : GET /auth/books/:id

Headers :

-   Accept : application/json
-   Content-Type : application/json
-   Authorization : bearer `<token> admin`

```json
{
    "statusCode": 200,
    "status": true,
    "message": "book data deleted successfully",
    "data": null
}
```
