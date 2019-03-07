# Document Management System

## Database confuguration

Used H2 in-memory database

## Starting the application

1. Clone project.
2. Start REST server from within `SpringRestPG` directory using shell script:

       ./gradlew bootRun

    or batch script for Windows:

       gradlew.bat bootRun

    This will start a server locally at port 8080.

3. Install node_modules for `docs-spa` client application from within `docs-spa`:

       npm install

    And start app:

       npm run start

    This will start client application locally at port 4200.

4. Use credentials for different roles:
   
   Admin:
   
       user: neo
       password: matrix
   User:

       user: agent
       password: smith
   

## API Documentation

The documentation for API is located at http://localhost:8080/swagger-ui.html#/document-controller (when REST server is started)
