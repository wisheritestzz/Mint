// ===== 维度与极向 =====
export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';
export type Pole = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

// ===== 题目 =====
export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  direction: Pole; // 高分倾向哪个极
}

// ===== 答题 =====
export type LikertLevel = 1 | 2 | 3 | 4 | 5;

export interface Answer {
  questionId: number;
  score: LikertLevel;
}

// ===== 维度得分 =====
export interface DimensionScore {
  dimension: Dimension;
  leftPole: Pole;
  leftScore: number;
  rightPole: Pole;
  rightScore: number;
  dominant: Pole;
  ambiguous: boolean; // 差值≤5 → 倾向不明显
}

// ===== MBTI 结果 =====
export interface MBTIResult {
  type: string;
  tag: string;
  dimensionScores: DimensionScore[];
  color: string;
  timestamp: number;
}

// ===== 历史记录 =====
export interface HistoryRecord {
  type: string;
  tag: string;
  timestamp: number;
}

// ===== 缓存数据结构 =====
export interface CacheData {
  answers: Record<number, LikertLevel>;
  currentIndex: number;
  questionOrder: number[];
  timestamp: number;
}
