# Library Management System

This project is created using React, ASP .NET 6 Core Web API and SQL server database.

The React App is created using Vite bundler because it is lightweight, it updates the DOM faster and doesn't comes with dependecies related to testing and performance by default.

To start the frontend development server navigate to the frontend directory and use the following commands: 

```bash
npm i

npm run dev
```

Server is running at https://localhost:7204 and frontend is running at http://localhost:5173.

## Getting started with project

I have added some users and books data in the Seed.cs file. Therefore, after migration, in order to seed sample data to the database please execute below commands.

For running migrations, open nuget package manager console and run the following commands.

1. Add Migration 

```bash
Add-Migration "Initial Migration"
```
2. Update Database

```bash
Update-Database
```
Now open the terminal go to the project directory where Seed.cs file is present. Then run the following command to seed data.

```bash
dotnet run seeddata
```

## Assumptions

1. Initially each user has 5 tokens available.

2. Whenever a new book is added by a user on the portal then initially the rating of the book will be zero.

3. One user can borrow the same book any number of time.

4. In the application, the word token is replaced by coins to not to confuse with the JWT token for authentication and authorization.

## Features

### `Authentication and Authorization`

I have used JWT tokens to make the backend APIs secure and also made frontend routes secure.

### `React Redux toolkit`

In frontend, I used Redux to create centralized data by creating a 'UserAuth' slice where I stored the JWT token, email, username and coins of logged in person received from the server and managed the state efficiently accross the components. The value of centralized data is provided to the App component so that components whose parent is App.js can utilize the centralized store.

### `React Icons`

Library used to fetch various types of icons and use it in our frontend application.

### `React hot toast`

Library used to display toast after performing any operations.

### `React Router`

Library used to create multiple routes for web app.

