import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress, Button, Typography, Modal } from 'antd';
import { LeftOutlined, RightOutlined, CloseOutlined, AppstoreOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTestStore } from '../store/testStore';
import { useResultStore } from '../store/resultStore';
import { useIsMobile } from '../hooks/useResponsive';
import { useI18n } from '../i18n/context';
import type { LikertLevel, Answer } from '../types';

const { Text } = Typography;

const OPTIONS: { labelKey: string; value: LikertLevel; emoji: string }[] = [
  { labelKey: 'opt.1', value: 1, emoji: '👎' },
  { labelKey: 'opt.2', value: 2, emoji: '🤔' },
  { labelKey: 'opt.3', value: 3, emoji: '😐' },
  { labelKey: 'opt.4', value: 4, emoji: '👍' },
  { labelKey: 'opt.5', value: 5, emoji: '💯' },
];

const ENC_KEYS = ['enc.10', 'enc.20', 'enc.30', 'enc.40', 'enc.50', 'enc.60', 'enc.70', 'enc.80', 'enc.90', 'enc.95'];
const ENC_PCTS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95];

const DIM_KEYS: Record<string, string> = {
  EI: 'dim.EI', SN: 'dim.SN', TF: 'dim.TF', JP: 'dim.JP',
};

export default function TestPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t, lang } = useI18n();

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

  useEffect(() => {
    if (isCompleteFn() && questions.length > 0) setShowCompleteModal(true);
  }, [answers, questions.length, isCompleteFn]);

  const progress = getProgress();
  useEffect(() => {
    if (progress >= 0.8 && !preloadedRef.current) { preloadedRef.current = true; import('./ResultPage'); }
  }, [progress]);

  const currentQ = questions[currentIndex];
  const selectedScore = currentQ ? answers[currentQ.id] : undefined;
  const answeredCount = Object.keys(answers).length;
  const allComplete = answeredCount === questions.length;
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = useCallback((score: LikertLevel) => { if (currentQ) setAnswer(currentQ.id, score); }, [currentQ, setAnswer]);
  const handleNext = useCallback(() => { if (currentIndex < questions.length - 1) { setDirection(1); next(); } }, [currentIndex, questions.length, next]);
  const handlePrev = useCallback(() => { if (currentIndex > 0) { setDirection(-1); prev(); } }, [currentIndex, prev]);
  const handleGoTo = useCallback((idx: number) => { setDirection(idx > currentIndex ? 1 : -1); goTo(idx); }, [currentIndex, goTo]);

  const handleFinish = useCallback(() => {
    finishingRef.current = true;
    const answerList: Answer[] = Object.entries(answers).map(([id, score]) => ({ questionId: Number(id), score }));
    computeResult(answerList);
    clearCache();
    navigate('/result');
  }, [answers, computeResult, clearCache, navigate]);

  useEffect(() => {
    if (finishingRef.current) return;
    if (questions.length === 0) initTest();
  }, [questions.length, initTest]);

  if (questions.length === 0 || !currentQ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <Text className="!text-slate-400 !text-sm">{t('test.loading')}</Text>
        </div>
      </div>
    );
  }

  // 鼓励提示
  const encIdx = ENC_PCTS.findLastIndex((p) => progress * 100 >= p);
  const encouragement = encIdx >= 0 ? t(ENC_KEYS[encIdx]) : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* 顶部栏 */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-2">
            <Button type="text" icon={<CloseOutlined />} onClick={() => setShowExitModal(true)} className="!text-slate-400 hover:!text-slate-600" />
            <div className="flex-1" />
            <Text className="!text-xs !text-slate-400 !font-mono">{answeredCount}/{questions.length}</Text>
          </div>
          <div className="flex items-center justify-between mb-1">
            <Progress percent={Math.round(progress * 100)} showInfo={false} size="small"
              strokeColor={{ '0%': '#818cf8', '100%': '#4f46e5' }} trailColor="#f1f5f9" className="flex-1 mr-3" />
            {encouragement && (
              <motion.span key={encouragement} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="text-xs text-indigo-400 whitespace-nowrap">{encouragement}</motion.span>
            )}
          </div>
        </div>
      </div>

      {/* 题目区域 */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={currentQ.id} custom={direction}
              initial={{ opacity: 0, x: direction * 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -direction * 50 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }} className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-500">
                  {t(DIM_KEYS[currentQ.dimension])}
                </span>
                <span className="text-xs text-slate-400">{lang === 'zh' ? `第 ${currentIndex + 1} 题` : `Q${currentIndex + 1}`}</span>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#1a1a2e] leading-relaxed">{currentQ.text}</h2>
            </motion.div>
          </AnimatePresence>

          {/* 选项 */}
          <div className="space-y-2.5 sm:space-y-3">
            {OPTIONS.map((opt, i) => {
              const isSelected = selectedScore === opt.value;
              return (
                <motion.button key={opt.value}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  whileTap={{ scale: 0.97 }} onClick={() => handleSelect(opt.value)}
                  className={`option-btn w-full text-left px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl border-2 font-medium transition-all duration-200
                    ${isSelected ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-md shadow-indigo-100'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50'}
                    ${isMobile ? 'text-sm' : 'text-base'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                      ${isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'}`}>
                      {isSelected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="flex-1">{t(opt.labelKey)}</span>
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
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }} className="overflow-hidden bg-white border-t border-slate-100">
            <div className="max-w-2xl mx-auto px-4 py-3">
              <div className="flex items-center gap-2 mb-3 text-xs">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" /> {t('test.current')}</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" /> {t('test.answered')}</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-slate-200 inline-block" /> {t('test.unanswered')}</span>
                <div className="flex-1" />
                <Text className="!text-slate-400">{answeredCount}/{questions.length} {t('test.answered')}</Text>
              </div>
              <div className="grid grid-cols-10 sm:grid-cols-10 gap-1.5 sm:gap-2">
                {questions.map((q, i) => {
                  const isAnswered = answers[q.id] != null;
                  const isCurrent = i === currentIndex;
                  return (
                    <button key={q.id} onClick={() => handleGoTo(i)}
                      className={`w-full aspect-square rounded-xl text-xs font-mono font-medium transition-all
                        ${isCurrent ? 'bg-indigo-500 text-white shadow-md scale-110 ring-2 ring-indigo-200'
                          : isAnswered ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>{i + 1}</button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部导航栏 */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-slate-100 safe-bottom">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2 sm:gap-3">
          {/* 上一题 */}
          <Button size={isMobile ? 'middle' : 'large'} icon={<LeftOutlined />} onClick={handlePrev} disabled={currentIndex === 0}
            className="!rounded-xl !font-medium flex-shrink-0">{t('test.prevBtn')}</Button>

          {/* 答题清单按钮 - 移到底部 */}
          <Button size={isMobile ? 'middle' : 'large'} icon={<AppstoreOutlined />}
            onClick={() => setShowNavPanel(!showNavPanel)}
            className={`!rounded-xl !font-medium flex-shrink-0 ${showNavPanel ? '!text-indigo-500 !border-indigo-300' : '!text-slate-500'}`}>
            {isMobile ? '' : t('test.viewList')}
          </Button>

          <div className="flex-1" />

          {/* 三种右侧按钮状态 */}
          {allComplete ? (
            isLast ? (
              /* 全部答完+最后一题 → 查看结果 */
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <Button type="primary" size={isMobile ? 'middle' : 'large'} onClick={() => setShowCompleteModal(true)}
                  className="!rounded-xl !font-bold !shadow-lg !shadow-indigo-300/50 !px-4 sm:!px-6"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none' }}>{t('test.completeBtn')}</Button>
              </motion.div>
            ) : (
              /* 全部答完+非最后一题 → 查看结果 + 下一题 并排 */
              <div className="flex items-center gap-2">
                <Button type="primary" size={isMobile ? 'middle' : 'large'} onClick={() => setShowCompleteModal(true)}
                  className="!rounded-xl !font-bold !shadow-lg !shadow-indigo-300/50 !px-4"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none' }}>{t('test.completeBtn')}</Button>
                <Button size={isMobile ? 'middle' : 'large'} icon={<RightOutlined />} iconPosition="end" onClick={handleNext}
                  type={selectedScore ? 'primary' : 'default'}
                  className={`!rounded-xl !font-medium flex-shrink-0 ${selectedScore ? '!shadow-md' : ''}`}
                  style={selectedScore ? { background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none' } : undefined}>
                  {t('test.nextBtn')}
                </Button>
              </div>
            )
          ) : isLast ? (
            /* 最后一题但有未答 → 引导补充 */
            <Button size={isMobile ? 'middle' : 'large'} onClick={() => setShowNavPanel(true)} icon={<AppstoreOutlined />}
              className="!rounded-xl !font-medium !text-amber-600 !border-amber-300 hover:!border-amber-500 !bg-amber-50 flex-shrink-0">
              {answeredCount}/{questions.length} {t('test.answered')} · {t('test.fillRemaining')}
            </Button>
          ) : (
            /* 正常下一题 */
            <Button size={isMobile ? 'middle' : 'large'} icon={<RightOutlined />} iconPosition="end" onClick={handleNext}
              type={selectedScore ? 'primary' : 'default'}
              className={`!rounded-xl !font-medium flex-shrink-0 ${selectedScore ? '!shadow-md' : ''}`}
              style={selectedScore ? { background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none' } : undefined}>
              {t('test.nextBtn')}
            </Button>
          )}
        </div>
      </div>

      {/* 退出弹窗 */}
      <Modal open={showExitModal} onCancel={() => setShowExitModal(false)}
        onOk={() => { setShowExitModal(false); navigate('/'); }}
        okText={t('test.exitOk')} cancelText={t('test.exitCancel')} title={t('test.exitTitle')}
        className="!rounded-2xl" styles={{ body: { padding: '16px 24px 24px' } }}>
        <Text className="!text-slate-500 !text-sm">{t('test.exitMsg')}</Text>
      </Modal>

      {/* 完成弹窗 */}
      <Modal open={showCompleteModal} onCancel={() => setShowCompleteModal(false)}
        onOk={handleFinish} okText={t('test.doneOk')} cancelText={t('test.doneCancel')} title={t('test.doneTitle')}
        className="!rounded-2xl" styles={{ body: { padding: '16px 24px 24px' } }}>
        <Text className="!text-slate-500 !text-sm">{t('test.doneMsg')}</Text>
      </Modal>
    </div>
  );
}
