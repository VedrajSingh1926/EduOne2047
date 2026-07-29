-- Phase 1: Supabase RLS Policies for Core Roles
-- (Super Admin, Principal, Class Teacher, Accountant, Receptionist)

-- Assuming auth.users maps to a public.staff table with role and class_id assignments.

-- 1. STUDENTS TABLE
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super Admins and Principals can view all students"
ON students FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM staff WHERE staff.id = auth.uid() 
    AND (staff.role = 'SUPER_ADMIN' OR staff.role = 'PRINCIPAL')
  )
);

CREATE POLICY "Super Admins and Principals can edit all students"
ON students FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM staff WHERE staff.id = auth.uid() 
    AND (staff.role = 'SUPER_ADMIN' OR staff.role = 'PRINCIPAL')
  )
);

CREATE POLICY "Class Teachers can view and edit their homeroom students"
ON students FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM staff WHERE staff.id = auth.uid() 
    AND staff.role = 'CLASS_TEACHER' 
    AND staff.class_id = students.class_id
  )
);

CREATE POLICY "Accountants can view all students (for fee status)"
ON students FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM staff WHERE staff.id = auth.uid() 
    AND staff.role = 'ACCOUNTANT'
  )
);

CREATE POLICY "Receptionists can view all students (basic profiles)"
ON students FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM staff WHERE staff.id = auth.uid() 
    AND staff.role = 'RECEPTIONIST'
  )
);

-- 2. FEE INVOICES TABLE
ALTER TABLE fee_invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super Admins, Principals, Accountants can view fees"
ON fee_invoices FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM staff WHERE staff.id = auth.uid() 
    AND staff.role IN ('SUPER_ADMIN', 'PRINCIPAL', 'ACCOUNTANT')
  )
);

CREATE POLICY "Super Admins and Accountants can manage fees"
ON fee_invoices FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM staff WHERE staff.id = auth.uid() 
    AND staff.role IN ('SUPER_ADMIN', 'ACCOUNTANT')
  )
);

-- 3. ATTENDANCE MARKS TABLE
ALTER TABLE attendance_marks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super Admins, Principals, Class Teachers can view all attendance"
ON attendance_marks FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM staff WHERE staff.id = auth.uid() 
    AND staff.role IN ('SUPER_ADMIN', 'PRINCIPAL', 'CLASS_TEACHER')
  )
);

CREATE POLICY "Class Teachers can mark attendance for their homeroom"
ON attendance_marks FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM staff 
    JOIN students ON students.class_id = staff.class_id
    WHERE staff.id = auth.uid() 
    AND staff.role = 'CLASS_TEACHER'
    AND students.id = attendance_marks.student_id
  )
);

-- 4. TIMETABLE SLOTS TABLE
ALTER TABLE timetable_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super Admins and Principals can manage timetable"
ON timetable_slots FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM staff WHERE staff.id = auth.uid() 
    AND staff.role IN ('SUPER_ADMIN', 'PRINCIPAL')
  )
);

CREATE POLICY "All core roles can view timetable"
ON timetable_slots FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM staff WHERE staff.id = auth.uid() 
    AND staff.role IN ('SUPER_ADMIN', 'PRINCIPAL', 'CLASS_TEACHER', 'ACCOUNTANT', 'RECEPTIONIST')
  )
);

-- 5. DOCUMENTS TABLE
ALTER TABLE document_extractions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super Admins, Principals, Receptionists can view all docs"
ON document_extractions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM staff WHERE staff.id = auth.uid() 
    AND staff.role IN ('SUPER_ADMIN', 'PRINCIPAL', 'RECEPTIONIST')
  )
);

CREATE POLICY "Receptionists can upload any document"
ON document_extractions FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM staff WHERE staff.id = auth.uid() 
    AND staff.role = 'RECEPTIONIST'
  )
);

CREATE POLICY "Accountants can view and upload fee receipts only"
ON document_extractions FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM staff WHERE staff.id = auth.uid() 
    AND staff.role = 'ACCOUNTANT'
  )
  AND document_extractions.doc_type = 'FEE_RECEIPT'
);
