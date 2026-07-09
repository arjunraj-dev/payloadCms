-- Add government service mosaic image columns to homepage global.
ALTER TABLE homepage
  ADD COLUMN IF NOT EXISTS government_service_images_family_id integer,
  ADD COLUMN IF NOT EXISTS government_service_images_laptop_id integer,
  ADD COLUMN IF NOT EXISTS government_service_images_celebrating_id integer;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'homepage_government_service_images_family_id_media_id_fk'
  ) THEN
    ALTER TABLE homepage
      ADD CONSTRAINT homepage_government_service_images_family_id_media_id_fk
      FOREIGN KEY (government_service_images_family_id) REFERENCES media(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'homepage_government_service_images_laptop_id_media_id_fk'
  ) THEN
    ALTER TABLE homepage
      ADD CONSTRAINT homepage_government_service_images_laptop_id_media_id_fk
      FOREIGN KEY (government_service_images_laptop_id) REFERENCES media(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'homepage_government_service_images_celebrating_id_media_id_fk'
  ) THEN
    ALTER TABLE homepage
      ADD CONSTRAINT homepage_government_service_images_celebrating_id_media_id_fk
      FOREIGN KEY (government_service_images_celebrating_id) REFERENCES media(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Legacy single-image column is no longer used by the CMS schema.
ALTER TABLE homepage
  ALTER COLUMN government_service_image_id DROP NOT NULL;
