# Tislio

Tislio is a web application for note-taking.
- Notes can have 'Tags' assigned to them for categorization.
- Notes can also have 'Traits' assigned to them for additional metadata.

## Development environment
Tested using:
- Node.js 20.7.0
- Git 2.24.0 64-bit

1. Create a new project in supabase
2. Copy ```.env.local.example``` to ```.env.local```
3. Populate ```.env.local``` with values for the supabase project API settings
4. Copy ```.env.local``` to ```.env```
5. Populate ```.env``` with the connection string from the supabase project database settings
6. Run ```npm install```
7. Run ```npx prisma db push``` to create the database tables
    * If this asks you to delete your database, don't accept as this will also delete Supabase-specific configuration. Use ```npx prisma migrate deploy``` to not damage your project in Supabase.
    * If you do accept, you will need to create a new Supabase project and set the values in the environment files again.

## Docker
If you've set up the development environment above, you can create a Docker image and run it locally. Note that this will copy your environment files into the image. Use only for development.

1. Install Docker
2. Run ```docker build -t tislio-docker .``` to build the image
3. Run ```docker run -p 3000:3000 tislio-docker``` to create and run a container
4. Browse to ```http://localhost:3000```.

To make this production-ready with SSL:
1. Add the ```.env``` and ```.env.local``` files to ```.dockerignore```
2. Pass the environment variables in the two above files to the container in the command line
3. Update the hostname and port in the code to use environment variables and also provide those through the command line
4. Create an nginx reverse proxy using the SSL certificate