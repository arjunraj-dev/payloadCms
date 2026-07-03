#!/usr/bin/env bash
# Restore a Postgres dump from your colleague into the local database from .env
#
# Usage:
#   ./scripts/restore-db.sh path/to/dump.sql
#   ./scripts/restore-db.sh database/cms-dump.dump
#
# Place the dump file your colleague sent in the database/ folder first.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "ERROR: DATABASE_URL is not set. Copy .env.example to .env and configure it."
  exit 1
fi

DUMP="${1:-database/dump.sql}"
FRESH=false

if [[ "${1:-}" == "--fresh" ]]; then
  FRESH=true
  DUMP="${2:-database/dump.sql}"
fi

if [[ ! -f "$DUMP" ]]; then
  echo "ERROR: Dump file not found: $DUMP"
  echo ""
  echo "Steps:"
  echo "  1. Copy your colleague's dump file into: $ROOT/database/"
  echo "  2. Run: ./scripts/restore-db.sh database/<filename>"
  echo ""
  echo "Supported formats: .sql  .dump  .backup  .tar"
  exit 1
fi

echo "==> Testing database connection..."
if ! psql "$DATABASE_URL" -c "SELECT 1" >/dev/null 2>&1; then
  echo "ERROR: Cannot connect with DATABASE_URL from .env"
  echo "Fix your Postgres password/host in .env, then try again."
  echo "Example: DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5432/website-template-demo"
  exit 1
fi

echo "==> Restoring: $DUMP"
echo "    Target: (database from .env DATABASE_URL)"

if [[ "$FRESH" == true ]]; then
  echo "==> Fresh restore: dropping and recreating database..."
  DB_NAME="$(node -e "
    const u = new URL(process.env.DATABASE_URL);
    console.log(u.pathname.replace(/^\//, ''));
  ")"
  ADMIN_URL="$(node -e "
    const u = new URL(process.env.DATABASE_URL);
    u.pathname = '/postgres';
    console.log(u.toString());
  ")"
  psql "$ADMIN_URL" -v ON_ERROR_STOP=1 -c "DROP DATABASE IF EXISTS \"${DB_NAME}\" WITH (FORCE);"
  psql "$ADMIN_URL" -v ON_ERROR_STOP=1 -c "CREATE DATABASE \"${DB_NAME}\";"
fi

case "$DUMP" in
  *.sql)
    psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$DUMP"
    ;;
  *.dump|*.backup|*.tar|*.custom)
    RESTORE_FLAGS=(--no-owner --no-acl -d "$DATABASE_URL" "$DUMP")
    if [[ "$FRESH" != true ]]; then
      RESTORE_FLAGS=(--clean --if-exists "${RESTORE_FLAGS[@]}")
    fi
    pg_restore "${RESTORE_FLAGS[@]}"
    ;;
  *)
    echo "ERROR: Unknown dump format. Rename to .sql or .dump, or ask your colleague which format they exported."
    exit 1
    ;;
esac

echo ""
echo "==> Restore complete."
echo "    Sync media files: node scripts/sync-media-from-images.mjs"
echo "    Start the app: pnpm dev"
echo "    Admin panel:   http://localhost:3000/admin"
