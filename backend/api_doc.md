# iProject API Documentation

&nbsp;

## Models :

_User_

```

- email: string, required, unique
- password: string, required
- imageUrl : string
```

_Favorite_

```
- myMangaId: integer,
- title: string,
- pictUrl: string,
- score: integer,
- UserId: integer,
```

&nbsp;

## Endpoints :

List of available users endpoints :

-   `POST /users/register`
-   `POST /users/login`
-   `POST /users/google-login`
-   `GET /users`
-   `PATCH /users/:id/imageUrl`

List of available mangas endpoints :

-   `GET /mangas`
-   `GET /mangas/:id`
-   `GET /favorite`
-   `POST /favorite/:mangaId`
-   `DELETE /favorite/:favId`

&nbsp;

## 1. POST /users/register

Request:

-   body:

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "message": "{email} has been created"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Full Name is required"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "email must be unique"
}
OR
{
  "message": "password is required"
}
```

&nbsp;

## 2. POST /login

Request:

-   body:

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email or Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid email or password"
}
```

&nbsp;

## 3. POST /users/google-login

Request:

-   headers:

```json
{
    "google_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string"
}
```

&nbsp;

## 4. GET /users

Request:

-   headers:

```json
{
    "authorization": "Bearer <token>"
}
```

-   params:

```json
{
    "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "email": "padila@gmail.com"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 5. PATCH /users/:id/imageUrl

Request:

-   headers:

```json
{
    "authorization": "Bearer <token>"
}
```

-   file:

```json
{
    "imgUrl": "<image/*>"
}
```

_Response (201 - Created)_

```json
{
    "message": "Image {email} edited has been updated "
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
```

&nbsp;

## 6. GET /mangas

Request:

-   headers:

```json
{
    "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
    {
        "title": "Solo Leveling",
        "picture_url": "https://cdn.myanimelist.net/images/manga/3/222295.jpg",
        "myanimelist_url": "https://myanimelist.net/manga/121496/Solo_Leveling",
        "myanimelist_id": 121496,
        "rank": 1,
        "score": 8.67,
        "type": "Manhwa (? vols)",
        "aired_on": "Mar 2018 - May 2023",
        "members": 495461
    },
    ...
]
```

&nbsp;

## 7. GET /mangas/:id

Request:

-   headers:

```json
{
    "authorization": "Bearer <token>"
}
```

-   params:

```json
{
    "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "title_ov": "Wind Breaker",
    "title_en": "",
    "synopsis": "Burdened with expectations since childhood, second-year high schooler Jo \"Jay\" Ja Hyun feels obligated to aim for the top through his studies. Despite obtaining the title of student president at Taeyang High, he continues to study diligently, giving him little time to befriend others. However, possessing an exceptional talent for biking with a technique that astonishes other experienced bikers, there is more to him than meets the eye.\n\r\nOne afternoon, while Jay is skidding his bike at high speed, he catches the interest of his classmate, Yoon Min Woo. Amazed by his unparalleled biking skill, Min Woo is quick to recruit him to his biking crew, but Jay coldly rejects the offer. With a determination to show Jay the fun of riding with others, Min Woo proposes a simple deal—to race against a member of his team, promising to leave him alone if he wins.\n\r\n[Written by MAL Rewrite]",
    "alternative_titles": {
        "japanese": "윈드 브레이커",
        "english": "Wind Breaker"
    },
    "information": {
        "type": [
            {
                "name": "Manhwa",
                "url": "https://myanimelist.net/topmanga.php?type=manhwa"
            }
        ],
        "volumes": "Unknown",
        "chapters": "Unknown",
        "status": "Publishing",
        "published": "Dec  15, 2013 to ?",
        "genres": [
            {
                "name": "Action",
                "url": "https://myanimelist.net/manga/genre/1/Action"
            },
            {
                "name": "Drama",
                "url": "https://myanimelist.net/manga/genre/8/Drama"
            },
            {
                "name": "Sports",
                "url": "https://myanimelist.net/manga/genre/30/Sports"
            }
        ],
        "serialization": [
            {
                "name": "Naver Webtoon",
                "url": "https://myanimelist.net/manga/magazine/673/Naver_Webtoon"
            }
        ],
        "authors": [
            {
                "name": "Jo, Yongseok",
                "url": "https://myanimelist.net/people/43112/Yongseok_Jo"
            }
        ]
    },
    "statistics": {
        "score": 8.58,
        "ranked": 103,
        "popularity": 313,
        "members": 50709,
        "favorites": 3108
    },
    "characters": [
        {
            "name": "Jo, Ja-Hyun",
            "picture_url": "https://cdn.myanimelist.net/images/characters/10/469554.jpg",
            "myanimelist_url": "https://myanimelist.net/character/148625/Ja-Hyun_Jo"
        },
        {
            "name": "Hong, Yoo Bin",
            "picture_url": "https://cdn.myanimelist.net/images/characters/7/468390.jpg",
            "myanimelist_url": "https://myanimelist.net/character/148141/Yoo_Bin_Hong"
        },
        {
            "name": "Scott, Shelly",
            "picture_url": "https://cdn.myanimelist.net/images/characters/14/441231.jpg",
            "myanimelist_url": "https://myanimelist.net/character/175815/Shelly_Scott"
        },
        {
            "name": "Kang, Dom",
            "picture_url": "https://cdn.myanimelist.net/images/characters/11/457168.jpg",
            "myanimelist_url": "https://myanimelist.net/character/149689/Dom__Kang"
        },
        {
            "name": "Yoon, Minu",
            "picture_url": "https://cdn.myanimelist.net/images/characters/3/457167.jpg",
            "myanimelist_url": "https://myanimelist.net/character/149686/Minu__Yoon"
        },
        {
            "name": "Austin, Noah",
            "picture_url": "https://cdn.myanimelist.net/images/characters/4/468346.jpg",
            "myanimelist_url": "https://myanimelist.net/character/207644/Noah_Austin"
        },
        {
            "name": "Knight, Owen",
            "picture_url": "https://cdn.myanimelist.net/images/characters/14/460254.jpg",
            "myanimelist_url": "https://myanimelist.net/character/198266/Owen_Knight"
        },
        {
            "name": "Joker",
            "picture_url": "https://cdn.myanimelist.net/images/characters/13/475420.jpg",
            "myanimelist_url": "https://myanimelist.net/character/207657/Joker"
        },
        {
            "name": "Lee, Yumi",
            "picture_url": "https://cdn.myanimelist.net/images/characters/8/468397.jpg",
            "myanimelist_url": "https://myanimelist.net/character/207659/Yumi_Lee"
        },
        {
            "name": "Kim, Mi Young",
            "picture_url": "https://cdn.myanimelist.net/images/characters/7/469555.jpg",
            "myanimelist_url": "https://myanimelist.net/character/149685/Mi_Young_Kim"
        }
    ],
    "picture_url": "https://cdn.myanimelist.net/images/manga/1/189563.jpg"
}
```

_Response (404 - Not Found)_

```json
{
    "data": "no manga found with id {id}"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "You are not authorized"
}
```

&nbsp;

## 8. GET /mangas/favorite

Request:

-   headers:

```json
{
    "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
 {
        "id": 2,
        "myMangaId": 147272,
        "title": "The Greatest Estate Developer",
        "pictUrl": "https://cdn.myanimelist.net/images/manga/1/290131.jpg",
        "score": 8.48,
        "UserId": 1,
        "createdAt": "2024-04-17T06:42:17.638Z",
        "updatedAt": "2024-04-17T06:42:17.638Z"
    },
    ...
]
```

&nbsp;

## 9. POST /mangas/favorite/:mangaId

Request:

-   headers:

```json
{
    "authorization": "Bearer <token>"
}
```

-   params:

```json
{
    "mangaId": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
    "message": "manga {manga} added to favorite",
    "fav": {
        "id": 3,
        "myMangaId": 145539,
        "title": "Seasons of Blossom",
        "pictUrl": "https://cdn.myanimelist.net/images/manga/3/257932.jpg",
        "score": 8.44,
        "UserId": 1,
        "updatedAt": "2024-04-17T07:18:14.763Z",
        "createdAt": "2024-04-17T07:18:14.763Z"
    }
}
```

&nbsp;

## 10. DELETE /mangas/favorite/:favId

Request:

-   headers:

```json
{
    "authorization": "Bearer <token>"
}
```

-   params:

```json
{
    "favId": "integer"
}
```

_Response (200 - OK)_

```json
{
    "message": "{manga title} has been deleted "
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "`You're not Unauthorized`"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
    "message": "Internal server error"
}
```
