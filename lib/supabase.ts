import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 创建 Supabase 客户端（前端可用）
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Session ID 管理（匿名用户标识）
const SESSION_KEY = 'furnace_session_id';

export function getSessionId(): string {
    if (typeof window === 'undefined') return '';

    let sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
}

// ------------------- 数据库操作 -------------------

export interface BurnRecord {
    id?: string;
    session_id: string;
    input_text: string;
    emotion_type: string;
    healing_text: string;
    soul_keyword: string;
    press_duration_ms: number;
    saved_poster: boolean;
    created_at?: string;
}

/**
 * 保存一次"焚烧"记录
 */
export async function saveBurnRecord(record: Omit<BurnRecord, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('burn_records')
        .insert([record])
        .select()
        .single();

    if (error) {
        console.error('Failed to save burn record:', error);
        return null;
    }
    return data;
}

/**
 * 更新海报保存状态
 */
export async function updatePosterSaved(recordId: string) {
    const { error } = await supabase
        .from('burn_records')
        .update({ saved_poster: true })
        .eq('id', recordId);

    if (error) {
        console.error('Failed to update poster status:', error);
    }
}

/**
 * 获取用户的历史记录
 */
export async function getUserHistory(sessionId: string) {
    const { data, error } = await supabase
        .from('burn_records')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Failed to fetch history:', error);
        return [];
    }
    return data;
}

/**
 * 获取用户统计数据
 */
export async function getUserStats(sessionId: string) {
    const { data, error } = await supabase
        .from('burn_records')
        .select('emotion_type, soul_keyword')
        .eq('session_id', sessionId);

    if (error) {
        console.error('Failed to fetch stats:', error);
        return null;
    }

    // 计算情绪分布
    const emotionCounts: Record<string, number> = {};
    const keywords: string[] = [];

    data.forEach((record) => {
        emotionCounts[record.emotion_type] = (emotionCounts[record.emotion_type] || 0) + 1;
        keywords.push(record.soul_keyword);
    });

    return {
        totalBurns: data.length,
        emotionDistribution: emotionCounts,
        keywords,
    };
}
