# DASHBOARD API SPEC

## INDEX API

Endpoint : POST /api/auth/dashboard

Headers :

-   Accept : application/json
-   Content-Type : application/json

Response Body :

```json
{
    "statusCode": 200,
    "status": true,
    "message": "data retrieved successfully",
    "data": {
        "categories" : {
            "totalCategories" : number,
            "data" : [
                "category1" : 32,
                "category2" : 32,
                "category3" : 12,
                "category4" : 10,
                "others" : 42,
            ]
        }
    }
}
```

## LOGIN API

Endpoint : GET /api/auth/login

Headers :

-   Accept : application/json
-   Content-Type : application/json

Request Body :

```json
{
    "email": "email@example.com",
    "password": "secret"
}
```

Response Body :

```json
{
  "statusCode": 200,
  "status": true,
  "message": "user login successfully",
  "data": [
    "user" : {
        "name": "full name",
        "email": "email@example.com",
        "role": "user",
        "createdAt": "2024-09-07 06:03:00",
        "updatedAt": "2024-09-07 06:03:00"
    },
    "token" : "token string"
  ]
}
```

## AUTH ME API

Endpoint : GET /api/auth/authme

Headers :

-   Accept : application/json
-   Content-Type : application/json
-   Authorization : bearer `<token>`

Response Body :

```json
{
    "statusCode": 200,
    "status": true,
    "message": "user authenticated",
    "data": {
        "name": "full name",
        "email": "email@example.com",
        "role": "user",
        "createdAt": "2024-09-07 06:03:00",
        "updatedAt": "2024-09-07 06:03:00",
        "userDetail": {
            "gender": "male",
            "address": "address",
            "phone": "0857-2222-1111",
            "createdAt": "2024-09-07 06:03:00",
            "updatedAt": "2024-09-07 06:03:00"
        }
    }
}
```

## LOGOUT API

Endpoint : PUT /api/auth/logout

Headers :

-   Accept : application/json
-   Content-Type : application/json
-   Authorization : bearer `<token>`

Response Body :

```json
{
    "statusCode": 200,
    "status": true,
    "message": "user logout successfully",
    "data": null
}
```
