/**
 * Lab 5 - API Server
 * Team: v6
 * Attribution: ChatGPT (https://chat.openai.com/) was used for code structure assistance.
 */

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const http = require('http');
const url = require('url');
const { executeQuery } = require('./db');
const CONFIG = require('./config');

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // GET /api/v1/sql/QUERY
    if (req.method === 'GET' && pathname.startsWith('/api/v1/sql/')) {
        const query = decodeURIComponent(pathname.replace('/api/v1/sql/', ''));
        try {
            const results = await executeQuery(query);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, data: results }));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
        return;
    }

    // POST /api/v1/sql
    if (req.method === 'POST' && pathname === '/api/v1/sql') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            try {
                const { query } = JSON.parse(body);
                const results = await executeQuery(query);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, data: results }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: error.message }));
            }
        });
        return;
    }

    res.writeHead(404);
    res.end('Not Found');
});

server.listen(CONFIG.SERVER_PORT, () => {
    console.log(`Server running on port ${CONFIG.SERVER_PORT}`);
});
