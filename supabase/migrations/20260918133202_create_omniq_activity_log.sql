/*
# Create OmniQ activity log table

1. Purpose
   OmniQ is a single-tenant AI dashboard with 4 tools (Smart Search, Vision Lens,
   Logo/Poster Generator, Video-to-Shorts). This table stores a history of user
   interactions with each tool so results can be reviewed later.

2. New Tables
   - `omniq_activity_log`
     - `id` (uuid, primary key, auto-generated)
     - `tool` (text, not null) — which tool was used: 'search' | 'vision' | 'generate' | 'video'
     - `prompt` (text, not null) — the user's input prompt or query
     - `result` (jsonb) — the structured response returned by the API
     - `created_at` (timestamptz, defaults to now())

3. Security
   - Enable RLS on `omniq_activity_log`.
   - Single-tenant app with no sign-in screen, so allow anon + authenticated full CRUD
     (the data is intentionally shared/public within the app).

4. Indexes
   - Index on `created_at` DESC for fast history retrieval.
   - Index on `tool` for filtering by mode.
*/

CREATE TABLE IF NOT EXISTS omniq_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool text NOT NULL CHECK (tool IN ('search', 'vision', 'generate', 'video')),
  prompt text NOT NULL,
  result jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE omniq_activity_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_activity" ON omniq_activity_log;
CREATE POLICY "anon_select_activity" ON omniq_activity_log
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_activity" ON omniq_activity_log;
CREATE POLICY "anon_insert_activity" ON omniq_activity_log
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_activity" ON omniq_activity_log;
CREATE POLICY "anon_update_activity" ON omniq_activity_log
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_activity" ON omniq_activity_log;
CREATE POLICY "anon_delete_activity" ON omniq_activity_log
  FOR DELETE TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_omniq_activity_created_at
  ON omniq_activity_log (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_omniq_activity_tool
  ON omniq_activity_log (tool);
