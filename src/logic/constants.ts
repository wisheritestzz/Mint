import type { Dimension, Pole } from '../types';

// 维度 → 左右极对应关系
export const DIMENSION_POLES: Record<Dimension, { left: Pole; right: Pole }> = {
  EI: { left: 'E', right: 'I' },
  SN: { left: 'S', right: 'N' },
  TF: { left: 'T', right: 'F' },
  JP: { left: 'J', right: 'P' },
};

// 维度名
export const DIMENSION_LABELS: Record<Dimension, string> = {
  EI: '精力来源', SN: '信息获取', TF: '决策方式', JP: '生活态度',
};
export const DIMENSION_LABELS_EN: Record<Dimension, string> = {
  EI: 'Energy', SN: 'Information', TF: 'Decisions', JP: 'Lifestyle',
};

// 极向名
export const POLE_LABELS: Record<Pole, string> = {
  E: '外倾 Extraversion', I: '内倾 Introversion', S: '实感 Sensing', N: '直觉 Intuition',
  T: '思考 Thinking', F: '情感 Feeling', J: '判断 Judging', P: '感知 Perceiving',
};
export const POLE_LABELS_EN: Record<Pole, string> = {
  E: 'Extraversion', I: 'Introversion', S: 'Sensing', N: 'Intuition',
  T: 'Thinking', F: 'Feeling', J: 'Judging', P: 'Perceiving',
};

export function getDimLabel(dim: Dimension, lang?: string): string {
  return lang === 'en' ? DIMENSION_LABELS_EN[dim] : DIMENSION_LABELS[dim];
}
export function getPoleLabel(pole: Pole, lang?: string): string {
  return lang === 'en' ? POLE_LABELS_EN[pole] : POLE_LABELS[pole];
}
export function getPoleShort(pole: Pole): string {
  return pole; // E, I, S, N, T, F, J, P - same in both languages
}

// MBTI 类型元数据
export interface TypeMeta {
  type: string;
  tag: string;
  color: string;
  description: string;
  dimensions: string;
  behaviors: string[];
  strengths: string;
  careers: string;
}

interface TypeData {
  tag: string;
  color: string;
  description: string;
  descriptionEn: string;
  dimensions: string;
  dimensionsEn: string;
  behaviors: string[];
  behaviorsEn: string[];
  strengths: string;
  strengthsEn: string;
  careers: string;
  careersEn: string;
}

const TYPE_DATA: Record<string, TypeData> = {
  INTJ: {
    tag: '战略建筑师', color: '#1a365d',
    description: '你拥有强大的系统思维和长远规划能力，善于制定策略并坚定执行。你享受深度思考，对复杂问题有天然的洞察力，独立且自律，在追求目标的路上从不轻言放弃。',
    descriptionEn: 'You possess powerful systems thinking and long-term planning abilities, excelling at crafting strategies and executing them with determination. You enjoy deep thinking, have a natural insight into complex problems, and are independent and self-disciplined.',
    dimensions: '内倾 · 直觉 · 思考 · 判断',
    dimensionsEn: 'Introverted · Intuitive · Thinking · Judging',
    behaviors: ['习惯为未来5年做详细规划并一步步执行', '面对复杂问题时先画出思维导图理清逻辑', '对他人的情绪化表达感到不适，更倾向于理性分析', '喜欢独自钻研艰深的理论，享受智力挑战'],
    behaviorsEn: ['Makes detailed 5-year plans and follows through step by step', 'Draws mind maps to clarify logic when facing complex problems', 'Feels uncomfortable with emotional expressions, prefers rational analysis', 'Enjoys diving deep into difficult theories alone'],
    strengths: '战略规划 · 独立思考 · 系统思维 · 高度自律',
    strengthsEn: 'Strategic planning · Independent thinking · Systems thinking · Self-discipline',
    careers: '科学家、工程师、战略顾问、律师、架构师',
    careersEn: 'Scientist, Engineer, Strategy Consultant, Lawyer, Architect',
  },
  INTP: {
    tag: '逻辑探索者', color: '#1e3a5f',
    description: '你拥有旺盛的求知欲和卓越的逻辑分析能力，热衷于探索事物背后的原理。你思维灵活开放，善于从不同角度审视问题，享受智力挑战带来的乐趣。',
    descriptionEn: 'You have an intense curiosity and exceptional logical analysis skills, passionate about exploring the principles behind things. Your thinking is flexible and open, and you enjoy examining problems from different angles.',
    dimensions: '内倾 · 直觉 · 思考 · 感知',
    dimensionsEn: 'Introverted · Intuitive · Thinking · Perceiving',
    behaviors: ['对感兴趣的话题会花数小时深入研究和学习', '习惯质疑权威观点，用逻辑推导自己的结论', '在讨论中经常提出"如果换个角度会怎样"的问题', '喜欢拆解复杂系统，理解其底层运行机制'],
    behaviorsEn: ['Spends hours researching topics of interest', 'Questions authority and derives conclusions through logic', 'Often asks "what if we look at it differently?"', 'Enjoys deconstructing complex systems to understand them'],
    strengths: '逻辑分析 · 创新思维 · 知识渊博 · 客观理性',
    strengthsEn: 'Logical analysis · Creative thinking · Knowledgeable · Objective rationality',
    careers: '程序员、数学家、哲学家、数据分析师、研究员',
    careersEn: 'Programmer, Mathematician, Philosopher, Data Analyst, Researcher',
  },
  ENTJ: {
    tag: '果断指挥官', color: '#153e75',
    description: '你天生具备领导魅力，善于制定宏伟蓝图并高效组织资源实现目标。你决策果断、行动力强，在复杂局面中能迅速抓住重点，带领团队走向成功。',
    descriptionEn: 'You possess natural leadership charisma, excelling at creating bold visions and efficiently organizing resources to achieve goals. You make decisive calls and act quickly, leading teams to success in complex situations.',
    dimensions: '外倾 · 直觉 · 思考 · 判断',
    dimensionsEn: 'Extraverted · Intuitive · Thinking · Judging',
    behaviors: ['在团队陷入混乱时站出来分配任务、制定计划', '面对分歧时快速权衡利弊做出决断', '习惯用效率和结果衡量一切，讨厌拖延和低效', '主动承担领导角色，推动项目向前发展'],
    behaviorsEn: ['Steps up to organize and delegate when the team is in chaos', 'Quickly weighs pros and cons when facing disagreements', 'Measures everything by efficiency and results, hates delays', 'Actively takes on leadership roles to move projects forward'],
    strengths: '领导力 · 战略眼光 · 决策果断 · 高效执行',
    strengthsEn: 'Leadership · Strategic vision · Decisiveness · Efficient execution',
    careers: 'CEO、企业家、管理顾问、法官、投资银行家',
    careersEn: 'CEO, Entrepreneur, Management Consultant, Judge, Investment Banker',
  },
  ENTP: {
    tag: '创新辩论家', color: '#2a4365',
    description: '你思维敏捷、创意无限，善于发现问题并快速提出创新解决方案。你享受思想碰撞的过程，口才出众，对新事物保持高度好奇心，是天然的机会发现者。',
    descriptionEn: 'You are quick-witted and endlessly creative, skilled at spotting problems and proposing innovative solutions. You enjoy intellectual sparring, have excellent debating skills, and maintain a keen curiosity for new things.',
    dimensions: '外倾 · 直觉 · 思考 · 感知',
    dimensionsEn: 'Extraverted · Intuitive · Thinking · Perceiving',
    behaviors: ['喜欢头脑风暴，五分钟内能想出十个新点子', '在辩论中切换立场来测试自己想法的坚固程度', '经常同时开展多个项目，享受多样性和新鲜感', '擅长将看似无关的概念联系起来创造新方案'],
    behaviorsEn: ['Loves brainstorming — can generate ten ideas in five minutes', 'Switches sides in debates to stress-test their own ideas', 'Often juggles multiple projects, enjoying variety and novelty', 'Excels at connecting seemingly unrelated concepts'],
    strengths: '创新思维 · 口才辩论 · 适应力强 · 机会洞察',
    strengthsEn: 'Creative thinking · Debate skills · Adaptability · Opportunity spotting',
    careers: '创业者、产品经理、律师、记者、广告创意总监',
    careersEn: 'Entrepreneur, Product Manager, Lawyer, Journalist, Creative Director',
  },
  INFJ: {
    tag: '心灵引路人', color: '#276749',
    description: '你拥有深刻的洞察力和强烈的同理心，善于理解他人内心世界。你怀抱理想主义，致力于让世界变得更美好，是安静而坚定的变革推动者。',
    descriptionEn: 'You have profound insight and strong empathy, skilled at understanding the inner worlds of others. You carry idealism and are committed to making the world better — a quiet yet determined change-maker.',
    dimensions: '内倾 · 直觉 · 情感 · 判断',
    dimensionsEn: 'Introverted · Intuitive · Feeling · Judging',
    behaviors: ['能敏锐察觉朋友的细微情绪变化并主动关心', '经常思考人生的意义和如何让世界变得更好', '朋友遇到人生困惑时总会来找你倾诉和寻求建议', '在安静中酝酿改变世界的计划，不急功近利'],
    behaviorsEn: ['Senses subtle mood shifts in friends and reaches out proactively', 'Often ponders the meaning of life and how to improve the world', 'Friends seek you out for advice during life dilemmas', 'Quietly nurtures plans to change the world without seeking quick wins'],
    strengths: '洞察力 · 共情能力 · 理想主义 · 坚定信念',
    strengthsEn: 'Insight · Empathy · Idealism · Steadfast conviction',
    careers: '心理咨询师、作家、教育工作者、非营利组织负责人',
    careersEn: 'Counselor, Writer, Educator, Non-profit Leader',
  },
  INFP: {
    tag: '理想主义诗人', color: '#2f855a',
    description: '你内心充盈着丰富的价值观和坚定的信念，追求真实与意义。你拥有强大的共情能力和创造力，用独特的视角感受世界，是温和而执着的梦想家。',
    descriptionEn: 'Your heart is filled with rich values and firm beliefs, always pursuing authenticity and meaning. You have strong empathy and creativity, perceiving the world through a unique lens — a gentle yet persistent dreamer.',
    dimensions: '内倾 · 直觉 · 情感 · 感知',
    dimensionsEn: 'Introverted · Intuitive · Feeling · Perceiving',
    behaviors: ['用日记、诗歌或艺术表达内心丰富的情感世界', '看到不公正的事情会挺身而出为弱者发声', '对美有独特的感知，能从平凡中发现诗意', '坚持自己的核心价值观，不愿在原则上妥协'],
    behaviorsEn: ['Expresses a rich emotional world through journaling, poetry, or art', 'Stands up for the underdog when witnessing injustice', 'Has a unique aesthetic sense, finding poetry in the ordinary', 'Stays true to core values and refuses to compromise on principles'],
    strengths: '创造力 · 共情力 · 理想主义 · 真实纯粹',
    strengthsEn: 'Creativity · Empathy · Idealism · Authenticity',
    careers: '作家、设计师、心理咨询师、艺术家、社会工作者',
    careersEn: 'Writer, Designer, Counselor, Artist, Social Worker',
  },
  ENFJ: {
    tag: '魅力引导者', color: '#22543d',
    description: '你天生善于感知他人的需求与潜力，是富有感召力的引导者。你善于凝聚人心、激发团队热情，在帮助他人成长的过程中获得最大的成就感。',
    descriptionEn: 'You are naturally attuned to the needs and potential of others — an inspiring guide. You excel at bringing people together and igniting team passion, finding fulfillment in helping others grow.',
    dimensions: '外倾 · 直觉 · 情感 · 判断',
    dimensionsEn: 'Extraverted · Intuitive · Feeling · Judging',
    behaviors: ['能发现每个人身上的闪光点并真诚地给予鼓励', '组织团队活动时总能照顾到每个人的感受', '朋友在迷茫时你帮他们理清方向找到目标', '用自己的热情感染团队，让枯燥任务变得有意义'],
    behaviorsEn: ['Spots the best in everyone and gives genuine encouragement', 'Makes sure everyones feelings are considered in team activities', 'Helps lost friends clarify their direction and find purpose', 'Inspires the team with enthusiasm, making even dull tasks meaningful'],
    strengths: '激励他人 · 沟通协调 · 洞察需求 · 领导魅力',
    strengthsEn: 'Inspiring others · Communication · Needs insight · Charismatic leadership',
    careers: '教师、HR、培训师、政治家、客户成功经理',
    careersEn: 'Teacher, HR, Trainer, Politician, Customer Success Manager',
  },
  ENFP: {
    tag: '热情梦想家', color: '#38a169',
    description: '你充满热情与创造力，总是看到生活中的无限可能性。你善于与人建立深度连接，用乐观和真诚感染身边的人，是自由奔放的灵魂探索者。',
    descriptionEn: 'You are full of passion and creativity, always seeing infinite possibilities in life. You excel at building deep connections and inspire others with your optimism and sincerity — a free-spirited explorer.',
    dimensions: '外倾 · 直觉 · 情感 · 感知',
    dimensionsEn: 'Extraverted · Intuitive · Feeling · Perceiving',
    behaviors: ['能和新认识的人在半小时内聊到人生理想', '同时有很多兴趣和项目，享受在不同领域探索', '用讲故事的方式把枯燥的信息变得生动有趣', '相信每个陌生人都有一段值得倾听的人生故事'],
    behaviorsEn: ['Can discuss life dreams with new acquaintances within 30 minutes', 'Juggles many interests and projects, enjoying cross-domain exploration', 'Uses storytelling to make dry information come alive', 'Believes every stranger has a life story worth hearing'],
    strengths: '热情感染力 · 创意丰富 · 社交天赋 · 乐观积极',
    strengthsEn: 'Enthusiasm · Creative abundance · Social talent · Optimism',
    careers: '记者、演员、市场营销、公关、创业导师',
    careersEn: 'Journalist, Actor, Marketing, PR, Startup Mentor',
  },
  ISTJ: {
    tag: '可靠守护者', color: '#2d3748',
    description: '你务实可靠、一丝不苟，是团队中最值得信赖的中坚力量。你重视规则与秩序，做事有条不紊，用实际行动兑现每一个承诺。',
    descriptionEn: 'You are practical, reliable, and meticulous — the most trustworthy backbone of any team. You value rules and order, work methodically, and deliver on every promise with concrete actions.',
    dimensions: '内倾 · 实感 · 思考 · 判断',
    dimensionsEn: 'Introverted · Sensing · Thinking · Judging',
    behaviors: ['坚持用清单管理日常任务，完成一项勾一项', '对约定时间非常敏感，迟到会让你感到焦虑', '在团队中默默承担最繁琐但必不可少的工作', '做决定前会仔细收集所有相关事实和数据'],
    behaviorsEn: ['Manages daily tasks with checklists, ticking off each item', 'Very sensitive to punctuality — lateness causes anxiety', 'Quietly takes on the most tedious but essential work', 'Collects all relevant facts and data before making decisions'],
    strengths: '可靠务实 · 组织能力 · 注重细节 · 责任心强',
    strengthsEn: 'Reliability · Organization · Attention to detail · Strong responsibility',
    careers: '会计师、审计师、军人、公务员、项目经理',
    careersEn: 'Accountant, Auditor, Military Officer, Civil Servant, Project Manager',
  },
  ISFJ: {
    tag: '温暖守护者', color: '#4a5568',
    description: '你温柔细腻、默默付出，用行动守护身边每一个人。你注重细节、责任感强，在安静中展现着坚不可摧的力量，是人群中最温暖的后盾。',
    descriptionEn: 'You are gentle, caring, and quietly devoted, protecting everyone around you through action. Detail-oriented and deeply responsible, you demonstrate unshakeable strength in quiet ways.',
    dimensions: '内倾 · 实感 · 情感 · 判断',
    dimensionsEn: 'Introverted · Sensing · Feeling · Judging',
    behaviors: ['记得每个好朋友的生日并精心准备礼物', '同事生病时悄悄帮他把工作做完不图回报', '把家人和朋友的舒适放在首位，默默创造温馨环境', '用具体的行动而非华丽的言语来表达关心'],
    behaviorsEn: ['Remembers every friends birthday and prepares thoughtful gifts', 'Quietly finishes a sick colleagues work without expecting credit', 'Puts family and friends comfort first, creating a warm environment', 'Shows care through concrete actions rather than fancy words'],
    strengths: '细致体贴 · 忠诚可靠 · 默默奉献 · 记忆力好',
    strengthsEn: 'Attentiveness · Loyalty · Quiet dedication · Good memory',
    careers: '护士、教师、行政主管、社工、客户服务',
    careersEn: 'Nurse, Teacher, Admin Manager, Social Worker, Customer Service',
  },
  ESTJ: {
    tag: '高效管理者', color: '#1a202c',
    description: '你是天生的组织者，善于制定清晰的目标并有条不紊地推进执行。你注重效率与结果，在管理和统筹方面展现出色才能，是团队不可或缺的支柱。',
    descriptionEn: 'You are a natural organizer, skilled at setting clear goals and driving execution methodically. You focus on efficiency and results, demonstrating outstanding management and coordination abilities.',
    dimensions: '外倾 · 实感 · 思考 · 判断',
    dimensionsEn: 'Extraverted · Sensing · Thinking · Judging',
    behaviors: ['接手混乱的项目后第一件事就是建立流程和规范', '用数据和事实说话，不喜欢没有依据的推测', '在会议中主动把讨论拉回正轨避免跑题', '对破坏规则的人零容忍，坚持程序和公平'],
    behaviorsEn: ['First thing in a chaotic project: establish processes and standards', 'Speaks with data and facts, dislikes baseless speculation', 'Actively steers discussions back on track in meetings', 'Zero tolerance for rule-breakers, insists on procedure and fairness'],
    strengths: '执行力 · 统筹管理 · 务实高效 · 坚持原则',
    strengthsEn: 'Execution · Management · Pragmatic efficiency · Principled',
    careers: '管理者、军官、法官、审计师、运营总监',
    careersEn: 'Manager, Military Officer, Judge, Auditor, Operations Director',
  },
  ESFJ: {
    tag: '贴心协调者', color: '#2d3748',
    description: '你热情周到、善于照顾他人感受，是维护和谐氛围的大师。你重视人际关系，乐于为他人提供实际帮助，在服务他人的过程中找到自己的价值。',
    descriptionEn: 'You are warm, considerate, and skilled at caring for others feelings — a master of maintaining harmony. You value relationships and find meaning in providing practical help to others.',
    dimensions: '外倾 · 实感 · 情感 · 判断',
    dimensionsEn: 'Extraverted · Sensing · Feeling · Judging',
    behaviors: ['组织聚会时把每个人的饮食偏好都问清楚', '同事遇到困难时第一个站出来提供实际帮助', '团队气氛紧张时用温暖的话语化解尴尬', '把家庭和社区的和谐视为生活中最重要的事'],
    behaviorsEn: ['Checks everyones dietary preferences before organizing a gathering', 'First to offer practical help when a colleague faces difficulty', 'Uses warm words to defuse tension in the team', 'Sees family and community harmony as lifes highest priority'],
    strengths: '社交能力 · 服务意识 · 组织协调 · 善解人意',
    strengthsEn: 'Social skills · Service mindset · Coordination · Empathy',
    careers: '医生、教师、销售经理、活动策划、酒店管理',
    careersEn: 'Doctor, Teacher, Sales Manager, Event Planner, Hotel Management',
  },
  ISTP: {
    tag: '冷静实干家', color: '#9c4221',
    description: '你冷静理性、动手能力强，善于在关键时刻快速分析问题并付诸行动。你享受动手实践带来的成就感，在危机中反而能展现出超乎寻常的沉着。',
    descriptionEn: 'You are calm, rational, and hands-on — skilled at quickly analyzing problems and taking action in critical moments. You enjoy the satisfaction of practical work and become remarkably composed in crises.',
    dimensions: '内倾 · 实感 · 思考 · 感知',
    dimensionsEn: 'Introverted · Sensing · Thinking · Perceiving',
    behaviors: ['遇到突发故障时冷静地一步步排查问题', '更喜欢动手做而不是开会讨论，享受实操乐趣', '在紧急情况下反而比平时更加沉着冷静', '喜欢钻研机械、工具或技术，理解它们的工作原理'],
    behaviorsEn: ['Calmly troubleshoots failures step by step', 'Prefers hands-on work over meetings, enjoying practical fun', 'Becomes even more composed than usual in emergencies', 'Loves tinkering with machines, tools, or tech to understand how they work'],
    strengths: '动手能力 · 冷静沉著 · 问题解决 · 实用主义',
    strengthsEn: 'Hands-on skills · Calm composure · Problem-solving · Pragmatism',
    careers: '工程师、飞行员、外科医生、消防员、机械师',
    careersEn: 'Engineer, Pilot, Surgeon, Firefighter, Mechanic',
  },
  ISFP: {
    tag: '细腻艺术家', color: '#c05621',
    description: '你拥有敏锐的审美感知和丰富的内心世界，用独特的方式体验和表达美。你温和谦逊、活在当下，在安静中蕴藏着惊人的创造力和对生活真挚的热爱。',
    descriptionEn: 'You have a keen aesthetic sense and a rich inner world, experiencing and expressing beauty in unique ways. Gentle and humble, you live in the moment, harboring amazing creativity and genuine love for life.',
    dimensions: '内倾 · 实感 · 情感 · 感知',
    dimensionsEn: 'Introverted · Sensing · Feeling · Perceiving',
    behaviors: ['能用独特的配色和构图拍出令人惊艳的照片', '对音乐、气味或视觉的细微差别非常敏感', '不喜欢与人争论，更愿意用行动表达自己的态度', '在安静的工作中找到心流状态，创作出独特作品'],
    behaviorsEn: ['Creates stunning photos with unique color palettes and composition', 'Highly sensitive to subtle differences in music, scent, or visuals', 'Prefers expressing through action rather than arguing', 'Finds flow state in quiet work, producing unique creations'],
    strengths: '审美力 · 动手创作 · 活在当下 · 温和坚定',
    strengthsEn: 'Aesthetic sense · Creative hands · Present-moment awareness · Gentle resolve',
    careers: '设计师、摄影师、音乐人、花艺师、美食评论家',
    careersEn: 'Designer, Photographer, Musician, Florist, Food Critic',
  },
  ESTP: {
    tag: '敏锐行动派', color: '#dd6b20',
    description: '你精力充沛、行动力极强，善于把握当下机会快速出手。你现实敏锐、临场应变能力出众，是天生的危机处理专家和在瞬息万变中抢占先机的人。',
    descriptionEn: 'You are energetic and action-oriented, skilled at seizing the moment and moving fast. You are sharp, practical, and excel at on-the-spot improvisation — a natural crisis handler who thrives in fast-changing environments.',
    dimensions: '外倾 · 实感 · 思考 · 感知',
    dimensionsEn: 'Extraverted · Sensing · Thinking · Perceiving',
    behaviors: ['在谈判中能即时捕捉对方微表情调整策略', '喜欢极限运动或高风险高回报的挑战', '遇到问题先动手试，边做边调整不浪费时间', '在危机中第一个冲上去处理而不是等待指令'],
    behaviorsEn: ['Reads micro-expressions in negotiations and adjusts tactics instantly', 'Enjoys extreme sports or high-risk, high-reward challenges', 'Tries things hands-on first, adjusting on the fly', 'First to jump in and handle a crisis rather than waiting for orders'],
    strengths: '行动力 · 临场应变 · 现实敏锐 · 冒险精神',
    strengthsEn: 'Action-oriented · Improvisation · Practical sharpness · Risk-taking',
    careers: '销售总监、急救医生、运动员、企业家、消防队长',
    careersEn: 'Sales Director, ER Doctor, Athlete, Entrepreneur, Fire Chief',
  },
  ESFP: {
    tag: '快乐表演家', color: '#ed8936',
    description: '你天生是人群中的开心果，用热情和幽默感染每一个身边的人。你热爱生活、享受当下，善于发现生活中的美好瞬间，是轻松愉快的能量供给站。',
    descriptionEn: 'You are the life of the party, spreading warmth and humor to everyone around you. You love life, live in the moment, and have a gift for discovering joy in everyday moments — an energetic source of fun and positivity.',
    dimensions: '外倾 · 实感 · 情感 · 感知',
    dimensionsEn: 'Extraverted · Sensing · Feeling · Perceiving',
    behaviors: ['聚会中总能活跃气氛让每个人都感到被关注', '每天都能发现生活中的小确幸并与朋友分享', '用幽默化解尴尬，让紧张的场面轻松起来', '乐于尝试新餐厅、新活动，对生活保持新鲜感'],
    behaviorsEn: ['Energizes any party and makes everyone feel included', 'Finds daily joys and shares them with friends', 'Defuses awkwardness with humor, lightening tense situations', 'Eagerly tries new restaurants and activities, keeping life fresh'],
    strengths: '社交魅力 · 乐观感染力 · 审美品味 · 适应力强',
    strengthsEn: 'Social charm · Infectious optimism · Good taste · Adaptability',
    careers: '演员、销售、导游、活动策划、时尚博主',
    careersEn: 'Actor, Sales, Tour Guide, Event Planner, Fashion Blogger',
  },
};

export function getTypeMeta(type: string, lang?: 'zh' | 'en'): TypeMeta {
  const data = TYPE_DATA[type];
  if (!data) throw new Error(`Unknown MBTI type: ${type}`);
  const isEn = lang === 'en';
  return {
    type,
    tag: data.tag,
    color: data.color,
    description: isEn ? data.descriptionEn : data.description,
    dimensions: isEn ? data.dimensionsEn : data.dimensions,
    behaviors: isEn ? data.behaviorsEn : data.behaviors,
    strengths: isEn ? data.strengthsEn : data.strengths,
    careers: isEn ? data.careersEn : data.careers,
  };
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

export const DIMENSION_INTERPRETATION_EN: Record<Dimension, Record<string, string>> = {
  EI: {
    E: 'You draw energy from the external world and social interactions. Being with people energizes and fulfills you. You enjoy sharing ideas, think more actively in group discussions, tend to act before reflecting, and maintain a wide range of interests and social connections.',
    I: 'You draw energy from your inner world and solitude. Quiet environments allow you to think deeply. You value the quality of inner experience over external stimulation, tend to reflect before acting, and prefer exploring a few interests in great depth.',
  },
  SN: {
    S: 'You focus on concrete, factual information and trust what you can see. You value details and practical experience, excel at applying known methods to current problems, prefer step-by-step approaches, and show less interest in abstract theories.',
    N: 'You focus on overall patterns and future possibilities. You enjoy exploring new ideas and connecting disparate information, have a strong interest in abstract concepts and theoretical discussions, and care more about "what could be" than "what is."',
  },
  TF: {
    T: 'You make decisions based on logic and objective analysis. You value fairness and consistency, excel at weighing pros and cons to find optimal solutions. You trust in truth and principles, placing objective standards above personal feelings in decision-making.',
    F: 'You make decisions considering values and impact on people. You value harmony and empathy, excel at seeing issues from different perspectives. You believe in the value of emotions and carefully consider the feelings and needs of those involved.',
  },
  JP: {
    J: 'You prefer a planned, organized lifestyle. You like clear schedules and explicit rules, finding satisfaction in completing tasks. You focus on efficiency and results, preferring to make decisions quickly to reduce uncertainty.',
    P: 'You prefer a flexible, open, go-with-the-flow lifestyle. You like keeping options open and enjoy the process of exploration and discovery. You adapt easily, embrace change, and view deadlines more as guidelines than absolutes.',
  },
};

export function getDimInterpretation(dim: Dimension, pole: string, lang?: string): string {
  const source = lang === 'en' ? DIMENSION_INTERPRETATION_EN : DIMENSION_INTERPRETATION;
  return source[dim]?.[pole] || '';
}

// 所有MBTI类型列表
export const ALL_TYPES = Object.keys(TYPE_DATA);
