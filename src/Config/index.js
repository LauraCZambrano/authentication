// ============================
//  URL
// ============================
process.env.URL = process.env.URL || "http://localhost:8000";


// ============================
//  Port
// ============================
//process.env.HTTP = process.env.HTTP || 80;
process.env.HTTP = process.env.HTTP || 8000;
process.env.HTTPS = process.env.HTTPS || 443;


// ============================
//  Authentication Seed
// ============================
//process.env.SEED = process.env.SEED || "-SEED-SECRET";


// ============================
//  Token Expiration
// ============================
process.env.TOKEN = 1000 * 60 * 60 * 24 * 30;


// ============================
//  Email Credentials
// ============================
process.env.email = 'email@email.com';
process.env.password = 'password';


// ============================
//  DataBase
// ============================
process.env.DB = process.env.DB || "mongodb://127.0.0.1:27017/db";