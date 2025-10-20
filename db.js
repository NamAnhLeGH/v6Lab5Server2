/**
 * Database connection and query execution
 * Team: v6
 */

const mysql = require('mysql2/promise');
const CONFIG = require('./config');

// Create connection pool
const pool = mysql.createPool({
    host: CONFIG.DB_HOST,
    user: CONFIG.DB_USER,
    password: CONFIG.DB_PASSWORD,
    database: CONFIG.DB_NAME,
    port: CONFIG.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Execute SQL query
async function executeQuery(query) {
    try {
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        throw new Error(`Database error: ${error.message}`);
    }
}

module.exports = {
    executeQuery,
    pool
};