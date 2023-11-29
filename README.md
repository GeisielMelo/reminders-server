<div align="center">
  <img alt="Logo" src="https://github.com/GeisielMelo/reminders-client/blob/main/public/svg/logo.svg" width="80" />
</div>
<h1 align="center">
  Reminders v2 - Server
</h1>
<p align="center">
  The second version of <a href="https://reminders-client.vercel.app/" target="_blank">Reminders</a> built with the MERN tech stack and hosted on <a href="https://vercel.com/" target="_blank">Vercel</a>.
</p>
<p align="center">
</p>

![demo](https://img001.prntscr.com/file/img001/odKihvWOR2uClLl-hiC6rA.png)

## API references

### Auth
`POST` /auth/sign-in/{ email, password }
```bash
{
    "user": {
        "id": "656763109c4911dfc4d38521",
        "email": "email@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
}
```

`DELETE` /auth/sign-out
```bash
# Blacklist a token.
Response: 200 OK
```

### Users
`POST` /users/{ email, password }
```bash
{
    "email": "email@email.com",
    "password": "$2a$10$.byuvy888DhHUVkVXF6cGO9aM3NcZiX56MTItlafqUp7pzviBIrCq",
    "_id": "656763109c4911dfc4d38521",
    "createdAt": "2023-11-29T16:13:04.717Z",
    "updatedAt": "2023-11-29T16:13:04.717Z",
    "__v": 0
}
```

`GET` /users/:id
```bash
{
    "_id": "656763109c4911dfc4d38521",
    "email": "email@email.com",
    "password": "$2a$10$.byuvy888DhHUVkVXF6cGO9aM3NcZiX56MTItlafqUp7pzviBIrCq",
    "createdAt": "2023-11-29T16:13:04.717Z",
    "updatedAt": "2023-11-29T16:13:04.717Z",
    "__v": 0
}
```

### Repository
`GET` /repositories/:id
```bash
{
    "_id": "656766059c4911dfc4d3853c",
    "userId": "656763109c4911dfc4d38521",
    "notes": [
        {
            "title": "Hello world",
            "description": "Say hello!",
            "labels": [
                "Hi",
                "Hello"
            ],
            "archived": false
        }
    ],
    "labels": [
        "Hi",
        "Hello"
    ],
    "createdAt": "2023-11-29T16:25:41.947Z",
    "updatedAt": "2023-11-29T16:29:30.141Z",
    "__v": 0
}
```

`POST` /repositories/{ id }
```bash
{
    "userId": "656763109c4911dfc4d38521",
    "notes": [],
    "labels": [],
    "_id": "656766059c4911dfc4d3853c",
    "createdAt": "2023-11-29T16:25:41.947Z",
    "updatedAt": "2023-11-29T16:25:41.947Z",
    "__v": 0
}
```

`PATCH` /repositories/{ id, notes[{ title, description, labels: [foo, bar] }], labels: [foo, bar] }
```bash
Response: 200 OK
```

### Ping
`GET` /app/pings
```bash
# Index all the pings
[]
```

## Test

```bash
$ npm run test
```

## Key technologies in this project

- Mongo
- Express
- Bcrypt
- Node
- Jsonwebtoken
- Axios

## Setup

If you want to run this project on your local machine, you will have to clone both the Client and Server repositories.

```bash
    git clone https://github.com/GeisielMelo/reminders-client.git
```

```bash
    git clone https://github.com/GeisielMelo/reminders-server.git
```

```bash
# In the root folder of the Server, create a .env file and configure it based on .env.example.
# Open a terminal in your IDE, navigate to the server's root folder, and execute:
$ npm install
$ npm run dev

# In the root folder of the Client, create a .env file and configure it based on .env.example.
# Open a new terminal, navigate to the client's root folder, and perform the same steps:
$ npm install
$ npm run dev

You can access the development client build at localhost:5173.
```

## Authors

- [@GeisielMelo](https://github.com/GeisielMelo)


## License

- [MIT](https://choosealicense.com/licenses/mit/)