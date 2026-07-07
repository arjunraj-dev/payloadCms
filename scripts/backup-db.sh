#!/usr/bin/env bash
# Dump the current local Postgres database (from .env DATABASE_URL) to a file
# in database/, so it can be restored later or shared with a colleague.
#
# Usage:
#   ./scripts/backup-db.sh                # -> database/mind-db-YYYY-MM-DD.dump
#   ./scripts/backup-db.sh my-snapshot     # -> database/my-snapshot.dump
#
# Restore it later with:
#   ./scripts/restore-db.sh database/<filename>.dump

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

NAME="${1:-mind-db-$(date +%Y-%m-%d)}"
OUT="database/${NAME}.dump"

mkdir -p database

if [[ -f "$OUT" ]]; then
  echo "ERROR: $OUT already exists. Pass a different name, e.g. ./scripts/backup-db.sh my-snapshot"
  exit 1
fi

# The remote DB may run a newer Postgres major version than the locally installed
# client tools support (pg_dump requires client version >= server version). Run
# pg_dump from a matching postgres:18-alpine container instead of requiring a
# system package upgrade.
PG_DUMP_IMAGE="postgres:18-alpine"

echo "==> Testing database connection..."
if ! psql "$DATABASE_URL" -c "SELECT 1" >/dev/null 2>&1; then
  echo "ERROR: Cannot connect with DATABASE_URL from .env"
  exit 1
fi

echo "==> Dumping database to: $OUT"
docker run --rm --user "$(id -u):$(id -g)" -v "$ROOT/database:/dump" "$PG_DUMP_IMAGE" \
  pg_dump "$DATABASE_URL" -Fc --no-owner --no-acl -f "/dump/$(basename "$OUT")"

echo ""
echo "==> Backup complete: $OUT ($(du -h "$OUT" | cut -f1))"
echo "    Restore with: ./scripts/restore-db.sh $OUT"
