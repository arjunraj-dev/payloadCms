-- Migrate leftover X / Twitter social rows to TikTok (run after enum value is committed).

UPDATE contact_page_follow_us_social_links
SET platform = 'tiktok'
WHERE platform::text = 'x';

UPDATE get_involved_page_follow_the_work_social_links
SET platform = 'tiktok'
WHERE platform::text = 'x';
