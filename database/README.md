Place your colleague's Postgres dump file in this folder.

Examples:
  database/cms-dump.sql
  database/website-template-demo.dump

Then from the project root run:

  chmod +x scripts/restore-db.sh
  ./scripts/restore-db.sh database/cms-dump.sql

Make sure `.env` has the correct DATABASE_URL for your local Postgres
(same database name as in the URL, e.g. website-template-demo).
