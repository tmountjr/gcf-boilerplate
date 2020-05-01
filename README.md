# Google Cloud Function Boilerplate
This repo is a quick way to develop Google Cloud functions locally and deploy them to GCF when ready.

# Getting started
1. Clone down the repo.
1. Navigate to `package.json` and update the following components:
    * `name`
    * `description`
    * `scripts/deploy` - change the `<function-name>` portion to reflect the name of the Google Cloud Function you chose when you created the function
    * `author`
1. Install dependencies:
    ```
    $ npm install
    ```
1. In your console, start the service:
    ```
    $ npm run start
    ```

    >**NOTE**: the service will start on `localhost:8001` by default. You can change the port in `package.json` under `scripts/start`.
1. Issue a test request:
    ```
    $ curl localhost:8001/home
    ```


# Adding middleware
Since Google Cloud Functions are glorified Express servers, you can use Express middleware with this app. One is pre-defined in `src/middleware/logger.js` and outputs the requested url, method, and requestor IP to the console. Other, more complex middleware is also possible, ie. for authentication or model validation.

# Using environment variables
Google Cloud Functions allows you to specify environment variables when you create the function. To replicate this availability, this quickstart uses the `dotenv` package to import the contents of `.env` into the environment when running the server.

To set up an environment variable, create the `.env` file in the root of the project and add the following line as an example:
  ```
  CUSTOM_ENV_VAR=foobar
  ```

When the application runs, `process.env.CUSTOM_ENV_VAR` will be available to your app.

# Setting additional routes
It's best to create separate files for each of your routes, especially if they are more complex (think MVC methodology). These files should be placed in `src/router` and imported in `src/router/index.js`. However you can add routes individually to `src/router/index.js` as well, which would make sense for smaller projects.

The boilerplate comes with three routes: `/home`, `/foo`, and `/env/:name`. The `/home` route is defined in `src/router/home.js` and the `/foo` route is defined directly in `src/router/index.js`. The `/env/:name` route is also defined and will reply with the contents of any environment variable name passed to it. Using the previous example:
  ```
  $ curl localhost:8001/env/CUSTOM_ENV_VAR
  
  foobar
  ```

# Note on the `src/bootstrap` folder
The `src/bootstrap` folder is a good place to set up things that operate differently locally than they do on the cloud, eg. logging. Two files are defined: `src/bootstrap/cloud.js` and `src/bootstrap/local.js`. Review the differences for how the `winston` logging infrastructure is set up for cloud vs. local installations.