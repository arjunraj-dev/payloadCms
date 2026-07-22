#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ -z "${DATABASE_URL:-}" ]]; then
  if [[ -f .env ]]; then
    DATABASE_URL="$(grep '^DATABASE_URL=' .env | cut -d= -f2- | tr -d '"')"
  fi
fi

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is not set. Add it to .env or export it before running this script."
  exit 1
fi

psql "$DATABASE_URL" -f scripts/add-get-involved-email-logo-column.sql
