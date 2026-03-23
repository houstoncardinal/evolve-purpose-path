-- ============================================================
-- Migration v3: teaching_submissions + community_memberships
-- Run in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ─── Teaching Submissions ─────────────────────────────────────
-- Stores 1:1 graduate teaching video submissions (Step 4 of L.A.T.T.)
CREATE TABLE IF NOT EXISTS teaching_submissions (
  id              UUID      PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID      REFERENCES auth.users(id) ON DELETE SET NULL,
  email           TEXT,
  name            TEXT,
  video_url       TEXT      NOT NULL,
  taught_name     TEXT,
  taught_what     TEXT,
  taught_result   TEXT,
  reflection      TEXT,
  status          TEXT      NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'approved', 'needs_revision')),
  reviewer_notes  TEXT,
  submitted_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS teaching_submissions_user_id_idx ON teaching_submissions (user_id);
CREATE INDEX IF NOT EXISTS teaching_submissions_status_idx  ON teaching_submissions (status);

-- ─── Community Memberships ────────────────────────────────────
-- Tracks active $9.99/month subscriptions + product-granted access
CREATE TABLE IF NOT EXISTS community_memberships (
  id                      UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                 UUID    REFERENCES auth.users(id) ON DELETE SET NULL,
  email                   TEXT    NOT NULL,
  status                  TEXT    NOT NULL DEFAULT 'active'
                          CHECK (status IN ('active', 'cancelled', 'product_granted', 'trial')),
  stripe_subscription_id  TEXT,
  stripe_customer_id      TEXT,
  amount_cents            INTEGER DEFAULT 999,
  period_start            TIMESTAMPTZ,
  period_end              TIMESTAMPTZ,
  created_at              TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS community_memberships_user_id_idx ON community_memberships (user_id);
CREATE INDEX IF NOT EXISTS community_memberships_email_idx   ON community_memberships (email);
CREATE INDEX IF NOT EXISTS community_memberships_status_idx  ON community_memberships (status);

-- ─── RLS ──────────────────────────────────────────────────────
ALTER TABLE teaching_submissions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_memberships ENABLE ROW LEVEL SECURITY;

-- Authenticated users can insert their own teaching submissions
CREATE POLICY "auth_insert_teaching_submission"
  ON teaching_submissions FOR INSERT TO authenticated
  WITH CHECK (true);

-- Users can read their own submissions
CREATE POLICY "auth_select_own_teaching_submission"
  ON teaching_submissions FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Users can insert their own membership (created by webhook/app)
CREATE POLICY "auth_insert_own_membership"
  ON community_memberships FOR INSERT TO authenticated
  WITH CHECK (true);

-- Users can read their own membership status
CREATE POLICY "auth_select_own_membership"
  ON community_memberships FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Admins full access
CREATE POLICY "admins_full_teaching_submissions"
  ON teaching_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admins_full_community_memberships"
  ON community_memberships FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- DONE
-- New env var needed in Netlify:
--   STRIPE_COMMUNITY_PRICE_ID = price_... (from Stripe Dashboard)
-- ============================================================
