import type { Answer, DimensionScore, MBTIResult } from '../types';
import type { Dimension, Pole } from '../types';
import { DIMENSION_POLES, getTypeMeta } from './constants';

const SCORE_RANGE = { min: 1, max: 5 };
const AMBIGUOUS_THRESHOLD = 5;

/** 计算单个维度得分 */
function calcDimensionScore(
  dimension: Dimension,
  answers: Answer[],
  questionDirections: Map<number, Pole>,
): DimensionScore {
  const { left, right } = DIMENSION_POLES[dimension];
  let leftScore = 0;
  let rightScore = 0;

  for (const a of answers) {
    const dir = questionDirections.get(a.questionId);
    if (!dir) continue;

    if (dir === left) {
      // 正向：高分→左极
      leftScore += a.score;
    } else {
      // 该题倾向右极，计分时反向
      rightScore += SCORE_RANGE.max + SCORE_RANGE.min - a.score;
    }
  }

  // 双向计分：每个方向各自独立
  // 实际上 leftScore 是 E 方向题的总分，rightScore 是原始 I 方向总分
  // 但这样两个分数都在 [题数*1, 题数*5] 范围内，需要分别修正
  // 简化：leftScore = 左极原始分累计, rightScore = 右极转换后得分累计
  // 不，更清晰的逻辑：
  // - 对于 direction=left 的题：score 高 → left倾向强
  // - 对于 direction=right 的题：score 高 → right倾向强
  // 所以 leftScore = sum(if direction==left: score, else: 6-score)
  //    rightScore = sum(if direction==right: score, else: 6-score)

  // 重新计算更准确的方式
  let rawLeft = 0;
  let rawRight = 0;
  for (const a of answers) {
    const dir = questionDirections.get(a.questionId);
    if (!dir) continue;
    if (dir === left) {
      rawLeft += a.score;
    } else {
      rawRight += a.score;
    }
  }

  const totalLeft = rawLeft;
  const totalRight = rawRight;
  const diff = Math.abs(totalLeft - totalRight);
  const dominant = totalLeft >= totalRight ? left : right;

  return {
    dimension,
    leftPole: left,
    leftScore: totalLeft,
    rightPole: right,
    rightScore: totalRight,
    dominant,
    ambiguous: diff <= AMBIGUOUS_THRESHOLD,
  };
}

/** 组合维度得分 → MBTI类型字符串 */
function buildType(scores: DimensionScore[]): string {
  return scores.map((s) => s.dominant).join('');
}

/** 核心评分函数 */
export function calculateResult(
  answers: Answer[],
  questionDirections: Map<number, Pole>,
  dimensionMap: Map<number, Dimension>,
): MBTIResult {
  // 按维度分组答案
  const answersByDimension = new Map<Dimension, Answer[]>();
  for (const a of answers) {
    const dim = dimensionMap.get(a.questionId);
    if (!dim) continue;
    if (!answersByDimension.has(dim)) answersByDimension.set(dim, []);
    answersByDimension.get(dim)!.push(a);
  }

  // 计算四个维度得分
  const dimensions: Dimension[] = ['EI', 'SN', 'TF', 'JP'];
  const dimensionScores = dimensions.map((dim) =>
    calcDimensionScore(dim, answersByDimension.get(dim) || [], questionDirections),
  );

  // 组合MBTI类型
  const type = buildType(dimensionScores);
  const meta = getTypeMeta(type);

  return {
    type,
    tag: meta.tag,
    dimensionScores,
    color: meta.color,
    timestamp: Date.now(),
  };
}

/** 验证答案完整性 */
export function isTestComplete(answers: Answer[], totalQuestions: number): boolean {
  return answers.length >= totalQuestions;
}
