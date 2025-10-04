-- =====================================================
-- FIX MISSIONS - SỬ DỤNG GIÁ TRỊ HỢP LỆ
-- =====================================================
-- Copy and paste this into Supabase SQL Editor

-- Xóa toàn bộ missions hiện tại
DELETE FROM user_missions;
DELETE FROM missions;

-- Thêm cột points_reward nếu chưa có
ALTER TABLE missions ADD COLUMN IF NOT EXISTS points_reward INTEGER DEFAULT 1;

-- Chỉ tạo 1 mission đơn giản với các giá trị hợp lệ
-- Sử dụng các giá trị difficulty có thể chấp nhận được
INSERT INTO missions (code, title, description, type, location, difficulty, points_reward) VALUES
('CLICK_MISSION', 'Simple Click Mission', 'Click vào nút Join Mission để nhận điểm', 'Simple', 'Website', 'Low', 1);

-- Kiểm tra kết quả
SELECT 'Missions reset completed!' as status;
SELECT COUNT(*) as mission_count FROM missions;
SELECT code, title, description, type, difficulty, points_reward FROM missions;
