-- Add reach-out button columns with defaults for existing get_involved_page row(s).
-- Run with dev server stopped: pnpm add:reach-out-button-columns

BEGIN;

ALTER TABLE get_involved_page
  ADD COLUMN IF NOT EXISTS reach_out_button_label varchar;

ALTER TABLE get_involved_page
  ADD COLUMN IF NOT EXISTS reach_out_button_href varchar;

UPDATE get_involved_page
SET
  reach_out_button_label = COALESCE(reach_out_button_label, 'See what''s already in motion'),
  reach_out_button_href = COALESCE(reach_out_button_href, '/progress')
WHERE reach_out_button_label IS NULL OR reach_out_button_href IS NULL;

COMMIT;
