# study-track-backend
A course management application for home schoolers.

This is the code for the backend of the application.

## 1. Getting started

### 1.1 Requirements
- NodeJS version 22.11.0

### 1.2 Project configuration

Start by cloning this project on your machine.

Install all the dependencies

```sh
cd ./study-track-backend
npm install
```

After installing dependencies, create a .env file in the root.
Reference .env.template for all variables required.

### 1.3 Running Locally

To run the app locally, use: 
```sh
npm start
```

### 1.4 Environments

Local development and deployed to the dev environment, use __study-tracker-dev__ as the MongoDB project.

### 1.5 Health Check

You can conduct a quick health check by heading to `http://localhost:4000/api/health` in the browser.

## 2. Logging

### 2.1 Adding a Logger

This application uses winston as the backend logger. To implement logging, require a __parentLogger__ and then set __logger__ as a child, referencing a specific property called location. Make sure to set the location to the name of the file where the logger is being called. See the example below, called from the fictional __doSomethingService.js__:

```sh
const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'doSomethingService' });
```

### 2.2 Logger Ouput

Currently, the logger is set to output to the console.

## 3. Authentication

### 3.1 Login

Logging in as a teacher will retrieve a jwt in the response body.

Response from login call:

```sh
{ token: token, user: { id: user._id, name: user.name, role: user.role }
```

The token must be passed in the header for subsequent requests on protected routes:

```sh
{Authorization: "Bearer token"} 
```