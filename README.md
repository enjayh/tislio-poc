# Tislio

Tislio is a web application for note-taking.
- Notes can have 'Tags' assigned to them for categorization.
- Notes can also have 'Traits' assigned to them for additional metadata.

## Development environment
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