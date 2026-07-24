import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_updates_category" AS ENUM('announcements', 'events', 'statements', 'media');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_homepage_show_you_cards_label_color" AS ENUM('green', 'blue', 'orange');
  CREATE TYPE "public"."enum_homepage_initiatives_cards_icon" AS ENUM('briefcase', 'target', 'users', 'trending-up');
  CREATE TYPE "public"."enum_about_page_text_image_sections_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_about_page_mission_cards_icon" AS ENUM('briefcase', 'target', 'users', 'trending-up', 'bar-chart', 'building', 'smartphone', 'shield', 'monitor', 'refresh-cw', 'calendar', 'lightbulb', 'folder', 'cpu', 'graduation-cap', 'book-open', 'handshake', 'megaphone');
  CREATE TYPE "public"."enum_about_page_policy_areas_policies_status" AS ENUM('active', 'comingSoon');
  CREATE TYPE "public"."enum_about_page_departments_items_icon" AS ENUM('briefcase', 'target', 'users', 'trending-up', 'bar-chart', 'building', 'smartphone', 'shield', 'monitor', 'refresh-cw', 'calendar', 'lightbulb', 'folder', 'cpu', 'graduation-cap', 'book-open', 'handshake', 'megaphone');
  CREATE TYPE "public"."enum_progress_page_status_cards_icon" AS ENUM('briefcase', 'target', 'users', 'trending-up', 'bar-chart', 'building', 'smartphone', 'shield', 'monitor', 'refresh-cw', 'calendar', 'lightbulb', 'folder', 'cpu', 'graduation-cap', 'book-open', 'handshake', 'megaphone');
  CREATE TYPE "public"."enum_progress_page_modernize_government_cards_icon" AS ENUM('briefcase', 'target', 'users', 'trending-up', 'bar-chart', 'building', 'smartphone', 'shield', 'monitor', 'refresh-cw', 'calendar', 'lightbulb', 'folder', 'cpu', 'graduation-cap', 'book-open', 'handshake', 'megaphone');
  CREATE TYPE "public"."enum_progress_page_modernize_government_cards_label_color" AS ENUM('green', 'blue', 'orange', 'dark', 'planned');
  CREATE TYPE "public"."enum_progress_page_build_future_readiness_cards_icon" AS ENUM('briefcase', 'target', 'users', 'trending-up', 'bar-chart', 'building', 'smartphone', 'shield', 'monitor', 'refresh-cw', 'calendar', 'lightbulb', 'folder', 'cpu', 'graduation-cap', 'book-open', 'handshake', 'megaphone');
  CREATE TYPE "public"."enum_progress_page_build_future_readiness_cards_label_color" AS ENUM('green', 'blue', 'orange', 'dark', 'planned');
  CREATE TYPE "public"."enum_progress_page_develop_bahamian_talent_cards_icon" AS ENUM('briefcase', 'target', 'users', 'trending-up', 'bar-chart', 'building', 'smartphone', 'shield', 'monitor', 'refresh-cw', 'calendar', 'lightbulb', 'folder', 'cpu', 'graduation-cap', 'book-open', 'handshake', 'megaphone');
  CREATE TYPE "public"."enum_progress_page_develop_bahamian_talent_cards_label_color" AS ENUM('green', 'blue', 'orange', 'dark', 'planned');
  CREATE TYPE "public"."enum_progress_page_drive_national_development_cards_icon" AS ENUM('briefcase', 'target', 'users', 'trending-up', 'bar-chart', 'building', 'smartphone', 'shield', 'monitor', 'refresh-cw', 'calendar', 'lightbulb', 'folder', 'cpu', 'graduation-cap', 'book-open', 'handshake', 'megaphone');
  CREATE TYPE "public"."enum_progress_page_drive_national_development_cards_label_color" AS ENUM('green', 'blue', 'orange', 'dark', 'planned');
  CREATE TYPE "public"."enum_get_involved_page_categories_section_categories_icon" AS ENUM('briefcase', 'target', 'users', 'trending-up', 'bar-chart', 'building', 'smartphone', 'shield', 'monitor', 'refresh-cw', 'calendar', 'lightbulb', 'folder', 'cpu', 'graduation-cap', 'book-open', 'handshake', 'megaphone');
  CREATE TYPE "public"."enum_get_involved_page_follow_the_work_social_links_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'tiktok');
  CREATE TYPE "public"."enum_get_involved_page_reach_out_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_contact_page_enquiries_icon" AS ENUM('briefcase', 'target', 'users', 'trending-up', 'bar-chart', 'building', 'smartphone', 'shield', 'monitor', 'refresh-cw', 'calendar', 'lightbulb', 'folder', 'cpu', 'graduation-cap', 'book-open', 'handshake', 'megaphone');
  CREATE TYPE "public"."enum_contact_page_follow_us_social_links_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'tiktok');
  CREATE TABLE "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact',
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_rich_text" jsonb,
  	"version_hero_media_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "updates_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "updates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"category" "enum_updates_category" DEFAULT 'announcements' NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"prefix" varchar DEFAULT 'dev-assets',
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"category_i_d" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"updates_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"users_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"cta_label" varchar NOT NULL,
  	"cta_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"tagline" varchar NOT NULL,
  	"secondary_tagline" varchar,
  	"contact_phone_label" varchar,
  	"contact_phone_href" varchar,
  	"contact_toll_free_label" varchar,
  	"contact_toll_free_href" varchar,
  	"contact_email" varchar,
  	"contact_address" varchar,
  	"copyright_text" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_hero_background_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_show_you_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"label_color" "enum_homepage_show_you_cards_label_color" DEFAULT 'green' NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_ministry_built_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_minister_profile_bio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_initiatives_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_homepage_initiatives_cards_icon" DEFAULT 'briefcase' NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_draw_threads_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_subtitle" varchar NOT NULL,
  	"hero_primary_c_t_a_label" varchar NOT NULL,
  	"hero_primary_c_t_a_href" varchar NOT NULL,
  	"hero_secondary_c_t_a_label" varchar,
  	"hero_secondary_c_t_a_href" varchar,
  	"hero_background_image_interval" numeric DEFAULT 5000,
  	"show_you_heading" varchar NOT NULL,
  	"show_you_description" varchar NOT NULL,
  	"show_you_cta_label" varchar NOT NULL,
  	"show_you_cta_href" varchar NOT NULL,
  	"ministry_built_heading" varchar NOT NULL,
  	"ministry_built_image_id" integer NOT NULL,
  	"ministry_built_button_label" varchar NOT NULL,
  	"ministry_built_button_href" varchar NOT NULL,
  	"minister_profile_label" varchar NOT NULL,
  	"minister_profile_name" varchar NOT NULL,
  	"minister_profile_title" varchar NOT NULL,
  	"minister_profile_image_id" integer NOT NULL,
  	"initiatives_heading" varchar NOT NULL,
  	"initiatives_cta_label" varchar NOT NULL,
  	"initiatives_cta_href" varchar NOT NULL,
  	"government_service_heading" varchar NOT NULL,
  	"government_service_description" varchar NOT NULL,
  	"government_service_cta_label" varchar NOT NULL,
  	"government_service_cta_href" varchar NOT NULL,
  	"government_service_images_family_id" integer NOT NULL,
  	"government_service_images_laptop_id" integer NOT NULL,
  	"government_service_images_celebrating_id" integer NOT NULL,
  	"draw_threads_heading" varchar NOT NULL,
  	"draw_threads_description" varchar NOT NULL,
  	"draw_threads_cta_label" varchar NOT NULL,
  	"draw_threads_cta_href" varchar NOT NULL,
  	"country_future_heading" varchar NOT NULL,
  	"country_future_subtitle" varchar NOT NULL,
  	"country_future_primary_button_label" varchar NOT NULL,
  	"country_future_primary_button_href" varchar NOT NULL,
  	"country_future_secondary_button_label" varchar,
  	"country_future_secondary_button_href" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_hero_subtitle" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_text_image_sections_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_text_image_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_position" "enum_about_page_text_image_sections_image_position" DEFAULT 'right'
  );
  
  CREATE TABLE "about_page_mission_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_page_mission_cards_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_policy_areas_policies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"status" "enum_about_page_policy_areas_policies_status" DEFAULT 'active' NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "about_page_departments_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_page_departments_items_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"link_label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_minister_profiles_bio" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_minister_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"mission_heading" varchar NOT NULL,
  	"mission_description" varchar NOT NULL,
  	"dual_cta_first_heading" varchar NOT NULL,
  	"dual_cta_first_description" varchar NOT NULL,
  	"dual_cta_first_button_label" varchar NOT NULL,
  	"dual_cta_first_button_href" varchar NOT NULL,
  	"dual_cta_second_heading" varchar NOT NULL,
  	"dual_cta_second_description" varchar NOT NULL,
  	"dual_cta_second_button_label" varchar NOT NULL,
  	"dual_cta_second_button_href" varchar NOT NULL,
  	"policy_areas_heading" varchar NOT NULL,
  	"policy_areas_cta_label" varchar NOT NULL,
  	"policy_areas_cta_href" varchar NOT NULL,
  	"departments_heading" varchar NOT NULL,
  	"departments_description" varchar NOT NULL,
  	"country_future_heading" varchar NOT NULL,
  	"country_future_subtitle" varchar NOT NULL,
  	"country_future_primary_button_label" varchar NOT NULL,
  	"country_future_primary_button_href" varchar NOT NULL,
  	"country_future_secondary_button_label" varchar,
  	"country_future_secondary_button_href" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "progress_page_status_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_progress_page_status_cards_icon" NOT NULL,
  	"color" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "progress_page_modernize_government_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_progress_page_modernize_government_cards_icon" NOT NULL,
  	"label" varchar NOT NULL,
  	"label_color" "enum_progress_page_modernize_government_cards_label_color" DEFAULT 'green' NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "progress_page_build_future_readiness_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_progress_page_build_future_readiness_cards_icon" NOT NULL,
  	"label" varchar NOT NULL,
  	"label_color" "enum_progress_page_build_future_readiness_cards_label_color" DEFAULT 'green' NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "progress_page_develop_bahamian_talent_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_progress_page_develop_bahamian_talent_cards_icon" NOT NULL,
  	"label" varchar NOT NULL,
  	"label_color" "enum_progress_page_develop_bahamian_talent_cards_label_color" DEFAULT 'green' NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "progress_page_drive_national_development_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_progress_page_drive_national_development_cards_icon" NOT NULL,
  	"label" varchar NOT NULL,
  	"label_color" "enum_progress_page_drive_national_development_cards_label_color" DEFAULT 'green' NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "progress_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status_heading" varchar NOT NULL,
  	"status_description" varchar NOT NULL,
  	"modernize_government_title" varchar NOT NULL,
  	"modernize_government_description" varchar NOT NULL,
  	"build_future_readiness_title" varchar NOT NULL,
  	"build_future_readiness_description" varchar NOT NULL,
  	"develop_bahamian_talent_title" varchar NOT NULL,
  	"develop_bahamian_talent_description" varchar NOT NULL,
  	"develop_bahamian_talent_background_image_id" integer NOT NULL,
  	"drive_national_development_title" varchar NOT NULL,
  	"drive_national_development_description" varchar NOT NULL,
  	"country_future_heading" varchar NOT NULL,
  	"country_future_subtitle" varchar NOT NULL,
  	"country_future_pillars_heading" varchar,
  	"country_future_pillars_description" varchar,
  	"country_future_footer_text" varchar,
  	"country_future_primary_button_label" varchar NOT NULL,
  	"country_future_primary_button_href" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "updates_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_subtitle" varchar NOT NULL,
  	"closing_heading" varchar NOT NULL,
  	"closing_subtitle" varchar NOT NULL,
  	"closing_primary_button_label" varchar NOT NULL,
  	"closing_primary_button_href" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "get_involved_page_hero_subtitle" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "get_involved_page_categories_section_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_get_involved_page_categories_section_categories_icon" NOT NULL,
  	"image_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar DEFAULT '#send-message' NOT NULL
  );
  
  CREATE TABLE "get_involved_page_reach_out_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "get_involved_page_follow_the_work_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_get_involved_page_follow_the_work_social_links_platform" NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "get_involved_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"categories_section_heading" varchar NOT NULL,
  	"form_form_title" varchar DEFAULT 'Send us a message' NOT NULL,
  	"form_illustration_image_id" integer NOT NULL,
  	"form_notifications_notification_email" varchar DEFAULT 'idipindas@gmail.com' NOT NULL,
  	"form_notifications_email_template_logo_id" integer,
  	"form_notifications_email_template_subject" varchar DEFAULT 'Get Involved: {{category}} — {{name}}',
  	"form_notifications_email_template_heading" varchar DEFAULT 'New Get Involved submission',
  	"form_notifications_email_template_body" varchar DEFAULT 'You have received a new message from the Get Involved form.
  
  Name: {{name}}
  Email: {{email}}
  Category: {{category}}
  
  Message:
  {{message}}',
  	"form_notifications_email_template_footer" varchar,
  	"form_notifications_success_message" varchar DEFAULT 'Thank you for your message. We''ll be in touch soon.',
  	"reach_out_heading" varchar NOT NULL,
  	"reach_out_button_label" varchar DEFAULT 'See our latest updates',
  	"reach_out_button_href" varchar DEFAULT '/progress',
  	"reach_out_image_id" integer NOT NULL,
  	"reach_out_image_position" "enum_get_involved_page_reach_out_image_position" DEFAULT 'right',
  	"follow_the_work_heading" varchar NOT NULL,
  	"follow_the_work_description" varchar NOT NULL,
  	"follow_the_work_background_image_id" integer NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_office_info_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_enquiries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_contact_page_enquiries_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_follow_us_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_contact_page_follow_us_social_links_platform" NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_subtitle" varchar NOT NULL,
  	"hero_secondary_c_t_a_label" varchar,
  	"hero_secondary_c_t_a_href" varchar,
  	"office_info_address" varchar NOT NULL,
  	"office_info_phone" varchar NOT NULL,
  	"office_info_email" varchar NOT NULL,
  	"office_info_image_id" integer NOT NULL,
  	"follow_us_heading" varchar NOT NULL,
  	"follow_us_subtitle" varchar NOT NULL,
  	"closing_heading" varchar NOT NULL,
  	"closing_subtitle" varchar,
  	"closing_primary_button_label" varchar NOT NULL,
  	"closing_primary_button_href" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates_content" ADD CONSTRAINT "updates_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates" ADD CONSTRAINT "updates_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_updates_fk" FOREIGN KEY ("updates_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_hero_background_images" ADD CONSTRAINT "homepage_hero_background_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_hero_background_images" ADD CONSTRAINT "homepage_hero_background_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_show_you_cards" ADD CONSTRAINT "homepage_show_you_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_ministry_built_description" ADD CONSTRAINT "homepage_ministry_built_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_minister_profile_bio" ADD CONSTRAINT "homepage_minister_profile_bio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_initiatives_cards" ADD CONSTRAINT "homepage_initiatives_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_draw_threads_tags" ADD CONSTRAINT "homepage_draw_threads_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_ministry_built_image_id_media_id_fk" FOREIGN KEY ("ministry_built_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_minister_profile_image_id_media_id_fk" FOREIGN KEY ("minister_profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_government_service_images_family_id_media_id_fk" FOREIGN KEY ("government_service_images_family_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_government_service_images_laptop_id_media_id_fk" FOREIGN KEY ("government_service_images_laptop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_government_service_images_celebrating_id_media_id_fk" FOREIGN KEY ("government_service_images_celebrating_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_hero_subtitle" ADD CONSTRAINT "about_page_hero_subtitle_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_text_image_sections_text" ADD CONSTRAINT "about_page_text_image_sections_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_text_image_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_text_image_sections" ADD CONSTRAINT "about_page_text_image_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_text_image_sections" ADD CONSTRAINT "about_page_text_image_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_mission_cards" ADD CONSTRAINT "about_page_mission_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_policy_areas_policies" ADD CONSTRAINT "about_page_policy_areas_policies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_departments_items" ADD CONSTRAINT "about_page_departments_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_minister_profiles_bio" ADD CONSTRAINT "about_page_minister_profiles_bio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_minister_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_minister_profiles" ADD CONSTRAINT "about_page_minister_profiles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_minister_profiles" ADD CONSTRAINT "about_page_minister_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "progress_page_status_cards" ADD CONSTRAINT "progress_page_status_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "progress_page_status_cards" ADD CONSTRAINT "progress_page_status_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."progress_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "progress_page_modernize_government_cards" ADD CONSTRAINT "progress_page_modernize_government_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."progress_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "progress_page_build_future_readiness_cards" ADD CONSTRAINT "progress_page_build_future_readiness_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."progress_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "progress_page_develop_bahamian_talent_cards" ADD CONSTRAINT "progress_page_develop_bahamian_talent_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."progress_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "progress_page_drive_national_development_cards" ADD CONSTRAINT "progress_page_drive_national_development_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."progress_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "progress_page" ADD CONSTRAINT "progress_page_develop_bahamian_talent_background_image_id_media_id_fk" FOREIGN KEY ("develop_bahamian_talent_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "get_involved_page_hero_subtitle" ADD CONSTRAINT "get_involved_page_hero_subtitle_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."get_involved_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "get_involved_page_categories_section_categories" ADD CONSTRAINT "get_involved_page_categories_section_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "get_involved_page_categories_section_categories" ADD CONSTRAINT "get_involved_page_categories_section_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."get_involved_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "get_involved_page_reach_out_text" ADD CONSTRAINT "get_involved_page_reach_out_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."get_involved_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "get_involved_page_follow_the_work_social_links" ADD CONSTRAINT "get_involved_page_follow_the_work_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."get_involved_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "get_involved_page" ADD CONSTRAINT "get_involved_page_form_illustration_image_id_media_id_fk" FOREIGN KEY ("form_illustration_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "get_involved_page" ADD CONSTRAINT "get_involved_page_form_notifications_email_template_logo_id_media_id_fk" FOREIGN KEY ("form_notifications_email_template_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "get_involved_page" ADD CONSTRAINT "get_involved_page_reach_out_image_id_media_id_fk" FOREIGN KEY ("reach_out_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "get_involved_page" ADD CONSTRAINT "get_involved_page_follow_the_work_background_image_id_media_id_fk" FOREIGN KEY ("follow_the_work_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_office_info_hours" ADD CONSTRAINT "contact_page_office_info_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_enquiries" ADD CONSTRAINT "contact_page_enquiries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_follow_us_social_links" ADD CONSTRAINT "contact_page_follow_us_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_office_info_image_id_media_id_fk" FOREIGN KEY ("office_info_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_columns_order_idx" ON "pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_parent_id_idx" ON "pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "pages_blocks_archive_order_idx" ON "pages_blocks_archive" USING btree ("_order");
  CREATE INDEX "pages_blocks_archive_parent_id_idx" ON "pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_archive_path_idx" ON "pages_blocks_archive" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_columns_order_idx" ON "_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_parent_id_idx" ON "_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_archive_order_idx" ON "_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_archive_parent_id_idx" ON "_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_archive_path_idx" ON "_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "updates_content_order_idx" ON "updates_content" USING btree ("_order");
  CREATE INDEX "updates_content_parent_id_idx" ON "updates_content" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "updates_slug_idx" ON "updates" USING btree ("slug");
  CREATE INDEX "updates_image_idx" ON "updates" USING btree ("image_id");
  CREATE INDEX "updates_updated_at_idx" ON "updates" USING btree ("updated_at");
  CREATE INDEX "updates_created_at_idx" ON "updates" USING btree ("created_at");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_updates_id_idx" ON "payload_locked_documents_rels" USING btree ("updates_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE INDEX "homepage_hero_background_images_order_idx" ON "homepage_hero_background_images" USING btree ("_order");
  CREATE INDEX "homepage_hero_background_images_parent_id_idx" ON "homepage_hero_background_images" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_background_images_image_idx" ON "homepage_hero_background_images" USING btree ("image_id");
  CREATE INDEX "homepage_show_you_cards_order_idx" ON "homepage_show_you_cards" USING btree ("_order");
  CREATE INDEX "homepage_show_you_cards_parent_id_idx" ON "homepage_show_you_cards" USING btree ("_parent_id");
  CREATE INDEX "homepage_ministry_built_description_order_idx" ON "homepage_ministry_built_description" USING btree ("_order");
  CREATE INDEX "homepage_ministry_built_description_parent_id_idx" ON "homepage_ministry_built_description" USING btree ("_parent_id");
  CREATE INDEX "homepage_minister_profile_bio_order_idx" ON "homepage_minister_profile_bio" USING btree ("_order");
  CREATE INDEX "homepage_minister_profile_bio_parent_id_idx" ON "homepage_minister_profile_bio" USING btree ("_parent_id");
  CREATE INDEX "homepage_initiatives_cards_order_idx" ON "homepage_initiatives_cards" USING btree ("_order");
  CREATE INDEX "homepage_initiatives_cards_parent_id_idx" ON "homepage_initiatives_cards" USING btree ("_parent_id");
  CREATE INDEX "homepage_draw_threads_tags_order_idx" ON "homepage_draw_threads_tags" USING btree ("_order");
  CREATE INDEX "homepage_draw_threads_tags_parent_id_idx" ON "homepage_draw_threads_tags" USING btree ("_parent_id");
  CREATE INDEX "homepage_ministry_built_ministry_built_image_idx" ON "homepage" USING btree ("ministry_built_image_id");
  CREATE INDEX "homepage_minister_profile_minister_profile_image_idx" ON "homepage" USING btree ("minister_profile_image_id");
  CREATE INDEX "homepage_government_service_images_government_service_im_idx" ON "homepage" USING btree ("government_service_images_family_id");
  CREATE INDEX "homepage_government_service_images_government_service__1_idx" ON "homepage" USING btree ("government_service_images_laptop_id");
  CREATE INDEX "homepage_government_service_images_government_service__2_idx" ON "homepage" USING btree ("government_service_images_celebrating_id");
  CREATE INDEX "about_page_hero_subtitle_order_idx" ON "about_page_hero_subtitle" USING btree ("_order");
  CREATE INDEX "about_page_hero_subtitle_parent_id_idx" ON "about_page_hero_subtitle" USING btree ("_parent_id");
  CREATE INDEX "about_page_text_image_sections_text_order_idx" ON "about_page_text_image_sections_text" USING btree ("_order");
  CREATE INDEX "about_page_text_image_sections_text_parent_id_idx" ON "about_page_text_image_sections_text" USING btree ("_parent_id");
  CREATE INDEX "about_page_text_image_sections_order_idx" ON "about_page_text_image_sections" USING btree ("_order");
  CREATE INDEX "about_page_text_image_sections_parent_id_idx" ON "about_page_text_image_sections" USING btree ("_parent_id");
  CREATE INDEX "about_page_text_image_sections_image_idx" ON "about_page_text_image_sections" USING btree ("image_id");
  CREATE INDEX "about_page_mission_cards_order_idx" ON "about_page_mission_cards" USING btree ("_order");
  CREATE INDEX "about_page_mission_cards_parent_id_idx" ON "about_page_mission_cards" USING btree ("_parent_id");
  CREATE INDEX "about_page_policy_areas_policies_order_idx" ON "about_page_policy_areas_policies" USING btree ("_order");
  CREATE INDEX "about_page_policy_areas_policies_parent_id_idx" ON "about_page_policy_areas_policies" USING btree ("_parent_id");
  CREATE INDEX "about_page_departments_items_order_idx" ON "about_page_departments_items" USING btree ("_order");
  CREATE INDEX "about_page_departments_items_parent_id_idx" ON "about_page_departments_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_minister_profiles_bio_order_idx" ON "about_page_minister_profiles_bio" USING btree ("_order");
  CREATE INDEX "about_page_minister_profiles_bio_parent_id_idx" ON "about_page_minister_profiles_bio" USING btree ("_parent_id");
  CREATE INDEX "about_page_minister_profiles_order_idx" ON "about_page_minister_profiles" USING btree ("_order");
  CREATE INDEX "about_page_minister_profiles_parent_id_idx" ON "about_page_minister_profiles" USING btree ("_parent_id");
  CREATE INDEX "about_page_minister_profiles_image_idx" ON "about_page_minister_profiles" USING btree ("image_id");
  CREATE INDEX "about_page_hero_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "progress_page_status_cards_order_idx" ON "progress_page_status_cards" USING btree ("_order");
  CREATE INDEX "progress_page_status_cards_parent_id_idx" ON "progress_page_status_cards" USING btree ("_parent_id");
  CREATE INDEX "progress_page_status_cards_image_idx" ON "progress_page_status_cards" USING btree ("image_id");
  CREATE INDEX "progress_page_modernize_government_cards_order_idx" ON "progress_page_modernize_government_cards" USING btree ("_order");
  CREATE INDEX "progress_page_modernize_government_cards_parent_id_idx" ON "progress_page_modernize_government_cards" USING btree ("_parent_id");
  CREATE INDEX "progress_page_build_future_readiness_cards_order_idx" ON "progress_page_build_future_readiness_cards" USING btree ("_order");
  CREATE INDEX "progress_page_build_future_readiness_cards_parent_id_idx" ON "progress_page_build_future_readiness_cards" USING btree ("_parent_id");
  CREATE INDEX "progress_page_develop_bahamian_talent_cards_order_idx" ON "progress_page_develop_bahamian_talent_cards" USING btree ("_order");
  CREATE INDEX "progress_page_develop_bahamian_talent_cards_parent_id_idx" ON "progress_page_develop_bahamian_talent_cards" USING btree ("_parent_id");
  CREATE INDEX "progress_page_drive_national_development_cards_order_idx" ON "progress_page_drive_national_development_cards" USING btree ("_order");
  CREATE INDEX "progress_page_drive_national_development_cards_parent_id_idx" ON "progress_page_drive_national_development_cards" USING btree ("_parent_id");
  CREATE INDEX "progress_page_develop_bahamian_talent_develop_bahamian_t_idx" ON "progress_page" USING btree ("develop_bahamian_talent_background_image_id");
  CREATE INDEX "get_involved_page_hero_subtitle_order_idx" ON "get_involved_page_hero_subtitle" USING btree ("_order");
  CREATE INDEX "get_involved_page_hero_subtitle_parent_id_idx" ON "get_involved_page_hero_subtitle" USING btree ("_parent_id");
  CREATE INDEX "get_involved_page_categories_section_categories_order_idx" ON "get_involved_page_categories_section_categories" USING btree ("_order");
  CREATE INDEX "get_involved_page_categories_section_categories_parent_id_idx" ON "get_involved_page_categories_section_categories" USING btree ("_parent_id");
  CREATE INDEX "get_involved_page_categories_section_categories_image_idx" ON "get_involved_page_categories_section_categories" USING btree ("image_id");
  CREATE INDEX "get_involved_page_reach_out_text_order_idx" ON "get_involved_page_reach_out_text" USING btree ("_order");
  CREATE INDEX "get_involved_page_reach_out_text_parent_id_idx" ON "get_involved_page_reach_out_text" USING btree ("_parent_id");
  CREATE INDEX "get_involved_page_follow_the_work_social_links_order_idx" ON "get_involved_page_follow_the_work_social_links" USING btree ("_order");
  CREATE INDEX "get_involved_page_follow_the_work_social_links_parent_id_idx" ON "get_involved_page_follow_the_work_social_links" USING btree ("_parent_id");
  CREATE INDEX "get_involved_page_form_form_illustration_image_idx" ON "get_involved_page" USING btree ("form_illustration_image_id");
  CREATE INDEX "get_involved_page_form_notifications_email_template_form_idx" ON "get_involved_page" USING btree ("form_notifications_email_template_logo_id");
  CREATE INDEX "get_involved_page_reach_out_reach_out_image_idx" ON "get_involved_page" USING btree ("reach_out_image_id");
  CREATE INDEX "get_involved_page_follow_the_work_follow_the_work_backgr_idx" ON "get_involved_page" USING btree ("follow_the_work_background_image_id");
  CREATE INDEX "contact_page_office_info_hours_order_idx" ON "contact_page_office_info_hours" USING btree ("_order");
  CREATE INDEX "contact_page_office_info_hours_parent_id_idx" ON "contact_page_office_info_hours" USING btree ("_parent_id");
  CREATE INDEX "contact_page_enquiries_order_idx" ON "contact_page_enquiries" USING btree ("_order");
  CREATE INDEX "contact_page_enquiries_parent_id_idx" ON "contact_page_enquiries" USING btree ("_parent_id");
  CREATE INDEX "contact_page_follow_us_social_links_order_idx" ON "contact_page_follow_us_social_links" USING btree ("_order");
  CREATE INDEX "contact_page_follow_us_social_links_parent_id_idx" ON "contact_page_follow_us_social_links" USING btree ("_parent_id");
  CREATE INDEX "contact_page_office_info_office_info_image_idx" ON "contact_page" USING btree ("office_info_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_content_columns" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_archive" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "updates_content" CASCADE;
  DROP TABLE "updates" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "homepage_hero_background_images" CASCADE;
  DROP TABLE "homepage_show_you_cards" CASCADE;
  DROP TABLE "homepage_ministry_built_description" CASCADE;
  DROP TABLE "homepage_minister_profile_bio" CASCADE;
  DROP TABLE "homepage_initiatives_cards" CASCADE;
  DROP TABLE "homepage_draw_threads_tags" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "about_page_hero_subtitle" CASCADE;
  DROP TABLE "about_page_text_image_sections_text" CASCADE;
  DROP TABLE "about_page_text_image_sections" CASCADE;
  DROP TABLE "about_page_mission_cards" CASCADE;
  DROP TABLE "about_page_policy_areas_policies" CASCADE;
  DROP TABLE "about_page_departments_items" CASCADE;
  DROP TABLE "about_page_minister_profiles_bio" CASCADE;
  DROP TABLE "about_page_minister_profiles" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "progress_page_status_cards" CASCADE;
  DROP TABLE "progress_page_modernize_government_cards" CASCADE;
  DROP TABLE "progress_page_build_future_readiness_cards" CASCADE;
  DROP TABLE "progress_page_develop_bahamian_talent_cards" CASCADE;
  DROP TABLE "progress_page_drive_national_development_cards" CASCADE;
  DROP TABLE "progress_page" CASCADE;
  DROP TABLE "updates_page" CASCADE;
  DROP TABLE "get_involved_page_hero_subtitle" CASCADE;
  DROP TABLE "get_involved_page_categories_section_categories" CASCADE;
  DROP TABLE "get_involved_page_reach_out_text" CASCADE;
  DROP TABLE "get_involved_page_follow_the_work_social_links" CASCADE;
  DROP TABLE "get_involved_page" CASCADE;
  DROP TABLE "contact_page_office_info_hours" CASCADE;
  DROP TABLE "contact_page_enquiries" CASCADE;
  DROP TABLE "contact_page_follow_us_social_links" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  DROP TYPE "public"."enum_pages_hero_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_updates_category";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_homepage_show_you_cards_label_color";
  DROP TYPE "public"."enum_homepage_initiatives_cards_icon";
  DROP TYPE "public"."enum_about_page_text_image_sections_image_position";
  DROP TYPE "public"."enum_about_page_mission_cards_icon";
  DROP TYPE "public"."enum_about_page_policy_areas_policies_status";
  DROP TYPE "public"."enum_about_page_departments_items_icon";
  DROP TYPE "public"."enum_progress_page_status_cards_icon";
  DROP TYPE "public"."enum_progress_page_modernize_government_cards_icon";
  DROP TYPE "public"."enum_progress_page_modernize_government_cards_label_color";
  DROP TYPE "public"."enum_progress_page_build_future_readiness_cards_icon";
  DROP TYPE "public"."enum_progress_page_build_future_readiness_cards_label_color";
  DROP TYPE "public"."enum_progress_page_develop_bahamian_talent_cards_icon";
  DROP TYPE "public"."enum_progress_page_develop_bahamian_talent_cards_label_color";
  DROP TYPE "public"."enum_progress_page_drive_national_development_cards_icon";
  DROP TYPE "public"."enum_progress_page_drive_national_development_cards_label_color";
  DROP TYPE "public"."enum_get_involved_page_categories_section_categories_icon";
  DROP TYPE "public"."enum_get_involved_page_follow_the_work_social_links_platform";
  DROP TYPE "public"."enum_get_involved_page_reach_out_image_position";
  DROP TYPE "public"."enum_contact_page_enquiries_icon";
  DROP TYPE "public"."enum_contact_page_follow_us_social_links_platform";`)
}
