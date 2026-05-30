import type { Question } from '../types';

const questions: Question[] = [
  // ===== EI 维度 (13题) =====
  { id: 1, text: '在社交聚会中，你通常会感到精力充沛、兴致勃勃。', dimension: 'EI', direction: 'E' },
  { id: 2, text: '独处时你更容易恢复精力，长时间社交会让你感到疲惫。', dimension: 'EI', direction: 'I' },
  { id: 3, text: '你更喜欢通过与人讨论来理清自己的思路。', dimension: 'EI', direction: 'E' },
  { id: 4, text: '在开始一个项目前，你倾向于先独自思考而非立即与他人交流。', dimension: 'EI', direction: 'I' },
  { id: 5, text: '认识新朋友对你来说是件令人兴奋的事。', dimension: 'EI', direction: 'E' },
  { id: 6, text: '比起广泛社交，你更珍视与少数密友的深入交流。', dimension: 'EI', direction: 'I' },
  { id: 7, text: '在团队中你经常主动发言，乐于分享自己的想法。', dimension: 'EI', direction: 'E' },
  { id: 8, text: '你倾向于先倾听他人观点，经过深思熟虑后再表达自己的看法。', dimension: 'EI', direction: 'I' },
  { id: 9, text: '电话或面对面交流让你觉得比文字沟通更高效。', dimension: 'EI', direction: 'E' },
  { id: 10, text: '你享受一个人沉浸在自己兴趣爱好中的时光。', dimension: 'EI', direction: 'I' },
  { id: 11, text: '在人群中你会感到兴奋，离开社交场合后依然回味其中的互动。', dimension: 'EI', direction: 'E' },
  { id: 12, text: '当你需要集中注意力时，安静的环境对你来说必不可少。', dimension: 'EI', direction: 'I' },
  { id: 13, text: '你经常会主动发起聚会或活动邀请。', dimension: 'EI', direction: 'E' },

  // ===== SN 维度 (12题) =====
  { id: 14, text: '你更关注具体的事实和细节，而非抽象的概念和理论。', dimension: 'SN', direction: 'S' },
  { id: 15, text: '你经常沉浸在对未来的想象和可能性思考中。', dimension: 'SN', direction: 'N' },
  { id: 16, text: '解决实际问题比思考哲学问题更让你有成就感。', dimension: 'SN', direction: 'S' },
  { id: 17, text: '你喜欢探索事物之间的深层联系和隐藏规律。', dimension: 'SN', direction: 'N' },
  { id: 18, text: '你更相信亲身体验得来的经验，胜过纯粹的理论推理。', dimension: 'SN', direction: 'S' },
  { id: 19, text: '你对新的想法和概念充满好奇，喜欢跳出常规思考问题。', dimension: 'SN', direction: 'N' },
  { id: 20, text: '学习新技能时，你更喜欢跟着示范一步步操作，而非先通读理论。', dimension: 'SN', direction: 'S' },
  { id: 21, text: '你经常会产生"灵光一闪"的顿悟，突然理解事物之间的关联。', dimension: 'SN', direction: 'N' },
  { id: 22, text: '比起创新，你更擅长在现有的方法和流程上不断优化。', dimension: 'SN', direction: 'S' },
  { id: 23, text: '你更享受构思长远规划和大局观，而非处理日常执行的细枝末节。', dimension: 'SN', direction: 'N' },
  { id: 24, text: '当别人谈论抽象理论时，你经常追问"这在实践中怎么用？"', dimension: 'SN', direction: 'S' },
  { id: 25, text: '你相信直觉给你的第一印象，并经常在事后发现直觉是对的。', dimension: 'SN', direction: 'N' },

  // ===== TF 维度 (13题) =====
  { id: 26, text: '做决定时你更依赖逻辑分析而非个人感受。', dimension: 'TF', direction: 'T' },
  { id: 27, text: '你很容易感知到周围人的情绪变化，并会为此调整自己的言行。', dimension: 'TF', direction: 'F' },
  { id: 28, text: '当与他人意见不合时，你会优先捍卫正确的观点，即使可能伤害对方感受。', dimension: 'TF', direction: 'T' },
  { id: 29, text: '维护团队的和谐氛围比坚持自己的观点更重要。', dimension: 'TF', direction: 'F' },
  { id: 30, text: '你认为公平和一致性比照顾个别成员的感受更重要。', dimension: 'TF', direction: 'T' },
  { id: 31, text: '你经常设身处地体会他人处境，在做决定时会考虑对人的影响。', dimension: 'TF', direction: 'F' },
  { id: 32, text: '你能客观分析利弊，对事不对人地处理工作中的问题。', dimension: 'TF', direction: 'T' },
  { id: 33, text: '当看到别人遇到困难时，你会难以抑制想要帮忙的冲动。', dimension: 'TF', direction: 'F' },
  { id: 34, text: '你更信服数据和分析结果，而非感性的个人陈述。', dimension: 'TF', direction: 'T' },
  { id: 35, text: '称赞和认可他人的优点对你来说是件自然而然的事。', dimension: 'TF', direction: 'F' },
  { id: 36, text: '在讨论中你经常担任"唱反调"的角色，帮助大家看到不同角度。', dimension: 'TF', direction: 'T' },
  { id: 37, text: '你觉得多数冲突可以通过有效的沟通和共情来解决。', dimension: 'TF', direction: 'F' },
  { id: 38, text: '面对批评时，你首先分析批评是否有道理，而非感受批评的态度好坏。', dimension: 'TF', direction: 'T' },

  // ===== JP 维度 (12题) =====
  { id: 39, text: '你喜欢提前做好计划，并按计划一步一步执行。', dimension: 'JP', direction: 'J' },
  { id: 40, text: '你享受随性而为的乐趣，不喜欢被死板的日程安排束缚。', dimension: 'JP', direction: 'P' },
  { id: 41, text: '完成任务后再放松会让你更加心安理得。', dimension: 'JP', direction: 'J' },
  { id: 42, text: '你经常同时进行多个事情，在不同任务间灵活切换。', dimension: 'JP', direction: 'P' },
  { id: 43, text: '你倾向于尽早做出决定，避免悬而未决带来的焦虑感。', dimension: 'JP', direction: 'J' },
  { id: 44, text: '你更喜欢保留多种选择，以防出现更好的机会。', dimension: 'JP', direction: 'P' },
  { id: 45, text: '你的桌面和工作空间通常整理得井井有条。', dimension: 'JP', direction: 'J' },
  { id: 46, text: '截止日期临近时的压力感反而能激发你的工作效率。', dimension: 'JP', direction: 'P' },
  { id: 47, text: '你对不确定的事情会感到焦虑，希望尽快有明确的结果。', dimension: 'JP', direction: 'J' },
  { id: 48, text: '计划赶不上变化，你对临时调整和改变持开放态度。', dimension: 'JP', direction: 'P' },
  { id: 49, text: '你重视规则和秩序，认为良好的规范是社会高效运行的基础。', dimension: 'JP', direction: 'J' },
  { id: 50, text: '你认为生命中最美好的事情往往来自意外的惊喜。', dimension: 'JP', direction: 'P' },
];

export default questions;

// 便捷查询映射
export const questionMap = new Map(questions.map((q) => [q.id, q]));

export function getQuestionById(id: number): Question | undefined {
  return questionMap.get(id);
}

export function getDimensionMap(): Map<number, import('../types').Dimension> {
  return new Map(questions.map((q) => [q.id, q.dimension]));
}

export function getDirectionMap(): Map<number, import('../types').Pole> {
  return new Map(questions.map((q) => [q.id, q.direction]));
}

/** Fisher-Yates 洗牌 */
export function shuffleQuestions(): Question[] {
  const arr = [...questions];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
