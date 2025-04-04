import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';

// Create equivalent of __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

// Define the public directory
const publicPath = join(__dirname, 'public');

// Add CORS middleware
app.use(cors());

// Serve static files from the public directory
app.use(express.static(publicPath));
app.use(express.json());

// Add a route for the root path
app.get('/', (req, res) => {
  res.sendFile(join(publicPath, 'index.html'));
});

// Mock API endpoint
app.post('/api/save-location', (req, res) => {
  console.log('Received location:', req.body);
  res.json({ status: 'success' });
});

// Login handler
app.post('/login', (req, res) => {
  // Add authentication logic here
  res.redirect('/profile.html');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Public directory: ${publicPath}`);
  console.log(`Access sigma.html at http://localhost:${port}/sigma.html`);
});

// Add this CORS configuration to your server.js
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));