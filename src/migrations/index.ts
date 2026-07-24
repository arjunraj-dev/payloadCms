import * as migration_20260724_190954_add_seo_fields from './20260724_190954_add_seo_fields';

export const migrations = [
  {
    up: migration_20260724_190954_add_seo_fields.up,
    down: migration_20260724_190954_add_seo_fields.down,
    name: '20260724_190954_add_seo_fields'
  },
];
