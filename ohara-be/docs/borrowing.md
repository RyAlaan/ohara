# BORROWING API DOC

### Borrowing

endpoint : POST /api/borrowing

Headers :

-   Accept : application/json
-   Content-Type : application/json
-   Authorization : bearer `<token> user`

Request Body :

```json
{
    "book" : id buku
}
```

response body :

```json
{
    "statusCode": 200,
    "status": true,
    "message": "borrowing data has created successfully",
    "data": {
        "id": 1234771342142134,
        "status" : "waiting confirmation",
        "start_date" : 2024-10-29 07:59:40,
        "end_date" : 2024-10-29 07:59:40, // 10 days
        "book" : {
            ...book data
        },
        "user" : {
            ...user data
        }
    }
}
```
