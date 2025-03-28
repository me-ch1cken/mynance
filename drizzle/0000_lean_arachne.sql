CREATE TABLE "tracked_months" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"year" integer NOT NULL,
	"month" varchar(9) NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tracked_month_id" uuid NOT NULL,
	"transaction_type" varchar(8) NOT NULL,
	"amount" numeric NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_tracked_month_id_tracked_months_id_fk" FOREIGN KEY ("tracked_month_id") REFERENCES "public"."tracked_months"("id") ON DELETE no action ON UPDATE no action;