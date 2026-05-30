import type { Question, Dimension } from '../types';

const allQuestions: Question[] = [
  // ===== EI 维度 (25题) =====
  // 正向E(高分→E倾向)
  { id: 1, text: '在社交聚会中，你通常会感到精力充沛、兴致勃勃。', dimension: 'EI', direction: 'E' },
  { id: 2, text: '你更喜欢通过与人讨论来理清自己的思路。', dimension: 'EI', direction: 'E' },
  { id: 3, text: '认识新朋友对你来说是件令人兴奋的事。', dimension: 'EI', direction: 'E' },
  { id: 4, text: '在团队中你经常主动发言，乐于分享自己的想法。', dimension: 'EI', direction: 'E' },
  { id: 5, text: '电话或面对面交流让你觉得比文字沟通更高效。', dimension: 'EI', direction: 'E' },
  { id: 6, text: '在人群中你会感到兴奋，离开社交场合后依然很回味其中的互动。', dimension: 'EI', direction: 'E' },
  { id: 7, text: '你经常会主动发起聚会或活动邀请。', dimension: 'EI', direction: 'E' },
  { id: 8, text: '和一群人一起头脑风暴比独自思考更能激发你的灵感。', dimension: 'EI', direction: 'E' },
  { id: 9, text: '遇到困难时，你倾向于找人倾诉和讨论。', dimension: 'EI', direction: 'E' },
  { id: 10, text: '你对周围人的动态和社交信息保持高度关注。', dimension: 'EI', direction: 'E' },
  { id: 11, text: '在安静的图书馆待一整天，会让你感到压抑和无聊。', dimension: 'EI', direction: 'E' },
  { id: 12, text: '你喜欢通过行动和交谈来探索问题，而非静坐思考。', dimension: 'EI', direction: 'E' },
  // 正向I(高分→I倾向)
  { id: 13, text: '独处时你更容易恢复精力，长时间社交会让你感到疲惫。', dimension: 'EI', direction: 'I' },
  { id: 14, text: '在开始一个项目前，你倾向于先独自思考而非立即与他人交流。', dimension: 'EI', direction: 'I' },
  { id: 15, text: '比起广泛社交，你更珍视与少数密友的深入交流。', dimension: 'EI', direction: 'I' },
  { id: 16, text: '你倾向于先倾听他人观点，经过深思熟虑后再表达自己的看法。', dimension: 'EI', direction: 'I' },
  { id: 17, text: '你享受一个人沉浸在自己兴趣爱好中的时光。', dimension: 'EI', direction: 'I' },
  { id: 18, text: '当你需要集中注意力时，安静的环境对你来说必不可少。', dimension: 'EI', direction: 'I' },
  { id: 19, text: '在大型社交活动后，你需要独处一段时间来恢复状态。', dimension: 'EI', direction: 'I' },
  { id: 20, text: '文字表达往往能让你组织出比口头表达更精确的想法。', dimension: 'EI', direction: 'I' },
  { id: 21, text: '你有一两个深交的朋友，胜过拥有一大群泛泛之交。', dimension: 'EI', direction: 'I' },
  { id: 22, text: '相比热闹的派对，一个安静的夜晚更让你感到满足。', dimension: 'EI', direction: 'I' },
  { id: 23, text: '和陌生人闲聊对你来说是一件消耗心力的事情。', dimension: 'EI', direction: 'I' },
  { id: 24, text: '你更喜欢通过阅读来获取知识，而非参加讲座或研讨会。', dimension: 'EI', direction: 'I' },
  { id: 25, text: '独自旅行或独自散步对你来说是放松和充电的好方式。', dimension: 'EI', direction: 'I' },

  // ===== SN 维度 (25题) =====
  // 正向S
  { id: 26, text: '你更关注具体的事实和细节，而非抽象的概念和理论。', dimension: 'SN', direction: 'S' },
  { id: 27, text: '解决实际问题比思考哲学问题更让你有成就感。', dimension: 'SN', direction: 'S' },
  { id: 28, text: '你更相信亲身体验得来的经验，胜过纯粹的理论推理。', dimension: 'SN', direction: 'S' },
  { id: 29, text: '学习新技能时，你更喜欢跟着示范一步步操作，而非先通读理论。', dimension: 'SN', direction: 'S' },
  { id: 30, text: '比起创新，你更擅长在现有的方法和流程上不断优化。', dimension: 'SN', direction: 'S' },
  { id: 31, text: '当别人谈论抽象理论时，你经常追问"这在实践中怎么用？"', dimension: 'SN', direction: 'S' },
  { id: 32, text: '你更习惯按步骤执行任务，不太喜欢跳来跳去的灵活方式。', dimension: 'SN', direction: 'S' },
  { id: 33, text: '描述事物时你倾向于使用具体、明确的细节而非概括性的表达。', dimension: 'SN', direction: 'S' },
  { id: 34, text: '看到一个新设备时，你先研究它的功能按钮，而非想象它还能做什么。', dimension: 'SN', direction: 'S' },
  { id: 35, text: '你对过去经历中的具体细节记忆犹新。', dimension: 'SN', direction: 'S' },
  { id: 36, text: '你认为一鸟在手胜于二鸟在林。', dimension: 'SN', direction: 'S' },
  { id: 37, text: '你偏好使用久经考验的方法，而不是尝试尚未验证的新思路。', dimension: 'SN', direction: 'S' },
  // 正向N
  { id: 38, text: '你经常沉浸在对未来的想象和可能性思考中。', dimension: 'SN', direction: 'N' },
  { id: 39, text: '你喜欢探索事物之间的深层联系和隐藏规律。', dimension: 'SN', direction: 'N' },
  { id: 40, text: '你对新的想法和概念充满好奇，喜欢跳出常规思考问题。', dimension: 'SN', direction: 'N' },
  { id: 41, text: '你经常会产生"灵光一闪"的顿悟，突然理解事物之间的关联。', dimension: 'SN', direction: 'N' },
  { id: 42, text: '你更享受构思长远规划和大局观，而非处理日常执行的细枝末节。', dimension: 'SN', direction: 'N' },
  { id: 43, text: '你相信直觉给你的第一印象，并经常在事后发现直觉是对的。', dimension: 'SN', direction: 'N' },
  { id: 44, text: '你时常在脑海中演绎各种"如果…会怎样"的情境。', dimension: 'SN', direction: 'N' },
  { id: 45, text: '比起重复性的工作，你更喜欢需要创意和想象力的任务。', dimension: 'SN', direction: 'N' },
  { id: 46, text: '一篇文章里，你往往更关注作者的核心思想和隐喻，而非具体数据和事实。', dimension: 'SN', direction: 'N' },
  { id: 47, text: '你喜欢通过类比和比喻来解释复杂的概念。', dimension: 'SN', direction: 'N' },
  { id: 48, text: '现有的做事方式让你感到束缚，你总是想尝试全新的方法。', dimension: 'SN', direction: 'N' },
  { id: 49, text: '别人形容你"充满想象力"或"经常做白日梦"。', dimension: 'SN', direction: 'N' },
  { id: 50, text: '你对符号、隐喻和象征意义很敏感，能从中获得深刻的理解。', dimension: 'SN', direction: 'N' },

  // ===== TF 维度 (25题) =====
  // 正向T
  { id: 51, text: '做决定时你更依赖逻辑分析而非个人感受。', dimension: 'TF', direction: 'T' },
  { id: 52, text: '当与他人意见不合时，你会优先捍卫正确的观点，即使可能伤害对方感受。', dimension: 'TF', direction: 'T' },
  { id: 53, text: '你认为公平和一致性比照顾个别成员的感受更重要。', dimension: 'TF', direction: 'T' },
  { id: 54, text: '你能客观分析利弊，对事不对人地处理工作中的问题。', dimension: 'TF', direction: 'T' },
  { id: 55, text: '你更信服数据和分析结果，而非感性的个人陈述。', dimension: 'TF', direction: 'T' },
  { id: 56, text: '在讨论中你经常担任"唱反调"的角色，帮助大家看到不同角度。', dimension: 'TF', direction: 'T' },
  { id: 57, text: '面对批评时，你首先分析批评是否有道理，而非感受批评的态度好坏。', dimension: 'TF', direction: 'T' },
  { id: 58, text: '当团队需要做出艰难决策时，你不会因为顾及情面而回避必要的选择。', dimension: 'TF', direction: 'T' },
  { id: 59, text: '你对"为什么这个方案行得通/行不通"抱有强烈的好奇心。', dimension: 'TF', direction: 'T' },
  { id: 60, text: '别人有情绪时，你倾向于帮他们分析问题原因，而非先给予安慰。', dimension: 'TF', direction: 'T' },
  { id: 61, text: '你认为多数问题可以通过清晰的逻辑分析找到最优解。', dimension: 'TF', direction: 'T' },
  { id: 62, text: '在评估一个方案时，你会列出优缺点清单再做判断。', dimension: 'TF', direction: 'T' },
  // 正向F
  { id: 63, text: '你很容易感知到周围人的情绪变化，并会为此调整自己的言行。', dimension: 'TF', direction: 'F' },
  { id: 64, text: '维护团队的和谐氛围比坚持自己的观点更重要。', dimension: 'TF', direction: 'F' },
  { id: 65, text: '你经常设身处地体会他人处境，在做决定时会考虑对人的影响。', dimension: 'TF', direction: 'F' },
  { id: 66, text: '当看到别人遇到困难时，你会难以抑制想要帮忙的冲动。', dimension: 'TF', direction: 'F' },
  { id: 67, text: '称赞和认可他人的优点对你来说是件自然而然的事。', dimension: 'TF', direction: 'F' },
  { id: 68, text: '你觉得多数冲突可以通过有效的沟通和共情来解决。', dimension: 'TF', direction: 'F' },
  { id: 69, text: '你更难接受一个正确但会让某人受伤的决定。', dimension: 'TF', direction: 'F' },
  { id: 70, text: '在做决定时，你会情不自禁地想"这样做会不会伤害到谁？"', dimension: 'TF', direction: 'F' },
  { id: 71, text: '一个好的领导首先应该关心下属的成长和幸福感。', dimension: 'TF', direction: 'F' },
  { id: 72, text: '当朋友情绪低落时，你最擅长的是倾听和共情，而非给出建议。', dimension: 'TF', direction: 'F' },
  { id: 73, text: '与团队一起庆祝小成就，在你看来和工作本身同样重要。', dimension: 'TF', direction: 'F' },
  { id: 74, text: '你很难对有困难的人说"不"，即使这会给你带来不便。', dimension: 'TF', direction: 'F' },
  { id: 75, text: '你的很多决定都受到个人价值观的强烈指导。', dimension: 'TF', direction: 'F' },

  // ===== JP 维度 (25题) =====
  // 正向J
  { id: 76, text: '你喜欢提前做好计划，并按计划一步一步执行。', dimension: 'JP', direction: 'J' },
  { id: 77, text: '完成任务后再放松会让你更加心安理得。', dimension: 'JP', direction: 'J' },
  { id: 78, text: '你倾向于尽早做出决定，避免悬而未决带来的焦虑感。', dimension: 'JP', direction: 'J' },
  { id: 79, text: '你的桌面和工作空间通常整理得井井有条。', dimension: 'JP', direction: 'J' },
  { id: 80, text: '你对不确定的事情会感到焦虑，希望尽快有明确的结果。', dimension: 'JP', direction: 'J' },
  { id: 81, text: '你重视规则和秩序，认为良好的规范是社会高效运行的基础。', dimension: 'JP', direction: 'J' },
  { id: 82, text: '你习惯使用待办清单、日历等工具来管理日常生活。', dimension: 'JP', direction: 'J' },
  { id: 83, text: '旅行前你会做详细的攻略，觉得随性乱逛缺乏安全感。', dimension: 'JP', direction: 'J' },
  { id: 84, text: '一个项目完成后，你做的第一件事是总结经验教训以便将来参考。', dimension: 'JP', direction: 'J' },
  { id: 85, text: '当计划被打乱时，你会感到烦躁和不适。', dimension: 'JP', direction: 'J' },
  { id: 86, text: '你认为准时是对他人最基本的尊重。', dimension: 'JP', direction: 'J' },
  { id: 87, text: '你倾向于把大任务拆解为小步骤，逐一攻克。', dimension: 'JP', direction: 'J' },
  // 正向P
  { id: 88, text: '你享受随性而为的乐趣，不喜欢被死板的日程安排束缚。', dimension: 'JP', direction: 'P' },
  { id: 89, text: '你经常同时进行多个事情，在不同任务间灵活切换。', dimension: 'JP', direction: 'P' },
  { id: 90, text: '你更喜欢保留多种选择，以防出现更好的机会。', dimension: 'JP', direction: 'P' },
  { id: 91, text: '截止日期临近时的压力感反而能激发你的工作效率。', dimension: 'JP', direction: 'P' },
  { id: 92, text: '计划赶不上变化，你对临时调整和改变持开放态度。', dimension: 'JP', direction: 'P' },
  { id: 93, text: '你认为生命中最美好的事情往往来自意外的惊喜。', dimension: 'JP', direction: 'P' },
  { id: 94, text: '你的工作方式更偏向于"灵感来了就猛干一阵"，而非每天固定推进。', dimension: 'JP', direction: 'P' },
  { id: 95, text: '做决定对你来说很纠结，总是觉得再多看看可能还有更好的选择。', dimension: 'JP', direction: 'P' },
  { id: 96, text: '你不会因为房间有点乱而感到焦虑，反而觉得这才有生活气息。', dimension: 'JP', direction: 'P' },
  { id: 97, text: '相比按部就班地完成任务，你更喜欢有自由发挥空间的工作。', dimension: 'JP', direction: 'P' },
  { id: 98, text: '在旅行中迷路对你来说是一种有趣的探索，而非令人焦虑的意外。', dimension: 'JP', direction: 'P' },
  { id: 99, text: '你经常在截止日期前才开始认真投入，并且总是能在最后关头完成。', dimension: 'JP', direction: 'P' },
  { id: 100, text: '你认为过度规划会扼杀创造力和生活的意外之喜。', dimension: 'JP', direction: 'P' },

  // ===== 补充: EI (10题) =====
  { id: 101, text: '你发现自己经常主动和陌生人开启对话。', dimension: 'EI', direction: 'E' },
  { id: 102, text: '在咖啡厅工作时，周围有人反而让你更加专注。', dimension: 'EI', direction: 'E' },
  { id: 103, text: '你在表达想法时倾向于边说边组织，而不是先想好再说。', dimension: 'EI', direction: 'E' },
  { id: 104, text: '网络社交让你感到充实，你花很多时间与人线上互动。', dimension: 'EI', direction: 'E' },
  { id: 105, text: '收到消息后你会尽快回复，不喜欢延迟沟通。', dimension: 'EI', direction: 'E' },
  { id: 106, text: '独自完成一项大工程后，你并不太需要与人分享庆祝。', dimension: 'EI', direction: 'I' },
  { id: 107, text: '你对社交媒体的使用比较克制，更偏好一对一的聊天。', dimension: 'EI', direction: 'I' },
  { id: 108, text: '在接受邀请前，你通常会犹豫要不要去、去了待多久。', dimension: 'EI', direction: 'I' },
  { id: 109, text: '写日记或写博客是你整理内心想法的重要方式。', dimension: 'EI', direction: 'I' },
  { id: 110, text: '比起在会议上即兴发言，你更愿意提交一份深思熟虑的文档。', dimension: 'EI', direction: 'I' },

  // ===== 补充: SN (10题) =====
  { id: 111, text: '你在阅读说明书之前，会先凭直觉动手尝试。', dimension: 'SN', direction: 'N' },
  { id: 112, text: '比起现有的成熟方案，你总是被新的可能性所吸引。', dimension: 'SN', direction: 'N' },
  { id: 113, text: '你看电影时更关注主题和隐喻，而非剧情的具体细节。', dimension: 'SN', direction: 'N' },
  { id: 114, text: '你更相信数据和报表，对灵感/顿悟持保留态度。', dimension: 'SN', direction: 'S' },
  { id: 115, text: '做菜时你严格按照食谱，不会随意调整配料比例。', dimension: 'SN', direction: 'S' },
  { id: 116, text: '你更信任有多年经验的老手，而非嘴上说着"新思路"的新人。', dimension: 'SN', direction: 'S' },
  { id: 117, text: '你经常想到一个创意然后马上就去做，不会先调研可行性。', dimension: 'SN', direction: 'N' },
  { id: 118, text: '你对抽象艺术的理解更多来自直观感受而非理性分析。', dimension: 'SN', direction: 'N' },
  { id: 119, text: '你喜欢用拍照或录音来记录生活中的具体瞬间。', dimension: 'SN', direction: 'S' },
  { id: 120, text: '复述一件事情时，你会尽可能精确地还原所有细节。', dimension: 'SN', direction: 'S' },

  // ===== 补充: TF (10题) =====
  { id: 121, text: '朋友向你倾诉烦恼时，你的第一反应是帮他分析问题症结。', dimension: 'TF', direction: 'T' },
  { id: 122, text: '你很难理解为什么有人会因为"不好意思"而不去争取应得的权益。', dimension: 'TF', direction: 'T' },
  { id: 123, text: '你对人与人的情绪流动很敏感，能感觉到空气中微妙的气氛变化。', dimension: 'TF', direction: 'F' },
  { id: 124, text: '团建活动中有人被冷落时，你会主动去关心那个人。', dimension: 'TF', direction: 'F' },
  { id: 125, text: '面对一笔不合理的收费，你会据理力争，不论对方态度如何。', dimension: 'TF', direction: 'T' },
  { id: 126, text: '看了感人电影后，你常常眼眶湿润且不觉得难为情。', dimension: 'TF', direction: 'F' },
  { id: 127, text: '即便团队方案不是最优，但如果团队很用心你也不忍推翻。', dimension: 'TF', direction: 'F' },
  { id: 128, text: '你在做决策时会画决策树，而不是凭内心的感觉来选。', dimension: 'TF', direction: 'T' },
  { id: 129, text: '你买礼物时会花很多心思揣摩对方真正喜欢什么。', dimension: 'TF', direction: 'F' },
  { id: 130, text: '当朋友做出不理性的选择时，你会忍不住指出逻辑漏洞。', dimension: 'TF', direction: 'T' },

  // ===== 补充: JP (10题) =====
  { id: 131, text: '即使到了周末，你也会大致规划好一天要做什么。', dimension: 'JP', direction: 'J' },
  { id: 132, text: '朋友临时约你今晚吃饭，你很乐意调整原有的安排。', dimension: 'JP', direction: 'P' },
  { id: 133, text: '你在开始一项工作前会先把桌面整理干净。', dimension: 'JP', direction: 'J' },
  { id: 134, text: '你买东西很少货比三家，看中就下手不等更好的。', dimension: 'JP', direction: 'P' },
  { id: 135, text: '你不知道周末要干什么，但相信到时候自然会有安排。', dimension: 'JP', direction: 'P' },
  { id: 136, text: '你把所有重要的日子（生日、纪念日）都记在日历上。', dimension: 'JP', direction: 'J' },
  { id: 137, text: '你讨厌被催促，更喜欢按照自己的节奏来做事。', dimension: 'JP', direction: 'P' },
  { id: 138, text: '你在开始新工作前，会要求所有流程和规则都明确清楚。', dimension: 'JP', direction: 'J' },
  { id: 139, text: '你的阅读方式是跳着读、看感兴趣的部分，而非从头到尾。', dimension: 'JP', direction: 'P' },
  { id: 140, text: '三个月的旅行计划对你来说太遥远了，你更倾向于说走就走。', dimension: 'JP', direction: 'P' },
];

export default allQuestions;

export const questionMap = new Map(allQuestions.map((q) => [q.id, q]));

export function getQuestionById(id: number): Question | undefined {
  return questionMap.get(id);
}

export function getDirectionMap(): Map<number, import('../types').Pole> {
  return new Map(allQuestions.map((q) => [q.id, q.direction]));
}

export function getDimensionMap(): Map<number, Dimension> {
  return new Map(allQuestions.map((q) => [q.id, q.dimension]));
}

/** 从题库中随机抽取指定数量的题目，保证四维度均衡 */
export function pickQuestions(count: number = 50): Question[] {
  const dimensions: Dimension[] = ['EI', 'SN', 'TF', 'JP'];
  const perDim = Math.floor(count / dimensions.length); // 12
  const remainder = count % dimensions.length; // 2

  const picked: Question[] = [];

  for (let i = 0; i < dimensions.length; i++) {
    const dim = dimensions[i];
    const pool = allQuestions.filter((q) => q.dimension === dim);
    const n = perDim + (i < remainder ? 1 : 0);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    picked.push(...shuffled.slice(0, n));
  }

  // 最终打乱顺序
  return picked.sort(() => Math.random() - 0.5);
}

// 兼容旧 API: 返回50题
export function shuffleQuestions(count: number = 50): Question[] {
  return pickQuestions(count);
}
