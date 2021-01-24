# Equipo_4_Grupal
Equipo 4 - Bakend

## Instructions

- MongoDB: First download Mongo in your local PC
- MongoDB: Then create a folder to store your DB inside your user directory (e.g `'/c/Users/userNAme/data/db'`)
- MongoDB: Then start a local server: `mongod --dbpath='/c/Users/userNAme/data/db'`
- To init the DB with some preset users execute `npm run installDB`
- To start the server in dev mode execute `npm run dev`
- To execute linter in all files `npm run linter`
- To start the server with the DB formated and the linter `npm run initDB-dev`

* models -> where I store the DB model
* controllers -> where I store the route controllers
* public -> all necesary to interact with front
* .env -> file with user information. The person who runs the code will need to refill the data

### API Methods

#### index

http://localhost:8080/

### return:
`{"status":true,"data":"It works"}`

#### register user [POST]

http://localhost:8080/user/register

### data
{ email: "email", name: "name", password:"password" }

### return:
`{"status":true,"data":{done: true, message: "Message sent to <email>"}`

#### login user [POST]

http://localhost:8080/user/login

### data
{ provider: "traditional|github", payload: {email:"email", password:"password"} }

### return:
`{"status":true,"data":{bearer: "<bearer>"}`

#### user list [GET]

http://localhost:8080/user/

### return:
`{"status":true,"data":{ [users] }`

#### user by email [GET]

http://localhost:8080/user/jorge.martinoliver@gmail.com

### return:
`{"status":true,"data":{ user }`

#### update an user [PUT]

http://localhost:8080/user/:email

### data
{ email: "email", name: "name", education:[], experience:[] }

### return:
`{"status":true,"data":{ [userUpdated] }`

#### delete an user [DELETE]

http://localhost:8080/user/:email

### return:
`{ done: true, message: 'Deleted correctly' }`

### Testing

I started doing jest testing but I couldn't finished so I tested it with Postman
