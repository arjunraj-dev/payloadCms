import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { Client } from 'pg'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.resolve(__dirname, '.env') })

const password = process.env.RDS_PASSWORD

if (!password) {
  console.error('Missing RDS_PASSWORD in .env')
  process.exit(1)
}

const client = new Client({
  host: process.env.RDS_HOST,
  port: Number(process.env.RDS_PORT),
  database: process.env.RDS_DATABASE,
  user: process.env.RDS_USER,
  password,
  ssl: { rejectUnauthorized: false },
})

async function main() {
  await client.connect()
  console.log('Connected to RDS successfully')

  const result = await client.query('SELECT NOW()')
  console.log('Server time:', result.rows[0].now)

  await client.end()
}

main().catch((err) => {
  console.error('Connection failed:', err)
  process.exit(1)
})
