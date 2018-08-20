# Mutants

## Set Up
You will need `PostgreSQL`, `NodeJs` & `NPM` to run the API. Install `Node` & `NPM` via `NVM`. The node version we are using is v8.11.3 (LTS)

Once the dependencies are installed, clone the repository and run on the root directory.
```bash
npm install
```

For setting up the database, you'll need to set up some env variables. For that, create a `.env` file on the root directory and insert this:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mutants
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

Once added the env variables, just for the first time, you will need to run on the root directory the following commands.

```bash
node_modules/.bin/sequelize db:create
npm run migrations
```

Now you are ready to go!

## Start the API

In order to start the API, just run 

```bash
npm start
```

And then the app runs on `localhost:8080`


## Test the API

To run the tests, you will need to add the following line in your `.env` file

```
NODE_API_DB_NAME_TEST=mutants-test
```

Then you need to create the test database and run the migrations

```bash
NODE_ENV=testing node_modules/.bin/sequelize db:create
NODE_ENV=testing npm run migrations
```
And finally,

```bash
npm run test
```

--------------------------------------------------------------------------------
