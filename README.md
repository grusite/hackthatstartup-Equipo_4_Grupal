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

#### user list

http://localhost:8080/user/

### return:
`{"status":true,"data":{ [users] }`

#### user by email

http://localhost:8080/user/jorge.martinoliver@gmail.com

### return:
`{"status":true,"data":{ user }`

#### create an user

http://localhost:8080/user/

### data
{ email: "email", name: "name", education:[], experience:[] }

### return:
`{"status":true,"data":{ [users] }`

#### update an user

http://localhost:8080/user/:email

### data
{ email: "email", name: "name", education:[], experience:[] }

### return:
`{"status":true,"data":{ [userUpdated] }`

#### delete an user

http://localhost:8080/user/:email

### return:
`{ done: true, message: 'Deleted correctly' }`

#### payment list

http://localhost:8080/payment/

### return:
`{"status":true,"data":{ [payments] }`

#### payment by reference

http://localhost:3000/payment/ES09283541

### return:
`{"status":true,"data":{ payment }`

#### payment by user mail

http://localhost:3000/payment/?email=jorge.martinoliver@gmail.com

### return:
`{"status":true,"data":{ [payment-list] }`

#### create an user

http://localhost:8080/payment/

### data
{ user_email: "email", price: price, reference:"reference", course:"course" }

### return:
`{"status":true,"data":{ [payments] }`

### Testing

I started doing jest testing but I couldn't finish so I tested it with Postman
