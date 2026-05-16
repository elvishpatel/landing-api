require('dotenv').config();

const { createClient } = require('@libsql/client');

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

const createTableSql = `
    CREATE TABLE IF NOT EXISTS urls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        long_url TEXT NOT NULL,
        short_id TEXT NOT NULL UNIQUE,
        click_count INTEGER DEFAULT 0
    );
`;

async function setupDatabase() {
    try {
        console.log("Executing CREATE TABLE statement...");
        await db.execute(createTableSql);
        console.log("Table 'urls' created or already exists. ✅");
    } catch (err) {
        console.error("Error setting up the database:", err);
    }
}

setupDatabase();
