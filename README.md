# Document Management System

## Database confuguration

Default settings:
 - url=jdbc:postgresql://localhost:5432/docbase
 - username=postgres
 - password=postgres
 
You can change this in`SpringRestPG/src/main/resources/application.properties`

## Starting the application

1. Clone project.
2. Start REST server from within project directory using shell script:

       gradlew bootRun

    or batch script for Windows:

       gradlew.bat bootRun

    This will start a server locally at port 8080.

3. Install node_modules for `docs-spa` client application:

       docs-spa/npm install

    And start app:

       docs-spa/npm run start

    This will start client application locally at port 4200.
