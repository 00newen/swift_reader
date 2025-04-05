CREATE TYPE "public"."item_type" AS ENUM('letter', 'syllable', 'word', 'sentence');--> statement-breakpoint
CREATE TYPE "public"."language" AS ENUM('en', 'es', 'nl');--> statement-breakpoint
CREATE TABLE "swift-reader_letters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"language" "language",
	"character" varchar(1),
	"difficulty_level" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "swift-reader_participants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid,
	"name" varchar(255),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "swift-reader_practice_run_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"practice_run_id" uuid,
	"participant_id" uuid,
	"item_id" uuid,
	"item_type" "item_type",
	"attempts" integer DEFAULT 1,
	"time_taken" integer,
	"is_correct" boolean,
	"completed_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "swift-reader_practice_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid,
	"started_at" timestamp DEFAULT now(),
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "swift-reader_sentences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"language" "language",
	"sentence" text,
	"difficulty_level" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "swift-reader_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(8),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "swift-reader_sessions_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "swift-reader_syllables" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"language" "language",
	"syllable" varchar(10),
	"difficulty_level" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "swift-reader_words" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"language" "language",
	"word" varchar(255),
	"difficulty_level" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "swift-reader_participants" ADD CONSTRAINT "swift-reader_participants_session_id_swift-reader_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."swift-reader_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "swift-reader_practice_run_results" ADD CONSTRAINT "swift-reader_practice_run_results_practice_run_id_swift-reader_practice_runs_id_fk" FOREIGN KEY ("practice_run_id") REFERENCES "public"."swift-reader_practice_runs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "swift-reader_practice_run_results" ADD CONSTRAINT "swift-reader_practice_run_results_participant_id_swift-reader_participants_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."swift-reader_participants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "swift-reader_practice_runs" ADD CONSTRAINT "swift-reader_practice_runs_session_id_swift-reader_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."swift-reader_sessions"("id") ON DELETE cascade ON UPDATE no action;