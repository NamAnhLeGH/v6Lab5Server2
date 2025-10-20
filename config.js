/**
 * Lab 5 - Server Configuration
 * Team: v6
 * Attribution: ChatGPT (https://chat.openai.com/) was used for code structure assistance.
 */

const CONFIG = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'lab5_patients',
    DB_PORT: process.env.DB_PORT || 3306,
    SERVER_PORT: process.env.PORT || 3030,

    MESSAGES: {
        TABLE_CREATED: 'Table created',
        INSERT_SUCCESS: 'Insert successful',
        FORBIDDEN: 'Operation not allowed',
        ERROR: 'Database error'
    }
};

module.exports = CONFIG;