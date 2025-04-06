import { pgTable, pgTableCreator, uuid, varchar, timestamp, integer, boolean, text, pgEnum } from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `swift-reader_${name}`);

// Enum for supported languages
export const languageEnum = pgEnum('language', ['en', 'es', 'nl']);
export const itemTypeEnum = pgEnum('item_type', ['letter', 'syllable', 'word', 'sentence']);

// Sessions Table
export const sessions = createTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 8 }).unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Participants Table
export const participants = createTable('participants', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => sessions.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// Practice Runs Table
export const practiceRuns = createTable('practice_runs', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => sessions.id, { onDelete: 'cascade' }),
  startedAt: timestamp('started_at').defaultNow(),
  completedAt: timestamp('completed_at'),
});

// Practice Items Tables
export const letters = createTable('letters', {
  id: uuid('id').primaryKey().defaultRandom(),
  language: languageEnum('language'),
  character: varchar('character', { length: 1 }),
  difficultyLevel: integer('difficulty_level'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const syllables = createTable('syllables', {
  id: uuid('id').primaryKey().defaultRandom(),
  language: languageEnum('language'),
  syllable: varchar('syllable', { length: 10 }),
  difficultyLevel: integer('difficulty_level'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const words = createTable('words', {
  id: uuid('id').primaryKey().defaultRandom(),
  language: languageEnum('language'),
  word: varchar('word', { length: 255 }),
  difficultyLevel: integer('difficulty_level'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sentences = createTable('sentences', {
  id: uuid('id').primaryKey().defaultRandom(),
  language: languageEnum('language'),
  sentence: text('sentence'),
  difficultyLevel: integer('difficulty_level'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Practice Run Results Table
export const practiceRunResults = createTable('practice_run_results', {
  id: uuid('id').primaryKey().defaultRandom(),
  practiceRunId: uuid('practice_run_id').references(() => practiceRuns.id, { onDelete: 'cascade' }),
  participantId: uuid('participant_id').references(() => participants.id, { onDelete: 'cascade' }),
  itemId: uuid('item_id'),
  itemType: itemTypeEnum('item_type'),
  attempts: integer('attempts').default(1),
  timeTaken: integer('time_taken'),
  isCorrect: boolean('is_correct'),
  completedAt: timestamp('completed_at').defaultNow(),
});

// Rate Limiting Table
export const rateLimits = createTable('rate_limits', {
  key: varchar('key', { length: 255 }).primaryKey(),
  points: integer('points').notNull(),
  expire: timestamp('expire').notNull(),
});
