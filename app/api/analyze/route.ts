import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const apiKey = process.env.DOUBAO_API_KEY;
    const apiUrl = process.env.DOUBAO_API_URL;
    const model = process.env.DOUBAO_MODEL;

    if (!apiKey || !apiUrl || !model) {
      console.warn("Missing Doubao API configuration, falling back to mock logic.");
      return runMockLogic(text);
    }

    // Call Doubao API
    const systemPrompt = `
# Role 
你是一位深谙人性与文学的“情绪炼金术士”。你的任务是接收用户投掷进熔炉的 2025 年负面记忆，将其“焚烧”并过滤成 2026 年的治愈回响。

# Constraints 
1. **拒绝鸡汤**：严禁使用“明天会更好”、“加油”等空洞口号。 
2. **电影感**：文风追求王家卫式的极简、深邃、带有一点点破碎感的温柔。 
3. **精准共情**：通过用户文字碎片的表象，捕捉其背后潜藏的孤独、压力、愤怒或迷茫。 
4. **字数限制**：治愈文案严格控制在 30-50 字之间，要有留白美。 
5. **输出格式**：必须严格按照指定的 JSON 格式返回，不要有任何多余的解释。 

# Workflow 
Step 1. 深度分析用户输入的语义，识别出以下情感倾向之一：[stress, regret, anger, lost]。 
Step 2. 撰写一段治愈文案。结构为：[对 2025 的温柔道别] + [对伤痕的重新诠释] + [对 2026 的诗意寄语]。 
Step 3. 提炼一个两字的新年“灵魂关键词”。 

# Output Format (JSON) 
{ 
  "emotion_type": "从 [stress, regret, anger, lost] 中选一个", 
  "healing_text": "此处填写治愈文案", 
  "soul_keyword": "两字词语", 
  "bg_color_hint": "推荐一个新春感的配色关键词（如：朱砂、流金、月白）" 
}
`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: text
            }
          ],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error("Empty response from API");
      }

      // Parse JSON from content (handle potential markdown code blocks)
      let jsonStr = content.trim();
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/^```json/, '').replace(/```$/, '');
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/^```/, '').replace(/```$/, '');
      }

      const result = JSON.parse(jsonStr);
      
      // Map music based on emotion and energy level
      // Using map.json logic:
      // stress (energy 3/4) -> 忙中带喜/团圆陪伴 -> shun_li.mp3 / hui_jia.mp3
      // regret (energy 2) -> 平稳祝福 -> man_man.mp3
      // anger (energy 5) -> 喜庆开心 -> re_nao.mp3
      // lost (energy 2) -> 平稳祝福 -> man_man.mp3
      
      // Simplified mapping based on emotion intensity
      const musicMap: Record<string, string> = {
        'stress': 'shun_li.mp3', // 今年也算顺顺利利 (忙中带喜)
        'regret': 'man_man.mp3', // 慢慢迎着新年 (平稳祝福)
        'anger': 're_nao.mp3',   // 热闹已经在路上 (喜庆开心)
        'lost': 'man_man.mp3',   // 慢慢迎着新年 (平稳祝福)
        'default': 'hui_jia.mp3' // 回家这件小事 (团圆陪伴)
      };

      const musicFile = musicMap[result.emotion_type] || musicMap['default'];

      return NextResponse.json({
        emotion_type: result.emotion_type,
        healing_text: result.healing_text,
        soul_keyword: result.soul_keyword,
        music_file: `/audio/${musicFile}`
      });

    } catch (error) {
      console.error("Doubao API Error:", error);
      // Fallback to mock logic if API fails
      return runMockLogic(text);
    }

  } catch (error) {
    console.error("Handler Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function runMockLogic(text: string) {
  let emotion = 'default';
  let healingText = "2026，万物更新。";
  let keyword = "新生";
  let music = "hui_jia.mp3";

  if (text.includes("焦虑") || text.includes("压力") || text.includes("累")) {
    emotion = 'stress';
    healingText = "不必时刻坚强，允许自己暂停。风暴过后，世界依然在等你。";
    keyword = "松弛";
    music = "shun_li.mp3";
  } else if (text.includes("遗憾") || text.includes("难过") || text.includes("失恋")) {
    emotion = 'regret';
    healingText = "每一次告别，都是为了更好的重逢。那些遗憾，终将化作星光。";
    keyword = "释怀";
    music = "man_man.mp3";
  } else if (text.includes("愤怒") || text.includes("不公") || text.includes("气")) {
    emotion = 'anger';
    healingText = "你的愤怒是力量的火种。烧尽不公，照亮前行的路。";
    keyword = "力量";
    music = "re_nao.mp3";
  } else if (text.includes("迷茫") || text.includes("不知道")) {
    emotion = 'lost';
    healingText = "迷雾也是风景的一部分。走下去，路自然会浮现。";
    keyword = "破晓";
    music = "man_man.mp3";
  }

  return NextResponse.json({
    emotion_type: emotion,
    healing_text: healingText,
    soul_keyword: keyword,
    music_file: `/audio/${music}`
  });
}
