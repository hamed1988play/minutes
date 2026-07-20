CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  organization text,
  email text NOT NULL,
  phone text,
  subject text NOT NULL DEFAULT 'سایر',
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_contact_submissions" ON contact_submissions FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "select_contact_submissions" ON contact_submissions FOR SELECT
  TO authenticated USING (true);
