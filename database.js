const Database = require('better-sqlite3');
const db = new Database('expenses.db');

// Create the "expenses" table if it doesn't already exist
db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL
  )
`);

module.exports = db;