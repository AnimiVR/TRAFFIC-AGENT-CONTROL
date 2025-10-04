# 🎯 Hướng dẫn tùy chỉnh Missions

## 📋 Tổng quan
Hệ thống missions đã được cấu hình để **click "Join Mission" = có điểm ngay lập tức**. Không cần chờ đợi hay hoàn thành gì thêm.

## 🚀 Cách hoạt động hiện tại

### 1. **User Experience**
- User click "Join Mission" 
- ✅ Nhận điểm ngay lập tức
- ✅ Mission chuyển sang trạng thái "Completed"
- ✅ Hiển thị thông báo thành công với số điểm

### 2. **Điểm số**
- **Easy missions**: 1 điểm
- **Critical missions**: 2 điểm  
- **Survey/Research**: 2 điểm

## 🛠️ Cấu hình Missions mới

### A. Thêm Mission trong Code (SimpleMissionService.ts)

```typescript
// Trong file: lib/simpleMissionService.ts
// Thêm vào mảng getSampleMissions():

{ 
  code: 'YOUR_CODE', 
  description: 'Mô tả nhiệm vụ của bạn', 
  type: 'Social Media', 
  location: 'Facebook', 
  difficulty: 'Easy', 
  points_reward: 1 
}
```

### B. Thêm Mission trong Database (Supabase)

1. **Mở Supabase SQL Editor**
2. **Chạy file**: `setup-simple-missions.sql`
3. **Hoặc thêm trực tiếp**:

```sql
INSERT INTO missions (code, description, type, location, difficulty, points_reward) VALUES
('YOUR_CODE', 'Mô tả nhiệm vụ', 'Type', 'Location', 'Easy', 1)
ON CONFLICT (code) DO UPDATE SET
  description = EXCLUDED.description,
  points_reward = EXCLUDED.points_reward;
```

## 📝 Ví dụ Missions đơn giản

### Social Media Missions
```sql
-- Facebook
('FB_LIKE_POST', 'Like bài viết mới nhất trên Facebook', 'Social Media', 'Facebook', 'Easy', 1),
('FB_SHARE', 'Share bài viết về dự án', 'Social Media', 'Facebook', 'Easy', 1),

-- Twitter  
('TWITTER_FOLLOW', 'Follow tài khoản Twitter', 'Social Media', 'Twitter', 'Easy', 1),
('TWITTER_LIKE', 'Like 3 tweet mới nhất', 'Social Media', 'Twitter', 'Easy', 1),

-- Instagram
('INSTA_STORY', 'Share story về dự án', 'Social Media', 'Instagram', 'Easy', 1),
('INSTA_COMMENT', 'Comment trên 2 bài viết', 'Social Media', 'Instagram', 'Easy', 1)
```

### Website Missions
```sql
-- Website tasks
('VISIT_HOMEPAGE', 'Truy cập trang chủ và ở lại 30 giây', 'Website', 'Homepage', 'Easy', 1),
('READ_BLOG', 'Đọc 1 bài blog và comment', 'Website', 'Blog', 'Easy', 1),
('DOWNLOAD_APP', 'Download ứng dụng mobile', 'Website', 'App Store', 'Easy', 2)
```

### Community Missions
```sql
-- Discord
('DISCORD_INTRO', 'Giới thiệu bản thân trong #introductions', 'Community', 'Discord', 'Easy', 1),
('DISCORD_REACT', 'React với 5 emoji khác nhau', 'Community', 'Discord', 'Easy', 1),

-- Telegram
('TG_SHARE', 'Share link Telegram với 3 người bạn', 'Community', 'Telegram', 'Easy', 2)
```

## 🎨 Tùy chỉnh UI

### Thay đổi màu sắc theo loại mission
Trong `OperationsList.tsx`, bạn có thể thêm:

```typescript
const getTypeColor = (type: string) => {
  switch (type) {
    case 'Social Media': return 'text-blue-400';
    case 'Community': return 'text-green-400';
    case 'Website': return 'text-purple-400';
    case 'Marketing': return 'text-yellow-400';
    case 'Research': return 'text-red-400';
    default: return 'text-gray-400';
  }
};
```

### Thêm icon cho từng loại mission
```typescript
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Social Media': return '📱';
    case 'Community': return '👥';
    case 'Website': return '🌐';
    case 'Marketing': return '📢';
    case 'Research': return '🔍';
    default: return '🎯';
  }
};
```

## 📊 Theo dõi hiệu quả

### Xem thống kê missions
```sql
-- Tổng số missions theo loại
SELECT type, COUNT(*) as count, SUM(points_reward) as total_points 
FROM missions 
GROUP BY type 
ORDER BY total_points DESC;

-- Missions được join nhiều nhất
SELECT m.code, m.description, COUNT(um.id) as join_count
FROM missions m
LEFT JOIN user_missions um ON m.id = um.mission_id
GROUP BY m.id, m.code, m.description
ORDER BY join_count DESC;
```

## 🔧 Troubleshooting

### Mission không hiển thị
1. Kiểm tra `getSampleMissions()` có chứa mission code
2. Refresh trang web
3. Kiểm tra console log

### Không nhận được điểm
1. Kiểm tra user đã login chưa
2. Kiểm tra localStorage có `currentUser`
3. Kiểm tra console log lỗi

### Database không sync
1. Chạy lại `setup-simple-missions.sql`
2. Kiểm tra Supabase connection
3. Kiểm tra RLS policies

## 🎯 Tips tối ưu

1. **Điểm số hợp lý**: 1-2 điểm cho tasks đơn giản
2. **Mô tả rõ ràng**: User hiểu ngay phải làm gì
3. **Đa dạng loại**: Mix social media, website, community
4. **Cập nhật thường xuyên**: Thêm missions mới mỗi tuần
5. **Theo dõi engagement**: Xem missions nào được join nhiều nhất
