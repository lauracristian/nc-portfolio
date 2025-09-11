# AirBNC Project 2025

## Before you start

This project uses

1. pg
2. pg-format
3. dotenv
4. jest
5. jest sorted
6. supertest
7. express
8. nodemon

Run the following command in your terminal to install all the dependencies.

```sh
npm install
```

## How to get this started

1. Create the database locally, using the following script in your terminal.

```sh
npm run db-setup
```

2. Get the credentials for the database and add them to a .env file.

```sh
PGDATABASE = airbnc_test
PGPASSWORD = yourpassword

* Ensure the .env is added to a .gitignore file.
```

3. Seed the database

```sh
npm run seed
```
