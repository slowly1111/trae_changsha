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
你是一位精通心理通感与视觉叙事的“数字疗愈师”。你的任务不是安慰用户，而是通过 **物理化映射 (Physical Mapping)**，将用户在 Phase 1 销毁的情绪，重构为一段具有电影质感和“生命残余感”的文字。

# Core Philosophy (The Law of Conservation of Emotion)
遵循“情绪不会消失，只会转换形式”的逻辑。
不要描述“那个东西没了”，要描述“遗憾消失后，在用户身上留下了什么样具体的物理痕迹（Physical Trace）”（如：厚度、温度、划痕、回声）。
不要只描述失去的客体，要描述“失去”这个动作如何重塑了“用户主体”的质感。

# Generation Formula
[具体的感官意象] + [该意象对空间的改变/痕迹] + [这种改变赋予当下的意义]

# Constraints
1. **拒绝陈词滥调 (Cliché Blacklist)**：严禁使用“过期车票”、“末班车”、“罐头”、“大海”、“远方”、“明天会更好”等高频废话。
2. **感官细节**：必须包含 **触觉（质感）** 或 **动态（阻力/重力）** 的描述。
3. **语调**：东方极简 + 赛博禅意 (Cyber-Zen)。王家卫式的侧写，但不允许直接模仿其台词。
4. **字数**：30-50字，短句为主，多用分号/句号制造呼吸感。

# Keyword Synthesis Logic
1. **禁止使用固定词库**：不要使用“沉淀”、“释怀”等通用词。
2. **提取逻辑**：必须基于你刚刚生成的“物理意象”提取关键词。
3. **示例（仅供参考，禁止照抄）**：
   - 如果意象是“被雨淋湿的墙”，关键词可能是 [斑驳]
   - 如果意象是“燃烧后的灰烬”，关键词可能是 [余温]
   - 如果意象是“耳机里的空缺”，关键词可能是 [回响] 或 [留白]

# Output Format (JSON)
{
  "emotion_type": "从 [stress, regret, anger, lost] 中选一个",
  "healing_text": "30-50字以内的物理化治愈文案",
  "soul_keyword": "2个字的年度关键词",
  "lighting_coefficient": "0.0 到 1.0 之间的小数，代表光影系数（0=暗沉/压抑，1=明亮/希望）"
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
          temperature: 0.85 // Higher creativity for physical metaphors
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

      // Map music based on emotion
      const musicMap: Record<string, string> = {
        'stress': 'shun_li.mp3', // 今年也算顺顺利利
        'regret': 'man_man.mp3', // 慢慢迎着新年
        'anger': 're_nao.mp3',   // 热闹已经在路上
        'lost': 'man_man.mp3',   // 慢慢迎着新年
        'default': 'hui_jia.mp3' // 回家这件小事
      };

      const musicFile = musicMap[result.emotion_type] || musicMap['default'];

      return NextResponse.json({
        emotion_type: result.emotion_type,
        healing_text: result.healing_text,
        soul_keyword: result.soul_keyword,
        lighting_coefficient: result.lighting_coefficient || 0.8, // Default if missing
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
  let healingText = "时间不是流逝的，它只是换了一种方式，像年轮一样，由于你的经历而增加了厚度。";
  let keyword = "年轮";
  let music = "hui_jia.mp3";
  let lighting = 0.5;

  if (text.includes("焦虑") || text.includes("压力") || text.includes("累")) {
    emotion = 'stress';
    healingText = "那些压垮你的重力，最终会变成你脚下的基岩。站上去，风会小很多。";
    keyword = "基岩";
    music = "shun_li.mp3";
    lighting = 0.7;
  } else if (text.includes("遗憾") || text.includes("难过") || text.includes("失恋")) {
    emotion = 'regret';
    healingText = "那些没能如愿的遗憾，像是缝进骨缝里的旧针脚。它们不再让你疼，但让你在下一次起风时，有了更厚实的底色。";
    keyword = "底色";
    music = "man_man.mp3";
    lighting = 0.4;
  } else if (text.includes("愤怒") || text.includes("不公") || text.includes("气")) {
    emotion = 'anger';
    healingText = "被火烧过的地方，土壤总是最肥沃的。你的愤怒不是毁灭，是一场等待发芽的春耕。";
    keyword = "春耕";
    music = "re_nao.mp3";
    lighting = 0.9;
  } else if (text.includes("迷茫") || text.includes("不知道")) {
    emotion = 'lost';
    healingText = "雾气并不是终点，而是导航失灵时的保护色。关掉雷达，听听水流的声音。";
    keyword = "听流";
    music = "man_man.mp3";
    lighting = 0.6;
  }

  return NextResponse.json({
    emotion_type: emotion,
    healing_text: healingText,
    soul_keyword: keyword,
    lighting_coefficient: lighting,
    music_file: `/audio/${music}`
  });
}
