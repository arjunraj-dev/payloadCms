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

echo "==> Reverting icon_id columns back to enum icon columns..."
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f scripts/revert-card-icon-schema.sql

echo ""
echo "==> Done. Start the dev server with: pnpm dev"
