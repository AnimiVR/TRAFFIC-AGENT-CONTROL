-- =====================================================
-- THÊM NHIỀU MISSIONS ĐỂ TEST CHỨC NĂNG ĐIỂM
-- =====================================================
-- Copy and paste this into Supabase SQL Editor

-- Thêm nhiều missions với các loại khác nhau
INSERT INTO missions (code, title, description, type, location, difficulty, points_reward) VALUES
-- Social Media Missions (1 điểm mỗi cái)
('FB_LIKE', 'Facebook Like Mission', 'Like trang Facebook của chúng tôi', 'Intelligence', 'Facebook', 'Medium', 1),
('TWITTER_FOLLOW', 'Twitter Follow Mission', 'Follow tài khoản Twitter của chúng tôi', 'Intelligence', 'Twitter', 'Medium', 1),
('INSTA_FOLLOW', 'Instagram Follow Mission', 'Follow Instagram và like 3 bài viết', 'Intelligence', 'Instagram', 'Medium', 1),
('YOUTUBE_SUB', 'YouTube Subscribe Mission', 'Subscribe kênh YouTube của chúng tôi', 'Intelligence', 'YouTube', 'Medium', 1),

-- Website Missions (1 điểm mỗi cái)
('WEBSITE_VISIT', 'Website Visit Mission', 'Truy cập trang chủ và ở lại 30 giây', 'Intelligence', 'Website', 'Medium', 1),
('BLOG_READ', 'Blog Read Mission', 'Đọc 1 bài blog và để lại comment', 'Intelligence', 'Blog', 'Medium', 1),
('NEWSLETTER_SIGNUP', 'Newsletter Signup Mission', 'Đăng ký nhận newsletter', 'Intelligence', 'Email', 'Medium', 1),

-- Community Missions (1 điểm mỗi cái)
('DISCORD_JOIN', 'Discord Join Mission', 'Tham gia Discord server của chúng tôi', 'Intelligence', 'Discord', 'Medium', 1),
('TELEGRAM_JOIN', 'Telegram Join Mission', 'Tham gia Telegram channel', 'Intelligence', 'Telegram', 'Medium', 1),

-- Special Missions (2 điểm mỗi cái)
('SURVEY_COMPLETE', 'Survey Complete Mission', 'Hoàn thành khảo sát người dùng', 'Intelligence', 'Survey', 'High', 2),
('FEEDBACK_SUBMIT', 'Feedback Submit Mission', 'Gửi feedback về sản phẩm', 'Intelligence', 'Feedback', 'High', 2),
('REFERRAL_SHARE', 'Referral Share Mission', 'Chia sẻ link với 3 người bạn', 'Intelligence', 'Referral', 'High', 2),

-- Bonus Missions (3 điểm mỗi cái)
('EARLY_ADOPTER', 'Early Adopter Mission', 'Trở thành người dùng đầu tiên', 'Intelligence', 'Platform', 'Critical', 3),
('BETA_TESTER', 'Beta Tester Mission', 'Tham gia test phiên bản beta', 'Intelligence', 'Beta', 'Critical', 3)

ON CONFLICT (code) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  type = EXCLUDED.type,
  location = EXCLUDED.location,
  difficulty = EXCLUDED.difficulty,
  points_reward = EXCLUDED.points_reward;

-- Kiểm tra kết quả
SELECT 'More missions added successfully!' as status;
SELECT COUNT(*) as total_missions FROM missions;
SELECT type, COUNT(*) as count, SUM(points_reward) as total_points 
FROM missions 
GROUP BY type 
ORDER BY total_points DESC;
