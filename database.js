// .env setup
import 'dotenv/config'

import mysql from 'mysql2'

// Collection of connections to the database
const sql = mysql.createPool({
    host: process.env.MYSQL_HOST, // for running this on other hosts (and hiding info)
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}).promise()

// Get all users
export async function getUsers() {
    // Square brackets around variable = first item of that array
    // In this case, first item of result is the table values
    const [result] = await sql.query(`SELECT * FROM user`)
    return result
}

// Get a user from id
export async function getUser(id) {
    const [result] = await sql.query(`SELECT * FROM user WHERE user_id=?`, [id])
    return result[0] // important, to not return an array
}

// Create a new user entry
export async function createUser(roleId, lastName, firstName, email, password) {
    const result = await sql.query(`
        INSERT INTO user (user_id, role_id, lastname, firstname, email, password)
        VALUES (?, ?, ?, ?, ?, ?)
    `, [0, roleId, lastName, firstName, email, password])
    
    // Return new object if successful
    const id = result[0].insertId
    return getUser(id)
}