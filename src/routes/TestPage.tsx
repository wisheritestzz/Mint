import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress, Button, Typography, Modal, Tooltip } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTestStore } from '../store/testStore';
import { useResultStore } from '../store/resultStore';
import { useIsMobile } from '../hooks/useResponsive';
import type { LikertLevel, Answer } from '../types';

const { Text } = Typography;

const OPTIONS: { label: string; value: LikertLevel; emoji: string }[] = [
  { label: '非常不符合', value: 1, emoji: '👎' },
  { label: '不太符合', value: 2, emoji: '🤔' },
  { label: '一般', value: 3, emoji: '😐' },
  { label: '比较符合', value: 4, emoji: '👍' },
  { label: '非常符合', value: 5, emoji: '💯' },
];

const ENCOURAGEMENTS = [
  { pct: 10, text: '好的开始！请根据第一反应作答 ✨' },
  { pct: 20, text: '做得不错，保持真实～' },
  { pct: 30, text: '三分之一了，继续加油！' },
  { pct: 40, text: '进度喜人，你很专注！' },
  { pct: 50, text: '已过半程，胜利在望 🎯' },
  { pct: 60, text: '过半了！再坚持一下～' },
  { pct: 70, text: '快了快了，稳住节奏' },
  { pct: 80, text: '马上就能看到结果了！' },
  { pct: 90, text: '最后冲刺，别松懈 🚀' },
  { pct: 95, text: '最后一题！马上揭晓～' },
];

const DIM_LABELS: Record<string, string> = {
  EI: '精力来源',
  SN: '信息获取',
  TF: '决策方式',
  JP: '生活态度',
};

export default function TestPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const questions = useTestStore((s) => s.questions);
  const currentIndex = useTestStore((s) => s.currentIndex);
  const answers = useTestStore((s) => s.answers);
  const setAnswer = useTestStore((s) => s.setAnswer);
  const goTo = useTestStore((s) => s.goTo);
  const next = useTestStore((s) => s.next);
  const prev = useTestStore((s) => s.prev);
  const isCompleteFn = useTestStore((s) => s.isComplete);
  const getProgress = useTestStore((s) => s.getProgress);
  const clearCache = useTestStore((s) => s.clearCache);
  const initTest = useTestStore((s) => s.initTest);

  const computeResult = useResultStore((s) => s.computeResult);

  const [direction, setDirection] = useState(1);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showNavPanel, setShowNavPanel] = useState(false);
  const finishingRef = useRef(false);
  const preloadedRef = useRef(false);

  // 自动完成检测
  useEffect(() => {
    if (isCompleteFn() && questions.length > 0) {
      setShowCompleteModal(true);
    }
  }, [answers, questions.length, isCompleteFn]);

  // 进度达80%时预加载结果页
  const progress = getProgress();
  useEffect(() => {
    if (progress >= 0.8 && !preloadedRef.current) {
      preloadedRef.current = true;
      import('./ResultPage');
    }
  }, [progress]);

  const currentQ = questions[currentIndex];
  const selectedScore = currentQ ? answers[currentQ.id] : undefined;
  const answeredCount = Object.keys(answers).length;

  const handleSelect = useCallback(
    (score: LikertLevel) => {
      if (!currentQ) return;
      setAnswer(currentQ.id, score);
    },
    [currentQ, setAnswer],
  );

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setDirection(1);
      next();
    }
  }, [currentIndex, questions.length, next]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      prev();
    }
  }, [currentIndex, prev]);

  const handleGoTo = useCallback(
    (idx: number) => {
      setDirection(idx > currentIndex ? 1 : -1);
      goTo(idx);
      setShowNavPanel(false);
    },
    [currentIndex, goTo],
  );

  const handleFinish = useCallback(() => {
    finishingRef.current = true;
    const answerList: Answer[] = Object.entries(answers).map(([id, score]) => ({
      questionId: Number(id),
      score,
    }));
    computeResult(answerList);
    clearCache();
    navigate('/result');
  }, [answers, computeResult, clearCache, navigate]);

  // 初始化
  useEffect(() => {
    if (finishingRef.current) return;
    if (questions.length === 0) initTest(false);
  }, [questions.length, initTest]);

  if (questions.length === 0 || !currentQ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <Text className="!text-slate-400 !text-sm">正在准备题目...</Text>
        </div>
      </div>
    );
  }

  const allComplete = answeredCount === questions.length;
  const encouragement = [...ENCOURAGEMENTS].reverse().find((e) => progress * 100 >= e.pct);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* 顶部栏 */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-2">
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setShowExitModal(true)}
              className="!text-slate-400 hover:!text-slate-600"
            />
            <div className="flex-1" />
            <Tooltip title="查看题目导航">
              <Button
                type="text"
                icon={<AppstoreOutlined />}
                onClick={() => setShowNavPanel(!showNavPanel)}
                className={`!text-slate-400 hover:!text-slate-600 ${showNavPanel ? '!text-indigo-500' : ''}`}
              />
            </Tooltip>
            <Text className="!text-xs !text-slate-400 !font-mono">
              {answeredCount}/{questions.length}
            </Text>
          </div>
          <div className="flex items-center justify-between mb-1">
            <Progress
              percent={Math.round(progress * 100)}
              showInfo={false}
              size="small"
              strokeColor={{ '0%': '#818cf8', '100%': '#4f46e5' }}
              trailColor="#f1f5f9"
              className="flex-1 mr-3"
            />
            {encouragement && (
              <motion.span
                key={encouragement.pct}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-indigo-400 whitespace-nowrap"
              >
                {encouragement.text}
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {/* 题目区域 */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQ.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 50 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="mb-6 sm:mb-8"
            >
              {/* 维度 + 题号标签 */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-500">
                  {DIM_LABELS[currentQ.dimension]}
                </span>
                <span className="text-xs text-slate-400">
                  第 {currentIndex + 1} 题
                </span>
              </div>

              {/* 题目 */}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#1a1a2e] leading-relaxed">
                {currentQ.text}
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* 选项列表 */}
          <div className="space-y-2.5 sm:space-y-3">
            {OPTIONS.map((opt, i) => {
              const isSelected = selectedScore === opt.value;
              return (
                <motion.button
                  key={opt.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect(opt.value)}
                  className={`option-btn w-full text-left px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl border-2 font-medium transition-all duration-200
                    ${isSelected
                      ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-md shadow-indigo-100'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50'
                    }
                    ${isMobile ? 'text-sm' : 'text-base'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'}
                      `}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-white"
                        />
                      )}
                    </div>
                    <span className="flex-1">{opt.label}</span>
                    <span className="text-base sm:text-lg opacity-70">{opt.emoji}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 题目导航面板 */}
      <AnimatePresence>
        {showNavPanel && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden bg-white border-t border-slate-100"
          >
            <div className="max-w-2xl mx-auto px-4 py-3">
              <div className="flex items-center gap-2 mb-3 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" /> 当前
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" /> 已答
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-slate-200 inline-block" /> 未答
                </span>
                <div className="flex-1" />
                <Text className="!text-slate-400">
                  {answeredCount}/{questions.length} 已答
                </Text>
              </div>
              <div className="grid grid-cols-10 sm:grid-cols-10 gap-1.5 sm:gap-2">
                {questions.map((q, i) => {
                  const isAnswered = answers[q.id] != null;
                  const isCurrent = i === currentIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => handleGoTo(i)}
                      className={`w-full aspect-square rounded-xl text-xs font-mono font-medium transition-all
                        ${isCurrent
                          ? 'bg-indigo-500 text-white shadow-md scale-110 ring-2 ring-indigo-200'
                          : isAnswered
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }
                      `}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部导航栏 */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-slate-100 safe-bottom">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            size={isMobile ? 'middle' : 'large'}
            icon={<LeftOutlined />}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="!rounded-xl !font-medium flex-shrink-0"
          >
            上一题
          </Button>

          <div className="flex-1" />

          {allComplete && currentIndex === questions.length - 1 ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Button
                type="primary"
                size={isMobile ? 'middle' : 'large'}
                onClick={() => setShowCompleteModal(true)}
                className="!rounded-xl !font-bold !shadow-lg !shadow-indigo-300/50 !px-6"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  border: 'none',
                }}
              >
                查看结果 ✨
              </Button>
            </motion.div>
          ) : (
            <Button
              type={selectedScore ? 'primary' : 'default'}
              size={isMobile ? 'middle' : 'large'}
              icon={<RightOutlined />}
              iconPosition="end"
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
              className={`!rounded-xl !font-medium flex-shrink-0 ${
                selectedScore ? '!shadow-md' : ''
              }`}
              style={
                selectedScore
                  ? {
                      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                      border: 'none',
                    }
                  : undefined
              }
            >
              下一题
            </Button>
          )}
        </div>
      </div>

      {/* 退出弹窗 */}
      <Modal
        open={showExitModal}
        onCancel={() => setShowExitModal(false)}
        onOk={() => {
          setShowExitModal(false);
          navigate('/');
        }}
        okText="退出测试"
        cancelText="继续答题"
        title="确认退出？"
        className="!rounded-2xl"
        styles={{ body: { padding: '16px 24px 24px' } }}
      >
        <Text className="!text-slate-500 !text-sm">
          你的答题进度已自动保存，下次访问可以继续答题。
        </Text>
      </Modal>

      {/* 完成弹窗 */}
      <Modal
        open={showCompleteModal}
        onCancel={() => setShowCompleteModal(false)}
        onOk={handleFinish}
        okText="查看结果"
        cancelText="继续检查"
        title="全部答完！"
        className="!rounded-2xl"
        styles={{ body: { padding: '16px 24px 24px' } }}
      >
        <Text className="!text-slate-500 !text-sm">
          你已完成全部 {questions.length} 道题目。系统将基于你的答题数据进行四维度精准分析，揭晓你的MBTI人格类型。
        </Text>
      </Modal>
    </div>
  );
}
