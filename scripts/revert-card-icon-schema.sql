-- Revert partial CMS icon_id migration back to enum icon columns.
-- Run with dev server stopped: pnpm revert:card-icon-schema

BEGIN;

-- homepage_initiatives_cards
DO $$
BEGIN
  CREATE TYPE enum_homepage_initiatives_cards_icon AS ENUM ('briefcase', 'target', 'users', 'trending-up');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE homepage_initiatives_cards
  DROP CONSTRAINT IF EXISTS homepage_initiatives_cards_icon_id_media_id_fk;
DROP INDEX IF EXISTS homepage_initiatives_cards_icon_idx;
ALTER TABLE homepage_initiatives_cards DROP COLUMN IF EXISTS icon_id;
ALTER TABLE homepage_initiatives_cards
  ADD COLUMN IF NOT EXISTS icon enum_homepage_initiatives_cards_icon NOT NULL DEFAULT 'briefcase';

-- about_page_mission_cards
DO $$
BEGIN
  CREATE TYPE enum_about_page_mission_cards_icon AS ENUM (
    'briefcase', 'target', 'users', 'trending-up', 'bar-chart', 'building', 'smartphone',
    'shield', 'monitor', 'refresh-cw', 'calendar', 'lightbulb', 'folder', 'cpu',
    'graduation-cap', 'book-open', 'handshake', 'megaphone'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE about_page_mission_cards
  DROP CONSTRAINT IF EXISTS about_page_mission_cards_icon_id_media_id_fk;
DROP INDEX IF EXISTS about_page_mission_cards_icon_idx;
ALTER TABLE about_page_mission_cards DROP COLUMN IF EXISTS icon_id;
ALTER TABLE about_page_mission_cards
  ADD COLUMN IF NOT EXISTS icon enum_about_page_mission_cards_icon NOT NULL DEFAULT 'briefcase';

-- about_page_departments_items
DO $$
BEGIN
  CREATE TYPE enum_about_page_departments_items_icon AS ENUM (
    'briefcase', 'target', 'users', 'trending-up', 'bar-chart', 'building', 'smartphone',
    'shield', 'monitor', 'refresh-cw', 'calendar', 'lightbulb', 'folder', 'cpu',
    'graduation-cap', 'book-open', 'handshake', 'megaphone'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE about_page_departments_items
  DROP CONSTRAINT IF EXISTS about_page_departments_items_icon_id_media_id_fk;
DROP INDEX IF EXISTS about_page_departments_items_icon_idx;
ALTER TABLE about_page_departments_items DROP COLUMN IF EXISTS icon_id;
ALTER TABLE about_page_departments_items
  ADD COLUMN IF NOT EXISTS icon enum_about_page_departments_items_icon NOT NULL DEFAULT 'briefcase';

-- policy areas never used CMS icons; remove leftover icon_id only
ALTER TABLE about_page_policy_areas_policies
  DROP CONSTRAINT IF EXISTS about_page_policy_areas_policies_icon_id_media_id_fk;
DROP INDEX IF EXISTS about_page_policy_areas_policies_icon_idx;
ALTER TABLE about_page_policy_areas_policies DROP COLUMN IF EXISTS icon_id;

COMMIT;
