-- =====================================================
-- KIỂM TRA CONSTRAINTS CỦA BẢNG MISSIONS
-- =====================================================
-- Copy and paste this into Supabase SQL Editor để xem constraints

-- Xem tất cả constraints của bảng missions
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'missions'::regclass;

-- Xem cấu trúc bảng missions
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'missions' 
ORDER BY ordinal_position;
