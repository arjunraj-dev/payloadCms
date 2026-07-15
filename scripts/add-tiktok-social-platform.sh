#!/usr/bin/env bash
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
  echo "ERROR: DATABASE_URL is not set"
  exit 1
fi

echo "==> Adding tiktok to social platform enums..."
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f scripts/add-tiktok-social-platform.sql

echo "==> Migrating existing x rows to tiktok..."
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f scripts/migrate-x-to-tiktok.sql

echo ""
echo "==> Done. Publish again in the CMS admin."
