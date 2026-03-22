-- ============================================================
-- Migration: program_enrollments v2
-- Adds user_id, scheduled_date, scheduled_time, answers columns
-- Updates status check constraint to include 'pending' and 'enrolled'
--
-- Run in: Supabase Dashboard → SQL Editor → New query
-- Safe to run multiple times (uses IF NOT EXISTS / IF EXISTS guards)
-- ============================================================

-- 1. Add new columns (safe to re-run)
ALTER TABLE program_enrollments
  ADD COLUMN IF NOT EXISTS user_id        UUID    REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS scheduled_date DATE,
  ADD COLUMN IF NOT EXISTS scheduled_time TEXT,
  ADD COLUMN IF NOT EXISTS answers        JSONB   DEFAULT '{}'::jsonb;

-- 2. Drop old status check constraint (only allowed 'active','completed','paused')
ALTER TABLE program_enrollments
  DROP CONSTRAINT IF EXISTS program_enrollments_status_check;

-- 3. Add updated constraint — includes 'pending' and 'enrolled' for the apply flow
ALTER TABLE program_enrollments
  ADD CONSTRAINT program_enrollments_status_check
  CHECK (status IN ('pending', 'enrolled', 'active', 'completed', 'paused'));

-- 4. Add indexes for user/email lookups
CREATE INDEX IF NOT EXISTS program_enrollments_user_id_idx ON program_enrollments (user_id);
CREATE INDEX IF NOT EXISTS program_enrollments_email_idx   ON program_enrollments (email);

-- 5. Verify existing seed rows satisfy the new constraint
--    (any rows with old 'active' status remain valid — 'active' is still in the list)

-- ============================================================
-- DONE — your apply flow can now save:
--   user_id, scheduled_date, scheduled_time, answers, status='enrolled'
-- ============================================================
