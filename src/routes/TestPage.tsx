import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress, Button, Typography, Modal } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTestStore } from '../store/testStore';
import { useResultStore } from '../store/resultStore';
import { useIsMobile } from '../hooks/useResponsive';
import type { LikertLevel, Answer } from '../types';

const { Text } = Typography;

const OPTIONS: { label: string; value: LikertLevel }[] = [
  { label: '非常不符合', value: 1 },
  { label: '不太符合', value: 2 },
  { label: '一般', value: 3 },
  { label: '比较符合', value: 4 },
  { label: '非常符合', value: 5 },
];

const ENCOURAGEMENTS = [
  { pct: 20, text: '好的开始！请继续保持真实作答 ✨' },
  { pct: 40, text: '进度不错，你做得很好！' },
  { pct: 60, text: '已过半程，再坚持一下～' },
  { pct: 80, text: '马上就要完成了，加油！' },
  { pct: 95, text: '最后几步，冲刺！' },
];

export default function TestPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const questions = useTestStore((s) => s.questions);
  const currentIndex = useTestStore((s) => s.currentIndex);
  const answers = useTestStore((s) => s.answers);
  const setAnswer = useTestStore((s) => s.setAnswer);
  const next = useTestStore((s) => s.next);
  const prev = useTestStore((s) => s.prev);
  const isComplete = useTestStore((s) => s.isComplete);
  const getProgress = useTestStore((s) => s.getProgress);
  const clearCache = useTestStore((s) => s.clearCache);
  const initTest = useTestStore((s) => s.initTest);

  const computeResult = useResultStore((s) => s.computeResult);

  const [direction, setDirection] = useState(1); // 1=forward, -1=backward
  const [showExitModal, setShowExitModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  // 自动完成检测
  useEffect(() => {
    if (isComplete() && questions.length > 0) {
      setShowCompleteModal(true);
    }
  }, [answers, questions.length, isComplete]);

  const progress = getProgress();
  const currentQ = questions[currentIndex];
  const selectedScore = currentQ ? answers[currentQ.id] : undefined;

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
      setTimeout(() => next(), 0);
    }
  }, [currentIndex, questions.length, next]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setTimeout(() => prev(), 0);
    }
  }, [currentIndex, prev]);

  const handleFinish = useCallback(() => {
    const answerList: Answer[] = Object.entries(answers).map(([id, score]) => ({
      questionId: Number(id),
      score,
    }));
    computeResult(answerList);
    clearCache();
    setShowCompleteModal(false);
    navigate('/result');
  }, [answers, computeResult, clearCache, navigate]);

  // 无题目时回首页
  useEffect(() => {
    if (questions.length === 0) {
      initTest(false);
    }
  }, [questions.length, initTest]);

  if (questions.length === 0 || !currentQ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Text className="!text-slate-400">加载中...</Text>
      </div>
    );
  }

  const encouragement = [...ENCOURAGEMENTS]
    .reverse()
    .find((e) => progress * 100 >= e.pct);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* 顶部栏：关闭 + 进度 */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setShowExitModal(true)}
            className="!text-slate-400 hover:!text-slate-600"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <Text className="!text-xs !text-slate-400">
                {currentIndex + 1} / {questions.length}
              </Text>
              {encouragement && (
                <Text className="!text-xs !text-indigo-400 animate-fade-in">
                  {encouragement.text}
                </Text>
              )}
            </div>
            <Progress
              percent={Math.round(progress * 100)}
              showInfo={false}
              size="small"
              strokeColor={{
                '0%': '#818cf8',
                '100%': '#4f46e5',
              }}
              trailColor="#f1f5f9"
            />
          </div>
        </div>
      </div>

      {/* 题目区域 */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQ.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="mb-8 sm:mb-10"
            >
              {/* 题目维度标签 */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-500">
                  {currentQ.dimension === 'EI'
                    ? '精力来源'
                    : currentQ.dimension === 'SN'
                      ? '信息获取'
                      : currentQ.dimension === 'TF'
                        ? '决策方式'
                        : '生活态度'}
                </span>
              </div>

              {/* 题目标题 */}
              <h2
                className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#1a1a2e] leading-relaxed"
                style={{ minHeight: isMobile ? 'auto' : '72px' }}
              >
                {currentQ.text}
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* 选项列表 */}
          <div className="space-y-2.5 sm:space-y-3">
            {OPTIONS.map((opt) => {
              const isSelected = selectedScore === opt.value;
              return (
                <motion.button
                  key={opt.value}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(opt.value)}
                  className={`option-btn w-full text-left px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl border-2 font-medium transition-all duration-200
                    ${isSelected
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md shadow-indigo-100 scale-[1.01]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
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
                    <span>{opt.label}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-slate-100 safe-bottom">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Button
            size={isMobile ? 'middle' : 'large'}
            icon={<LeftOutlined />}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="!rounded-xl !font-medium"
          >
            上一题
          </Button>

          {/* 快捷题号指示 */}
          <div className="hidden sm:flex items-center gap-2">
            {Array.from({ length: questions.length }, (_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-indigo-500 w-4'
                    : answers[questions[i].id] != null
                      ? 'bg-indigo-300'
                      : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          {currentIndex < questions.length - 1 ? (
            <Button
              type="primary"
              size={isMobile ? 'middle' : 'large'}
              icon={<RightOutlined />}
              iconPosition="end"
              onClick={handleNext}
              className="!rounded-xl !font-medium !shadow-md"
              style={{
                background: selectedScore
                  ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                  : undefined,
                border: 'none',
              }}
            >
              下一题
            </Button>
          ) : (
            <Button
              type="primary"
              size={isMobile ? 'middle' : 'large'}
              onClick={() => setShowCompleteModal(true)}
              disabled={Object.keys(answers).length < questions.length}
              className="!rounded-xl !font-medium !shadow-md !shadow-indigo-300/50"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                border: 'none',
              }}
            >
              提交结果
            </Button>
          )}
        </div>
      </div>

      {/* 退出确认弹窗 */}
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
        styles={{
          body: { padding: '16px 24px 24px' },
        }}
      >
        <Text className="!text-slate-500 !text-sm">
          你的答题进度已自动保存，下次访问可以继续答题。
        </Text>
      </Modal>

      {/* 完成确认弹窗 */}
      <Modal
        open={showCompleteModal}
        onCancel={() => setShowCompleteModal(false)}
        onOk={handleFinish}
        okText="查看结果"
        cancelText="继续检查"
        title="全部答完！"
        className="!rounded-2xl"
        styles={{
          body: { padding: '16px 24px 24px' },
        }}
      >
        <Text className="!text-slate-500 !text-sm">
          你已完成全部 {questions.length} 道题目，点击"查看结果"获取你的MBTI人格类型。
        </Text>
      </Modal>
    </div>
  );
}
