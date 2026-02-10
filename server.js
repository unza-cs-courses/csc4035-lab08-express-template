/**
 * Lab 8: Express Basics
 * CSC4035 Web Programming and Technologies
 *
 * Complete the tasks below to create a working Express server.
 * Run with: npm start
 * Test with: npm test
 */

const express = require('express');
const path = require('path');

// TODO: Import your routes (Task 6)
// const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// TASK 1: Basic Server Setup
// ============================================

// TODO: Add JSON body parsing middleware
// Hint: Use express.json()


// TODO: Add URL-encoded body parsing middleware
// Hint: Use express.urlencoded({ extended: true })


// TODO: Serve static files from the 'public' directory
// Hint: Use express.static()



// ============================================
// TASK 2: Route Handlers
// ============================================

// TODO: GET / - Return a welcome message
// Expected response: { message: "Welcome to Lab 8: Express Basics" }
app.get('/', (req, res) => {
    // YOUR CODE HERE
});

// TODO: GET /api/info - Return server information
// Expected response: { name: "Lab 8 Server", version: "1.0.0", author: "YOUR_NAME" }
app.get('/api/info', (req, res) => {
    // YOUR CODE HERE
});

// TODO: GET /api/greet/:name - Greet user by name
// Expected response: { greeting: "Hello, {name}!" }
app.get('/api/greet/:name', (req, res) => {
    // YOUR CODE HERE
    // Hint: Access the name parameter with req.params.name
});

// TODO: GET /api/search - Handle query string
// Expected: /api/search?q=term returns { query: "term", results: [] }
// If no query: { error: "Query parameter 'q' is required" }
app.get('/api/search', (req, res) => {
    // YOUR CODE HERE
    // Hint: Access query parameters with req.query.q
});

// TODO: POST /api/echo - Echo back posted JSON data
// Expected response: { received: <posted_data> }
app.post('/api/echo', (req, res) => {
    // YOUR CODE HERE
    // Hint: Access the request body with req.body
});


// ============================================
// TASK 3: Custom Middleware
// ============================================

// TODO: Create a request logger middleware
// Should log: [TIMESTAMP] METHOD /path
// Example: [2024-01-15T10:30:00.000Z] GET /api/info
function requestLogger(req, res, next) {
    // YOUR CODE HERE
    // Don't forget to call next()
}

// TODO: Apply the request logger middleware to all routes
// Hint: Use app.use(requestLogger) BEFORE your routes
// Note: Move this to the correct position in the file


// TODO: Create an API key authentication middleware
// If header 'x-api-key' equals 'csc4035-secret', allow request
// Otherwise, return 401 with { error: "Invalid API key" }
function requireApiKey(req, res, next) {
    // YOUR CODE HERE
}

// TODO: Create a protected route that requires API key
// GET /api/protected - Returns { secret: "You have access!" }
// Apply requireApiKey middleware to this route only


// ============================================
// TASK 4: Request Body Handling
// ============================================

// In-memory storage for messages
const messages = [];

// TODO: POST /api/messages - Create a new message
// Request body: { author: "name", content: "message text" }
// Validate: both author and content are required
// Success response (201): { success: true, message: { id, author, content, timestamp } }
// Error response (400): { success: false, error: "Author and content are required" }
app.post('/api/messages', (req, res) => {
    // YOUR CODE HERE
});

// TODO: GET /api/messages - Get all messages
// Response: { success: true, count: N, messages: [...] }
app.get('/api/messages', (req, res) => {
    // YOUR CODE HERE
});


// ============================================
// TASK 5: Error Handling
// ============================================

// TODO: Add a 404 handler for undefined routes
// Should return: { error: "Not found", path: "/requested/path" }
// Hint: This should be placed AFTER all other routes


// TODO: Add a global error handler
// Development: return full error details
// Production: return generic error message
// Hint: Error handlers have 4 parameters (err, req, res, next)


// ============================================
// TASK 6: Router Modules
// ============================================

// TODO: Mount the users router at /api/users
// Hint: Create routes/users.js first, then use app.use('/api/users', usersRouter)



// ============================================
// Server Start
// ============================================

// Export for testing (don't start server during tests)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log('Press Ctrl+C to stop');
    });
}

module.exports = app;
