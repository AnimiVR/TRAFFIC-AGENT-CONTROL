-- =====================================================
-- RESET MISSIONS - CHỈ MỘT MISSION ĐƠN GIẢN
-- =====================================================
-- Copy and paste this into Supabase SQL Editor

-- Xóa toàn bộ missions hiện tại
DELETE FROM user_missions;
DELETE FROM missions;

-- Thêm cột points_reward nếu chưa có
ALTER TABLE missions ADD COLUMN IF NOT EXISTS points_reward INTEGER DEFAULT 1;

-- Chỉ tạo 1 mission đơn giản
INSERT INTO missions (code, description, type, location, difficulty, points_reward) VALUES
('CLICK_MISSION', 'Click vào nút Join Mission để nhận điểm', 'Simple', 'Website', 'Easy', 1);

-- Kiểm tra kết quả
SELECT 'Missions reset completed!' as status;
SELECT COUNT(*) as mission_count FROM missions;
SELECT code, description, type, points_reward FROM missions;
