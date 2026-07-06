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

echo "==> Adding reach-out button columns with defaults..."
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f scripts/add-reach-out-button-columns.sql

echo ""
echo "==> Done. Restart the dev server with: pnpm dev"
