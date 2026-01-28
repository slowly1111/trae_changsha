"use client";

/**
 * 移动端音频管理器
 * 解决移动端浏览器对音频自动播放的限制
 * 策略：在第一次用户交互时预加载所有音频
 */

class AudioManager {
    private audioCache: Map<string, HTMLAudioElement> = new Map();
    private isUnlocked = false;

    // 音频文件列表
    private audioFiles = [
        '/audio/fire_burning.wav',
        '/audio/dissolve.wav',
        '/music/healing_piano.mp3',
        '/music/hope_strings.mp3',
        '/music/calm_ambient.mp3',
        '/music/gentle_harp.mp3',
    ];

    /**
     * 在用户首次交互时调用，解锁所有音频
     * 需要在 touchstart/mousedown 等用户手势事件中调用
     */
    unlock() {
        if (this.isUnlocked) return;

        this.audioFiles.forEach(src => {
            const audio = new Audio(src);
            audio.preload = 'auto';
            // 播放一个极短的静音片段来解锁
            audio.volume = 0;
            audio.play().then(() => {
                audio.pause();
                audio.currentTime = 0;
                audio.volume = 1;
                this.audioCache.set(src, audio);
            }).catch(() => {
                // 忽略错误，某些音频可能不存在
                this.audioCache.set(src, audio);
            });
        });

        this.isUnlocked = true;
        console.log('[AudioManager] 音频已解锁');
    }

    /**
     * 播放音频
     */
    play(src: string, options?: { loop?: boolean; volume?: number }) {
        let audio = this.audioCache.get(src);

        if (!audio) {
            audio = new Audio(src);
            this.audioCache.set(src, audio);
        }

        audio.loop = options?.loop ?? false;
        audio.volume = options?.volume ?? 1;
        audio.currentTime = 0;

        return audio.play().catch(e => {
            console.warn('[AudioManager] 播放失败:', src, e);
        });
    }

    /**
     * 获取音频实例（用于更精细控制）
     */
    getAudio(src: string): HTMLAudioElement {
        let audio = this.audioCache.get(src);
        if (!audio) {
            audio = new Audio(src);
            this.audioCache.set(src, audio);
        }
        return audio;
    }

    /**
     * 停止所有音频
     */
    stopAll() {
        this.audioCache.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
}

// 单例导出
export const audioManager = new AudioManager();
