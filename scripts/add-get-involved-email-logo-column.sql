-- Add Get Involved email logo column for existing row(s).
-- Run: pnpm add:get-involved-email-logo-column

BEGIN;

ALTER TABLE get_involved_page
  ADD COLUMN IF NOT EXISTS form_notifications_email_template_logo_id integer;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'get_involved_page_form_notifications_email_template_logo_id_media_id_fk'
  ) THEN
    ALTER TABLE get_involved_page
      ADD CONSTRAINT get_involved_page_form_notifications_email_template_logo_id_media_id_fk
      FOREIGN KEY (form_notifications_email_template_logo_id)
      REFERENCES media(id)
      ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS get_involved_page_form_notifications_email_template_logo_idx
  ON get_involved_page (form_notifications_email_template_logo_id);

COMMIT;
