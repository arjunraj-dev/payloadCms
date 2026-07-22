-- Add Get Involved email template columns with defaults for existing row(s).
-- Run with dev server stopped: pnpm add:get-involved-email-template-columns

BEGIN;

ALTER TABLE get_involved_page
  ADD COLUMN IF NOT EXISTS form_notifications_email_template_subject varchar;

ALTER TABLE get_involved_page
  ADD COLUMN IF NOT EXISTS form_notifications_email_template_heading varchar;

ALTER TABLE get_involved_page
  ADD COLUMN IF NOT EXISTS form_notifications_email_template_body varchar;

ALTER TABLE get_involved_page
  ADD COLUMN IF NOT EXISTS form_notifications_email_template_footer varchar;

UPDATE get_involved_page
SET
  form_notifications_email_template_subject = COALESCE(
    form_notifications_email_template_subject,
    CASE
      WHEN form_notifications_email_subject IS NOT NULL
        AND form_notifications_email_subject <> ''
        AND form_notifications_email_subject <> 'Get Involved'
      THEN form_notifications_email_subject || ': {{category}} — {{name}}'
      ELSE 'Get Involved: {{category}} — {{name}}'
    END
  ),
  form_notifications_email_template_heading = COALESCE(
    form_notifications_email_template_heading,
    'New Get Involved form submission'
  ),
  form_notifications_email_template_body = COALESCE(
    form_notifications_email_template_body,
    'Name: {{name}}' || E'\n' ||
    'Email: {{email}}' || E'\n' ||
    'Category: {{category}}' || E'\n' ||
    E'\n' ||
    'Message:' || E'\n' ||
    '{{message}}'
  )
WHERE
  form_notifications_email_template_subject IS NULL
  OR form_notifications_email_template_heading IS NULL
  OR form_notifications_email_template_body IS NULL;

COMMIT;
