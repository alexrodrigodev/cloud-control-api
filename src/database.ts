import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function setupDatabase() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS servers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            ip_address TEXT NOT NULL,
            status TEXT DEFAULT 'online',
            last_ping DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log("Banco de dados SQLite inicializado com sucesso!");
    return db;
}