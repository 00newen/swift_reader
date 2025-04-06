CREATE TABLE IF NOT EXISTS "swift-reader_rate_limits" (
  "key" varchar(255) PRIMARY KEY,
  "points" integer NOT NULL,
  "expire" timestamp NOT NULL
); 