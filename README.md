# NodeJS Express Postgres REST API

## Software Requirements

-  Node.js **10+**
-  PostgreSQL **10+**

## How to install

### Using Git (recommended)

1. Clone the project from github.

```bash
git clone https://github.com/wahyuristanto/nodejs-express-knex-postgres-api ./nodejs-express-knex-postgres-api
```

### Using manual download ZIP

1. Download repository
2. Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd nodejs-express-postgres-api
npm install
```

### Setting up environments

1. You will find a file named `.env.example` on root directory of project.
2. Create a new file by copying and pasting the file and then renaming it to just `.env`
   ```bash
   cp .env.example .env
   ```
3. The file `.env` is already ignored, so you never commit your credentials.
4. Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.

## Database migration and seed commands

-  Run `knex migrate:latest` to run database migrations.

-  Run `knex seed:run` to seed database tables with data.

-  To create a new knex database migration run `knex migrate:make create_users_table` .

-  To create a new knex database seeder run `knex seed:make 01_users`.

## Project structure

```sh
.
├── LICENSE.md
├── README.md
├── app
│   ├── controllers
│   │   ├── AddressController.js
│   │   ├── CountryController.js
│   │   └── __tests__
│   │       └── address.test.js
│   ├── helpers
│   │   ├── apiResponse.js
│   │   └── utility.js
│   ├── knex.js
│   ├── models
│   │   ├── AddressModel.js
│   │   └── CountryModel.js
│   └── routes
│       └── api.js
├── config
│   └── setup_tests.js
├── index.js
├── jest.config.js
├── knexfile.js
├── migrations
│   ├── 20200506142459_create_countries_table.js
│   └── 20200506142509_create_addresses_table.js
├── package.json
└── seeds
    ├── 01_list_countries.js
    └── 02_list_addresses.js
```

## How to run

### Running API server locally

```bash
npm run dev
```

You will know server is running by checking the output of the command `npm run dev`

```bash
App is listening on port 5000

Press CTRL + C to stop the process.
```

### Creating new models

If you need to add more models to the project just create a new file in `/app/models/` and use them in the controllers.

### Creating new routes

If you need to add more routes to the project just create a new file in `/app/routes/` and add it in `/app/routes/api.js` it will be loaded dynamically.

### Creating new controllers

If you need to add more controllers to the project just create a new file in `/app/controllers/` and use them in the routes.

## Tests

### Running Test Cases

```bash
npm test
```

You can set custom command for test at `package.json` file inside `scripts` property. You can also change timeout for each assertion with `--timeout` parameter of mocha command.

### Creating new tests

If you need to add more test cases to the project just create a new file in `/app/controllers/__test__/` and run the command.

## ESLint

### Running Eslint

```bash
npm run lint
```

You can set custom rules for eslint in `.eslintrc.json` file, Added at project root.

## License

This package is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
