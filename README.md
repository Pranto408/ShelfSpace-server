# ShelfSpace — Backend

A RESTful e-commerce API built for the SCIC/EJP-13 backend project. Handles
authentication, product catalog management, customer reviews, and order
processing with role-based access control.

**Live API:** https://shelfspace-server-x093.onrender.com
**Repository:** https://github.com/Pranto408/ShelfSpace-server

## Tech Stack

- **Runtime:** Node.js + Express
- **Language:** TypeScript
- **Database:** PostgreSQL (hosted on Neon)
- **ORM:** Prisma
- **Auth:** JWT + bcrypt
- **Deployment:** Render

## Features

- User registration/login with hashed passwords and JWT-based sessions
- Role-based access control (`USER` / `ADMIN`)
- Full CRUD on Categories, Products, Reviews, and Orders
- Product–Category relations, User–Review–Product relations
- Transactional order creation: validates stock, snapshots prices, and
  decrements inventory atomically
- Soft deletes across all models (`isDeleted` flag — no data is ever
  permanently lost via the API)
- Consistent `{ success, message, data }` response shape on every endpoint
- Centralized error handling via a custom `AppError` class

## Data Models

`User`, `Category`, `Product`, `Review`, `Order`, `OrderItem` — with enums
for `Role`, `ProductStatus`, and `OrderStatus`.

## Getting Started Locally

```bash
git clone https://github.com/Pranto408/ShelfSpace-server.git
cd ShelfSpace-server
npm install
```

Create a `.env` file:
```env
PORT=5000
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-secret-key"
```

Run migrations and start the dev server:
```bash
npx prisma migrate dev
npm run dev
```

Server runs at `http://localhost:5000`. API routes are prefixed with
`/api/v1`.

## Project Structure

```
src/
  app.ts              # Express app, middleware, routes, error handler
  server.ts            # Entry point
  lib/                  # Prisma client, AppError, response helper
  middlewares/          # JWT auth middleware
  services/
    user/                # Auth: register, login, profile
    category/
    product/
    review/
    order/
  routes/               # Central route aggregator
prisma/
  schema.prisma         # Data models, enums, relations
```

## API Documentation

See `API_DOCUMENTATION.md` in this repo (or the project submission) for the
full endpoint reference.
