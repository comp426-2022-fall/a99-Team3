// This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const database = new Database('user.db');

// Creates a new prepared Statement from the given SQL string.
const stmt = database.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`);
//Executes the prepared statement. When execution completes it returns an object that represents the first row retrieved by the query.
let row = stmt.get();
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your database appears to be empty. I will initialize it now.');
// Set a const that will contain your SQL commands to initialize the database.
    const sqlInit = `
        CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, user TEXT, pass TEXT, email TEXT, name TEXT, fortune_score INT);
		INSERT INTO userinfo (user, pass, email, name, fortune_score) VALUES ('admin','aisudtqweoqwjnf7qy342oiu', 'admin@anything.com', 'admin', 0), ('test','123986qfaohnnc76y24r','test@anything.com', 'test', 0)
    `;
// Execute SQL commands that we just wrote above.
    database.exec(sqlInit);
// Echo information about what we just did to the console.
    console.log('Your database has been initialized with a new table and three entries containing a username, email address, and password.');
} else {
// Since the database already exists, echo that to the console.
    console.log('Database exists.')
}
// Export database
module.exports = database