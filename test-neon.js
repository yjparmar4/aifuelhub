// Blog post submission via Neon serverless HTTP driver
const { neon } = require('@neondatabase/serverless');

const DB_URL = "postgresql://neondb_owner:npg_soFXbE9jcCy2@ep-square-frost-adk6btqd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";

const sql = neon(DB_URL);

async function main() {
    try {
        console.log('Testing connection...');
        const result = await sql`SELECT 1 as test`;
        console.log('Connected:', result);
    } catch (e) {
        console.error('Error:', e.message);
    }
}

main();
