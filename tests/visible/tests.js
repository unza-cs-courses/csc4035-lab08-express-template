/**
 * Lab 8: Express Basics - Visible Test Suite
 * CSC4035 Web Programming and Technologies
 *
 * These tests run on every push via GitHub Actions.
 * Additional hidden tests will run after the deadline.
 *
 * DO NOT MODIFY THIS FILE
 * Run with: npm test
 */

const http = require('http');

// Test counter
let passed = 0;
let failed = 0;
let serverProcess;

// Helper function to make HTTP requests
function makeRequest(options, body = null) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: data ? JSON.parse(data) : null
                    });
                } catch (e) {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: data
                    });
                }
            });
        });

        req.on('error', reject);
        req.setTimeout(5000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

function test(name, fn) {
    return fn()
        .then(() => {
            console.log(`✓ ${name}`);
            passed++;
        })
        .catch((e) => {
            console.log(`✗ ${name}`);
            console.log(`  Error: ${e.message}`);
            failed++;
        });
}

function assertEqual(actual, expected, message = '') {
    if (actual !== expected) {
        throw new Error(`Expected ${expected}, got ${actual}. ${message}`);
    }
}

function assertIncludes(str, substr, message = '') {
    if (!str || !str.includes(substr)) {
        throw new Error(`Expected "${str}" to include "${substr}". ${message}`);
    }
}

async function runTests() {
    console.log('\n========================================');
    console.log('Lab 8: Express Basics - Visible Tests');
    console.log('========================================\n');

    const baseOptions = {
        hostname: 'localhost',
        port: 3000,
        timeout: 5000
    };

    // Start the server
    console.log('Starting server...\n');
    const app = require('../../server');
    const server = app.listen(3000);

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        // Task 1: Basic Server Setup
        console.log('--- Task 1: Basic Server Setup ---');

        await test('GET / returns welcome message', async () => {
            const res = await makeRequest({ ...baseOptions, path: '/', method: 'GET' });
            assertEqual(res.statusCode, 200);
            assertIncludes(res.body.message, 'Welcome');
        });

        // Task 2: Route Handlers
        console.log('\n--- Task 2: Route Handlers ---');

        await test('GET /api/info returns server information', async () => {
            const res = await makeRequest({ ...baseOptions, path: '/api/info', method: 'GET' });
            assertEqual(res.statusCode, 200);
            if (!res.body.name || !res.body.version) {
                throw new Error('Missing name or version in response');
            }
        });

        await test('GET /api/greet/:name returns greeting', async () => {
            const res = await makeRequest({ ...baseOptions, path: '/api/greet/Alice', method: 'GET' });
            assertEqual(res.statusCode, 200);
            assertIncludes(res.body.greeting, 'Alice');
        });

        await test('GET /api/search with query returns results', async () => {
            const res = await makeRequest({ ...baseOptions, path: '/api/search?q=test', method: 'GET' });
            assertEqual(res.statusCode, 200);
            assertEqual(res.body.query, 'test');
        });

        await test('GET /api/search without query returns error', async () => {
            const res = await makeRequest({ ...baseOptions, path: '/api/search', method: 'GET' });
            if (!res.body.error) {
                throw new Error('Expected error message');
            }
        });

        await test('POST /api/echo returns posted data', async () => {
            const testData = { test: 'data', number: 42 };
            const res = await makeRequest({
                ...baseOptions,
                path: '/api/echo',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }, testData);
            assertEqual(res.statusCode, 200);
            assertEqual(res.body.received.test, 'data');
            assertEqual(res.body.received.number, 42);
        });

        // Task 4: Request Body Handling
        console.log('\n--- Task 4: Request Body Handling ---');

        await test('POST /api/messages creates a message', async () => {
            const message = { author: 'Test User', content: 'Hello World' };
            const res = await makeRequest({
                ...baseOptions,
                path: '/api/messages',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }, message);
            assertEqual(res.statusCode, 201);
            assertEqual(res.body.success, true);
            assertEqual(res.body.message.author, 'Test User');
        });

        await test('POST /api/messages validates required fields', async () => {
            const res = await makeRequest({
                ...baseOptions,
                path: '/api/messages',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }, { author: 'Test' });
            assertEqual(res.statusCode, 400);
            assertEqual(res.body.success, false);
        });

        await test('GET /api/messages returns all messages', async () => {
            const res = await makeRequest({ ...baseOptions, path: '/api/messages', method: 'GET' });
            assertEqual(res.statusCode, 200);
            assertEqual(res.body.success, true);
            if (!Array.isArray(res.body.messages)) {
                throw new Error('messages should be an array');
            }
        });

        // Task 5: Error Handling
        console.log('\n--- Task 5: Error Handling ---');

        await test('Undefined route returns 404', async () => {
            const res = await makeRequest({ ...baseOptions, path: '/api/undefined', method: 'GET' });
            assertEqual(res.statusCode, 404);
        });

        // Task 6: Router Modules
        console.log('\n--- Task 6: Router Modules ---');

        await test('GET /api/users returns users array', async () => {
            const res = await makeRequest({ ...baseOptions, path: '/api/users', method: 'GET' });
            assertEqual(res.statusCode, 200);
            assertEqual(res.body.success, true);
            if (!Array.isArray(res.body.users)) {
                throw new Error('users should be an array');
            }
        });

        await test('GET /api/users/:id returns specific user', async () => {
            const res = await makeRequest({ ...baseOptions, path: '/api/users/1', method: 'GET' });
            assertEqual(res.statusCode, 200);
            assertEqual(res.body.success, true);
            assertEqual(res.body.user.id, 1);
        });

        await test('GET /api/users/:id returns 404 for non-existent user', async () => {
            const res = await makeRequest({ ...baseOptions, path: '/api/users/999', method: 'GET' });
            assertEqual(res.statusCode, 404);
        });

    } finally {
        // Close the server
        server.close();
    }

    // Summary
    console.log('\n========================================');
    console.log(`Results: ${passed} passed, ${failed} failed`);
    console.log(`Score: ${Math.round((passed / (passed + failed)) * 100)}%`);
    console.log('========================================\n');

    console.log('Note: This is your visible test score (40% of final grade).');
    console.log('Additional hidden tests will run after the deadline.\n');

    if (failed > 0) {
        process.exit(1);
    }
}

runTests().catch(err => {
    console.error('Test runner error:', err);
    process.exit(1);
});
