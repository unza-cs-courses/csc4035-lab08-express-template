# Lab 8: Express Basics

**Course:** CSC4035 Web Programming and Technologies
**Estimated Time:** 2-2.5 hours
**Weight:** 1% of final grade

---

## Purpose

This lab introduces server-side JavaScript with Node.js and the Express framework. You will create a basic web server, handle routes, serve static files, and implement middleware. These skills form the foundation for building REST APIs in the next lab.

---

## Learning Outcomes

By completing this lab, you will be able to:

1. Create a basic Express server and define routes
2. Handle different HTTP methods (GET, POST)
3. Use middleware for request processing
4. Serve static files and parse request bodies
5. Implement basic error handling

---

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Run tests:
   ```bash
   npm test
   ```

---

## Tasks

### Task 1: Basic Server Setup (15 minutes)

In `server.js`, add the following middleware:
- JSON body parsing (`express.json()`)
- URL-encoded body parsing (`express.urlencoded({ extended: true })`)
- Static file serving from the `public` directory

### Task 2: Route Handlers (25 minutes)

Implement the following routes:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Return welcome message |
| GET | `/api/info` | Return server information |
| GET | `/api/greet/:name` | Greet user by name (route parameter) |
| GET | `/api/search?q=term` | Handle query string |
| POST | `/api/echo` | Echo back posted JSON data |

### Task 3: Custom Middleware (20 minutes)

Create and apply:
1. **Request Logger** - Logs timestamp, method, and path for every request
2. **API Key Authentication** - Requires `x-api-key` header for protected routes

### Task 4: Request Body Handling (20 minutes)

Implement message endpoints:
- `POST /api/messages` - Create a new message (validate author and content)
- `GET /api/messages` - Retrieve all messages

### Task 5: Error Handling (15 minutes)

Add:
- 404 handler for undefined routes
- Global error handler with appropriate responses

### Task 6: Router Modules (20 minutes)

Complete `routes/users.js` with CRUD operations and mount it at `/api/users`.

---

## Running the Server

```bash
# Production mode
npm start

# Development mode (auto-restart on changes)
npm run dev
```

The server runs on http://localhost:3000

---

## Testing Endpoints

Use curl, Postman, or the browser:

```bash
# Get server info
curl http://localhost:3000/api/info

# Greet a user
curl http://localhost:3000/api/greet/Alice

# Search with query string
curl "http://localhost:3000/api/search?q=express"

# Echo data
curl -X POST http://localhost:3000/api/echo \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'

# Create a message
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"author": "Alice", "content": "Hello World"}'
```

---

## Grading

| Component | Weight |
|-----------|--------|
| Visible Tests | 40% |
| Hidden Tests | 30% |
| Code Quality | 20% |
| Academic Integrity | -10% if flagged |

### Visible Tests (This Lab)

The tests in `tests/visible/tests.js` run on every push. These cover basic functionality for each task.

### Hidden Tests

Additional tests run after the deadline covering:
- Edge cases (empty bodies, invalid data)
- Middleware functionality
- Error handling scenarios
- Code organization

---

## Submission

1. Complete all tasks in `server.js` and `routes/users.js`
2. Ensure `npm test` passes
3. Commit and push your changes
4. Check the Actions tab for test results

```bash
git add .
git commit -m "Complete Lab 8"
git push
```

---

## Tips

- Use `app.use()` for middleware that applies to all routes
- Use middleware as the second argument to individual routes for route-specific middleware
- Always call `next()` in middleware to pass control to the next handler
- Use `res.status(code).json(data)` to set status code and return JSON
- Route parameters are in `req.params`, query strings in `req.query`

---

## Resources

- [Express Documentation](https://expressjs.com/)
- [Express Routing](https://expressjs.com/en/guide/routing.html)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [MDN HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

## Academic Integrity

- **Allowed:** Express documentation, class materials
- **Allowed:** Discussing concepts with classmates
- **NOT Allowed:** Copying server code from others
- **NOT Allowed:** Using Express generators
- **NOT Allowed:** Using AI to generate solutions

All submissions are checked with plagiarism detection tools.
