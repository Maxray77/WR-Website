CREATE TYPE "public"."email_kind" AS ENUM('confirmed', 'waitlisted', 'promoted', 'cancelled', 'screening_cancelled', 'reminder');--> statement-breakpoint
CREATE TYPE "public"."registration_source" AS ENUM('online', 'manual');--> statement-breakpoint
CREATE TYPE "public"."registration_status" AS ENUM('confirmed', 'waitlisted', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."screening_status" AS ENUM('draft', 'published', 'cancelled', 'completed');--> statement-breakpoint
CREATE TABLE "email_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"registration_id" uuid,
	"to" text NOT NULL,
	"kind" "email_kind" NOT NULL,
	"provider_id" text,
	"error" text,
	"sent_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"screening_id" uuid NOT NULL,
	"reference" text NOT NULL,
	"manage_token" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"seats" integer DEFAULT 1 NOT NULL,
	"status" "registration_status" DEFAULT 'confirmed' NOT NULL,
	"source" "registration_source" DEFAULT 'online' NOT NULL,
	"notes" text,
	"checked_in_at" timestamp with time zone,
	"confirmed_at" timestamp with time zone,
	"cancelled_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "screenings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text DEFAULT 'All That Breathes' NOT NULL,
	"city" text NOT NULL,
	"venue_name" text NOT NULL,
	"venue_address" text NOT NULL,
	"map_url" text,
	"starts_at" timestamp with time zone NOT NULL,
	"doors_open_at" timestamp with time zone,
	"capacity" integer NOT NULL,
	"max_seats_per_booking" integer DEFAULT 4 NOT NULL,
	"waitlist_enabled" boolean DEFAULT true NOT NULL,
	"description" text,
	"poster_url" text,
	"attendee_notes" text,
	"status" "screening_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "email_log" ADD CONSTRAINT "email_log_registration_id_registrations_id_fk" FOREIGN KEY ("registration_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_screening_id_screenings_id_fk" FOREIGN KEY ("screening_id") REFERENCES "public"."screenings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "email_log_registration_idx" ON "email_log" USING btree ("registration_id");--> statement-breakpoint
CREATE UNIQUE INDEX "registrations_reference_idx" ON "registrations" USING btree ("reference");--> statement-breakpoint
CREATE INDEX "registrations_screening_idx" ON "registrations" USING btree ("screening_id");--> statement-breakpoint
CREATE INDEX "registrations_status_idx" ON "registrations" USING btree ("screening_id","status");--> statement-breakpoint
CREATE INDEX "registrations_created_idx" ON "registrations" USING btree ("screening_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "registrations_one_live_per_email_idx" ON "registrations" USING btree ("screening_id",lower("email")) WHERE "registrations"."status" <> 'cancelled';--> statement-breakpoint
CREATE UNIQUE INDEX "screenings_slug_idx" ON "screenings" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "screenings_starts_at_idx" ON "screenings" USING btree ("starts_at");--> statement-breakpoint
CREATE INDEX "screenings_status_idx" ON "screenings" USING btree ("status");