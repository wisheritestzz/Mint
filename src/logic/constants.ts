import type { Dimension, Pole } from '../types';

// 维度 → 左右极对应关系
export const DIMENSION_POLES: Record<Dimension, { left: Pole; right: Pole }> = {
  EI: { left: 'E', right: 'I' },
  SN: { left: 'S', right: 'N' },
  TF: { left: 'T', right: 'F' },
  JP: { left: 'J', right: 'P' },
};

// 维度中文名
export const DIMENSION_LABELS: Record<Dimension, string> = {
  EI: '精力来源',
  SN: '信息获取',
  TF: '决策方式',
  JP: '生活态度',
};

// 极向中文
export const POLE_LABELS: Record<Pole, string> = {
  E: '外倾 Extraversion',
  I: '内倾 Introversion',
  S: '实感 Sensing',
  N: '直觉 Intuition',
  T: '思考 Thinking',
  F: '情感 Feeling',
  J: '判断 Judging',
  P: '感知 Perceiving',
};

// MBTI 类型元数据
export interface TypeMeta {
  type: string;
  tag: string;
  color: string;
  description: string;
  dimensions: string;
}

const TYPE_DATA: Record<string, Omit<TypeMeta, 'type'>> = {
  INTJ: {
    tag: '战略建筑师',
    color: '#1a365d',
    description: '你拥有强大的系统思维和长远规划能力，善于制定策略并坚定执行。你享受深度思考，对复杂问题有天然的洞察力，独立且自律，在追求目标的路上从不轻言放弃。',
    dimensions: '内倾 · 直觉 · 思考 · 判断',
  },
  INTP: {
    tag: '逻辑探索者',
    color: '#1e3a5f',
    description: '你拥有旺盛的求知欲和卓越的逻辑分析能力，热衷于探索事物背后的原理。你思维灵活开放，善于从不同角度审视问题，享受智力挑战带来的乐趣。',
    dimensions: '内倾 · 直觉 · 思考 · 感知',
  },
  ENTJ: {
    tag: '果断指挥官',
    color: '#153e75',
    description: '你天生具备领导魅力，善于制定宏伟蓝图并高效组织资源实现目标。你决策果断、行动力强，在复杂局面中能迅速抓住重点，带领团队走向成功。',
    dimensions: '外倾 · 直觉 · 思考 · 判断',
  },
  ENTP: {
    tag: '创新辩论家',
    color: '#2a4365',
    description: '你思维敏捷、创意无限，善于发现问题并快速提出创新解决方案。你享受思想碰撞的过程，口才出众，对新事物保持高度好奇心，是天然的机会发现者。',
    dimensions: '外倾 · 直觉 · 思考 · 感知',
  },
  INFJ: {
    tag: '心灵引路人',
    color: '#276749',
    description: '你拥有深刻的洞察力和强烈的同理心，善于理解他人内心世界。你怀抱理想主义，致力于让世界变得更美好，是安静而坚定的变革推动者。',
    dimensions: '内倾 · 直觉 · 情感 · 判断',
  },
  INFP: {
    tag: '理想主义诗人',
    color: '#2f855a',
    description: '你内心充盈着丰富的价值观和坚定的信念，追求真实与意义。你拥有强大的共情能力和创造力，用独特的视角感受世界，是温和而执着的梦想家。',
    dimensions: '内倾 · 直觉 · 情感 · 感知',
  },
  ENFJ: {
    tag: '魅力引导者',
    color: '#22543d',
    description: '你天生善于感知他人的需求与潜力，是富有感召力的引导者。你善于凝聚人心、激发团队热情，在帮助他人成长的过程中获得最大的成就感。',
    dimensions: '外倾 · 直觉 · 情感 · 判断',
  },
  ENFP: {
    tag: '热情梦想家',
    color: '#38a169',
    description: '你充满热情与创造力，总是看到生活中的无限可能性。你善于与人建立深度连接，用乐观和真诚感染身边的人，是自由奔放的灵魂探索者。',
    dimensions: '外倾 · 直觉 · 情感 · 感知',
  },
  ISTJ: {
    tag: '可靠守护者',
    color: '#2d3748',
    description: '你务实可靠、一丝不苟，是团队中最值得信赖的中坚力量。你重视规则与秩序，做事有条不紊，用实际行动兑现每一个承诺。',
    dimensions: '内倾 · 实感 · 思考 · 判断',
  },
  ISFJ: {
    tag: '温暖守护者',
    color: '#4a5568',
    description: '你温柔细腻、默默付出，用行动守护身边每一个人。你注重细节、责任感强，在安静中展现着坚不可摧的力量，是人群中最温暖的后盾。',
    dimensions: '内倾 · 实感 · 情感 · 判断',
  },
  ESTJ: {
    tag: '高效管理者',
    color: '#1a202c',
    description: '你是天生的组织者，善于制定清晰的目标并有条不紊地推进执行。你注重效率与结果，在管理和统筹方面展现出色才能，是团队不可或缺的支柱。',
    dimensions: '外倾 · 实感 · 思考 · 判断',
  },
  ESFJ: {
    tag: '贴心协调者',
    color: '#2d3748',
    description: '你热情周到、善于照顾他人感受，是维护和谐氛围的大师。你重视人际关系，乐于为他人提供实际帮助，在服务他人的过程中找到自己的价值。',
    dimensions: '外倾 · 实感 · 情感 · 判断',
  },
  ISTP: {
    tag: '冷静实干家',
    color: '#9c4221',
    description: '你冷静理性、动手能力强，善于在关键时刻快速分析问题并付诸行动。你享受动手实践带来的成就感，在危机中反而能展现出超乎寻常的沉着。',
    dimensions: '内倾 · 实感 · 思考 · 感知',
  },
  ISFP: {
    tag: '细腻艺术家',
    color: '#c05621',
    description: '你拥有敏锐的审美感知和丰富的内心世界，用独特的方式体验和表达美。你温和谦逊、活在当下，在安静中蕴藏着惊人的创造力和对生活真挚的热爱。',
    dimensions: '内倾 · 实感 · 情感 · 感知',
  },
  ESTP: {
    tag: '敏锐行动派',
    color: '#dd6b20',
    description: '你精力充沛、行动力极强，善于把握当下机会快速出手。你现实敏锐、临场应变能力出众，是天生的危机处理专家和在瞬息万变中抢占先机的人。',
    dimensions: '外倾 · 实感 · 思考 · 感知',
  },
  ESFP: {
    tag: '快乐表演家',
    color: '#ed8936',
    description: '你天生是人群中的开心果，用热情和幽默感染每一个身边的人。你热爱生活、享受当下，善于发现生活中的美好瞬间，是轻松愉快的能量供给站。',
    dimensions: '外倾 · 实感 · 情感 · 感知',
  },
};

export function getTypeMeta(type: string): TypeMeta {
  const data = TYPE_DATA[type];
  if (!data) throw new Error(`Unknown MBTI type: ${type}`);
  return { type, ...data };
}

// 维度解读文案
export const DIMENSION_INTERPRETATION: Record<Dimension, Record<string, string>> = {
  EI: {
    E: '你倾向于从外部世界和社交互动中汲取能量。与人相处让你感到充实和活力充沛，你乐于分享想法，在群体讨论中思维更加活跃。你喜欢先行动再思考，拥有广泛的兴趣爱好和社交圈。',
    I: '你倾向于从内心世界和独处中获取能量。安静的环境让你深度思考，你注重内心体验的质量胜过外部刺激的丰富。你倾向于先思考再行动，喜欢深入探索少数真正感兴趣的领域。',
  },
  SN: {
    S: '你倾向于关注具体、现实的信息，相信眼见为实。你注重细节和实际经验，善于运用已知的方法解决当前问题。你喜欢循序渐进的工作方式，对抽象理论的关注度相对较低。',
    N: '你倾向于关注事物的整体模式和未来可能性。你喜欢探索新想法，善于在不同信息之间建立联系，对抽象概念和理论性讨论有浓厚兴趣。你更关注"可能是什么"而非"现在是什么"。',
  },
  TF: {
    T: '你做决策时倾向于依靠逻辑和客观分析。你重视公平和一致性，擅长分析利弊、找出最优解决方案。你相信真理和原则的力量，在决策时往往将客观标准放在个人感受之上。',
    F: '你做决策时倾向于考虑价值观和对人的影响。你重视和谐与共情，善于站在不同角度看问题。你相信情感的价值，在决策时会充分考虑相关人员的感受和需求。',
  },
  JP: {
    J: '你倾向于有计划、有条理的生活方式。你喜欢明确的时间表和清晰的规则，在完成任务的过程中获得满足感。你注重效率和结果导向，倾向于尽快做出决定以减少不确定性。',
    P: '你倾向于灵活、开放、顺其自然的生活方式。你喜欢保留选择的空间，享受过程中的探索和发现。你适应当下、乐于接受变化，认为截止日期更多是一种参考而非铁律。',
  },
};

// 所有MBTI类型列表
export const ALL_TYPES = Object.keys(TYPE_DATA);
