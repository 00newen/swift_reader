Project Design Document: Gamified Reading Practice App

1. Overview

This project is a gamified reading practice app designed for children to improve their reading skills through structured practice sessions. The app is meant to be used by both a child and a parent/controller, where the parent interacts with the interface while the child practices reading aloud. The system tracks practice runs, provides visual feedback on progress, and allows users to restore sessions using an 8-character session code.

2. Key Features

## Session & Participant Management

- Session-based tracking: Uses an 8-character session code to store participant data.
- Multiple participants per session: Allows different children to have separate progress tracking.
- Theme selection: Children can select themes like dragons, dinosaurs, unicorns, and fairies to personalize visuals.
- Session expiration: Sessions are deleted after 6 months of inactivity.
- Practice & Progress Tracking
- Levels of progression:
- Letter Recognition
- Syllable Practice
- Word Reading
- Sentence Reading
- Long Words (Unlockable, optional)

## Practice runs: Each run is timed to track improvement.

- Detailed internal tracking: Per-letter, per-syllable, per-word, and per-sentence timing (used internally for adaptive difficulty modes).
- Streak system: Tracks daily practice streaks and longest streak.
- No accuracy tracking: Focuses on speed to encourage improvement.

## User Interface & Experience

- Large, clear buttons: Simplifies interactions for parents and children.
- Simple animations: Enhances user experience.
- Progress overview during practice: Shows completion percentage.
- History tracking: Displays total number of practice runs completed.
- Session code input on the home screen: No modals, ensuring easy access.

## Security & Anti-Cheating Measures

- WebSockets for timing: Uses the server clock to prevent fake time submissions.
- Protection against SQL Injection & XSS attacks.
- No text-to-speech for now.

3. Technology Stack

## Frontend

Framework: React.js
UI Components: ShadCN UI
Animations: CSS & lightweight JS animations
WebSockets: For real-time communication with the backend

## Backend

Framework: Node.js with Express.js
Database: PostgreSQL
Session Management: No authentication, uses session codes
Security: Input sanitization, SQL Injection, and XSS protection
Task Scheduling: Cron job for session cleanup and streak reset

## Hosting & Deployment

Frontend Hosting: Vercel or Railway
Backend Hosting: Railway
Database Hosting: Railway (PostgreSQL)

4. API Endpoints

## Session Management

POST /sessions → Create a new session (returns session code)
GET /sessions/:session_code → Restore session details (also updates last login timestamp)
[Internal] DELETE /sessions/inactive → Cron job to remove old sessions

## Participant Management

GET /sessions/:session_code/participants → List participants
POST /sessions/:session_code/participants → Add a new participant
PATCH /participants/:participant_id/name → Update participant's name
PATCH /participants/:participant_id/theme → Update participant's theme

## Practice Run Management

POST /practice-runs → Start a new practice run
PATCH /practice-runs/:run_id/end → End a practice run (logs total time)
GET /participants/:participant_id/practice-runs → Fetch history of practice runs

## Progress Tracking (Internal Use Only)

POST /progress → Log per-item timing data
GET /participants/:participant_id/difficult-items → Fetch items for special practice

## Statistics & Streaks

GET /participants/:participant_id/stats → Get total runs, streaks, and history
PATCH /participants/:participant_id/streak → Update streak count
[Internal] DELETE /participants/reset-streaks → Cron job to reset streaks after inactivity

## Settings Management

GET /sessions/:session_code/settings → Retrieve session settings
PATCH /sessions/:session_code/settings → Update long word unlock settings

5. Application Flow

# Home Page

Enter or scan session code
Start a new session if no code exists

## Participant Selection Page

Choose or add a participant
Select a theme (optional)

## Practice Run Page

Start practice
Parent clicks "Next" when the child completes an item
Progress bar shows current status
Total time is recorded at the end

## Progress & History Page

Displays streak, total runs, and previous times
Provides insight into improvement trends

6. Additional Considerations

No database backups needed
No leaderboard (focus is on personal improvement)
Optional long words level unlocks dynamically based on settings
This document captures the full scope of the project. Let me know if any refinements are needed! 🚀
