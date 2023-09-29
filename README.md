# Tislio

## Development environment
- Node.js 20.7.0
- Git 2.24.0 64-bit

1. Create a new project in supabase
2. Copy ```.env.local.example``` to ```.env.local```
3. Populate ```.env.local``` with values for the supabase project API settings
4. Copy ```.env.local``` to ```.env```
5. Populate ```.env``` with the connection string from the supabase project database settings
6. Run ```npm install```
7. Run ```npx prisma migrate dev``` to create the database tables