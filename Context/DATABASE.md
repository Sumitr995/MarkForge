# Database

**Status:** Not yet set up.

`@prisma/client` and `prisma` are listed as dependencies in `backend/package.json`, but:

- No `schema.prisma` file exists
- No migrations have been created
- No Prisma client has been generated
- The `src/repositories/` directory is empty

## Setup

When ready to initialize:

```powershell
cd backend
npx prisma init
# Configure DATABASE_URL in .env
npx prisma db push
npx prisma generate
```

`DATABASE_URL` is already read from environment in `src/config/env.ts`.

## Planned

The database will eventually store:
- Uploaded document metadata
- Processing results
- User accounts and authentication
- Usage tracking
