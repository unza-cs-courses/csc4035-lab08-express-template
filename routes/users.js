/**
 * Lab 8: Users Router Module
 * CSC4035 Web Programming and Technologies
 *
 * Complete this router module with user-related routes.
 * Mount this router in server.js at /api/users
 */

const express = require('express');
const router = express.Router();

// In-memory user storage
const users = [
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin' },
    { id: 2, username: 'student', email: 'student@example.com', role: 'student' }
];

let nextId = 3;

// TODO: GET / - Get all users
// Response: { success: true, users: [...] }
router.get('/', (req, res) => {
    // YOUR CODE HERE
});

// TODO: GET /:id - Get user by ID
// Success response: { success: true, user: {...} }
// Not found response (404): { success: false, error: "User not found" }
router.get('/:id', (req, res) => {
    // YOUR CODE HERE
    // Hint: Use parseInt(req.params.id) to convert string to number
    // Hint: Use users.find() to search for the user
});

// TODO: POST / - Create a new user
// Request body: { username, email, role }
// Validate: username and email are required
// Success response (201): { success: true, user: {...} }
// Error response (400): { success: false, error: "Username and email are required" }
router.post('/', (req, res) => {
    // YOUR CODE HERE
});

// TODO: PUT /:id - Update a user
// Request body: { username?, email?, role? }
// Success response: { success: true, user: {...} }
// Not found response (404): { success: false, error: "User not found" }
router.put('/:id', (req, res) => {
    // YOUR CODE HERE
});

// TODO: DELETE /:id - Delete a user
// Success response (204): No content
// Not found response (404): { success: false, error: "User not found" }
router.delete('/:id', (req, res) => {
    // YOUR CODE HERE
});

module.exports = router;
