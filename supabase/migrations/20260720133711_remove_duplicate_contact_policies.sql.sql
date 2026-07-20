-- Remove duplicate policies created by the second redundant migration.
-- Keep the complete CRUD policy set from the first migration.
DROP POLICY IF EXISTS "insert_contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "select_contact_submissions" ON contact_submissions;

-- Verify the remaining policy set is complete (insert/select/update/delete for authenticated, insert for anon).
SELECT policyname, cmd, roles
FROM pg_policies
WHERE tablename = 'contact_submissions'
ORDER BY cmd;