<a name="top"></a>
# SwissTournament v1.0.0

Magic the Gathering Tournament App

- [Auth](#auth)
  - [Logins a new user](#logins-a-new-user)
  - [Registers a new user](#registers-a-new-user)
  
- [User](#user)
  - [Gets current user information](#gets-current-user-information)
  


# Auth

## Logins a new user
[Back to top](#top)

<p>Logins a new user</p>

  POST https://magic-the-gathering-tournament.herokuapp.com/api/auth/login





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| email | String | <p>The New Users email *Required, *Unique</p>|
| username | String | <p>The New Users username *Required, *Unique</p>|
| password | String | <p>The New Users password *Required</p>|
| location | String | <p>The New Users location *Optional</p>|

### Success Response

Success-Response:

```
{
    "message": "Welcome back mtgtourney!"
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzc5OTA4MzcsImV4cCI6MTU3ODA3NzIzN30.hF8BpMjHGwbAK-5AqXQZ3aBHu0G62KoaBFLWKe5KD1s"
}
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| message | Object | <p>Welcome message and token for the new user</p>|


### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| LoginValidationFail |  | <p>Fields are required</p>|
| InvalidEmailPassword |  | |


### Error Response

Login-Fields-Required

```
{
    "message": "Email and password are required"
}
```
Invalid-Email-Password

```
{
    "message": "Invalid Credentials"
}
```
## Registers a new user
[Back to top](#top)

<p>Registers a new user</p>

  POST https://magic-the-gathering-tournament.herokuapp.com/api/auth/register





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| email | String | <p>The New Users email *Required, *Unique</p>|
| username | String | <p>The New Users username *Required, *Unique</p>|
| password | String | <p>The New Users password *Required</p>|
| location | String | <p>The New Users location *Optional</p>|

### Success Response

Success-Response:

```
{
    "message": "Welcome mtgtourney!"
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzc5OTA4MzcsImV4cCI6MTU3ODA3NzIzN30.hF8BpMjHGwbAK-5AqXQZ3aBHu0G62KoaBFLWKe5KD1s"
}
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| message | Object | <p>Welcome message and token for the new user</p>|


### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| UserNameAlreadyTaken |  | <p>Username is already taken</p>|
| RegisterValidationFail |  | <p>Fields are required</p>|


### Error Response

Username-Already-Taken

```
{
    "message": "Username is already taken"
}
```
Register-Fields-Required

```
{
    "message": "Email, username, and password are required"
}
```
# User

## Gets current user information
[Back to top](#top)

<p>Retrieves the current login user</p>

  GET https://magic-the-gathering-tournament.herokuapp.com/api/auth/user




### Success Response

Success-Response:

```
{
     "id": 9,
     "email": "Leonie_Hickle@gmail.com",
     "username": "Holly_Brown47",
     "location": null
}
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | Object | <p>Returns the user information minus password</p>|




