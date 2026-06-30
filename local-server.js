const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Import the Vercel serverless function
const contactHandler = require('./api/contact.js');

// Mock Vercel API routing
app.post('/api/contact', async (req, res) => {
    try {
        await contactHandler(req, res);
    } catch (err) {
        console.error('API Error:', err);
        if (!res.headersSent) {
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
});

app.listen(port, () => {
    console.log(`Local development server running at http://localhost:${port}`);
    console.log(`API endpoint mapped to http://localhost:${port}/api/contact`);
});
