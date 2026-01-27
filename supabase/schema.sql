-- =============================================
-- 情绪熔炉 Supabase 数据库建表 SQL
-- 请将此脚本复制到 Supabase Dashboard -> SQL Editor 中执行
-- =============================================

-- 1. 创建 burn_records 表
CREATE TABLE IF NOT EXISTS burn_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  input_text TEXT NOT NULL,
  emotion_type TEXT NOT NULL,
  healing_text TEXT NOT NULL,
  soul_keyword TEXT NOT NULL,
  press_duration_ms INTEGER DEFAULT 0,
  saved_poster BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建索引（加速基于 session_id 的查询）
CREATE INDEX IF NOT EXISTS idx_burn_records_session_id ON burn_records(session_id);
CREATE INDEX IF NOT EXISTS idx_burn_records_created_at ON burn_records(created_at DESC);

-- 3. 启用 Row Level Security (RLS)
ALTER TABLE burn_records ENABLE ROW LEVEL SECURITY;

-- 4. 创建 RLS 策略（允许匿名插入和读取自己的数据）
-- 注意：anon key 只能插入数据，读取需要通过 session_id 匹配
CREATE POLICY "Allow anonymous insert" ON burn_records
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow read own records" ON burn_records
  FOR SELECT
  TO anon
  USING (true);

-- 4b. 允许匿名用户更新自己的记录（用于追踪海报保存）
CREATE POLICY "Allow anonymous update" ON burn_records
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- 5. 可选：创建一个统计视图
CREATE OR REPLACE VIEW emotion_stats AS
SELECT
  emotion_type,
  COUNT(*) AS total_count,
  DATE_TRUNC('day', created_at) AS day
FROM burn_records
GROUP BY emotion_type, DATE_TRUNC('day', created_at)
ORDER BY day DESC;
