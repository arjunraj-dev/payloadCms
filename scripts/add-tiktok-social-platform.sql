-- Allow TikTok on social platform enums (CMS options now use tiktok instead of x).
-- Note: ADD VALUE must commit before the new label can be used in UPDATEs.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'enum_contact_page_follow_us_social_links_platform'
      AND e.enumlabel = 'tiktok'
  ) THEN
    ALTER TYPE enum_contact_page_follow_us_social_links_platform ADD VALUE 'tiktok';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'enum_get_involved_page_follow_the_work_social_links_platform'
      AND e.enumlabel = 'tiktok'
  ) THEN
    ALTER TYPE enum_get_involved_page_follow_the_work_social_links_platform ADD VALUE 'tiktok';
  END IF;
END $$;
