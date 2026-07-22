-- Add Get Involved form notification columns with defaults for existing row(s).
-- Run with dev server stopped: pnpm add:get-involved-notification-columns

BEGIN;

ALTER TABLE get_involved_page
  ADD COLUMN IF NOT EXISTS form_notifications_notification_email varchar;

ALTER TABLE get_involved_page
  ADD COLUMN IF NOT EXISTS form_notifications_email_subject varchar;

ALTER TABLE get_involved_page
  ADD COLUMN IF NOT EXISTS form_notifications_success_message varchar;

UPDATE get_involved_page
SET
  form_notifications_notification_email = COALESCE(
    form_notifications_notification_email,
    'idipindas@gmail.com'
  ),
  form_notifications_email_subject = COALESCE(form_notifications_email_subject, 'Get Involved'),
  form_notifications_success_message = COALESCE(
    form_notifications_success_message,
    'Thank you for your message. We''ll be in touch soon.'
  )
WHERE
  form_notifications_notification_email IS NULL
  OR form_notifications_email_subject IS NULL
  OR form_notifications_success_message IS NULL;

COMMIT;
