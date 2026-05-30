import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Tag } from 'antd';
import {
  ThunderboltOutlined,
  ExperimentOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useTestStore } from '../store/testStore';

const { Title, Text } = Typography;

const MODES = [
  {
    key: 'quick',
    icon: <ThunderboltOutlined />,
    title: '快速评测',
    subtitle: '快速了解你的性格轮廓',
    questions: 50,
    time: '8-10分钟',
    color: '#6366f1',
    bg: 'from-indigo-50 to-purple-50',
    border: 'border-indigo-200 hover:border-indigo-400',
    features: [
      '50道精选核心题目',
      '快速定位四维度倾向',
      '获得MBTI类型+简要解读',
      '适合初次了解MBTI',
    ],
  },
  {
    key: 'pro',
    icon: <ExperimentOutlined />,
    title: '专业评测',
    subtitle: '深度精准分析，多维校准',
    questions: 80,
    time: '15-18分钟',
    color: '#0ea5e9',
    bg: 'from-sky-50 to-cyan-50',
    border: 'border-sky-200 hover:border-sky-400',
    features: [
      '80道深度评估题目',
      '正反向题目 + 交叉验证',
      '详细维度得分 + 可信度报告',
      '适合想要精准了解自己',
    ],
    badge: '推荐',
  },
];

const tips = [
  '没有"正确"或"错误"的答案，选择最贴近真实的反应即可',
  '第一反应往往最准确，无需在单道题上纠结太久',
  '可以随时返回上一题修改，或中途退出，进度会自动保存',
];

export default function IntroPage() {
  const navigate = useNavigate();
  const initTest = useTestStore((s) => s.initTest);
  const [selected, setSelected] = useState<string | null>(null);

  const handleStart = () => {
    if (!selected) return;
    const mode = MODES.find((m) => m.key === selected)!;
    initTest({ questionCount: mode.questions });
    navigate('/test');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:py-12 bg-[#fafafa]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        {/* 标题 */}
        <div className="text-center mb-8">
          <Title level={3} className="!text-xl sm:!text-2xl !font-extrabold !text-[#1a1a2e] !mb-2">
            选择评测模式
          </Title>
          <Text className="!text-sm !text-slate-400">
            根据你的需求选择合适的评测深度
          </Text>
        </div>

        {/* 双模式卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {MODES.map((mode, i) => (
            <motion.div
              key={mode.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Card
                hoverable
                onClick={() => setSelected(mode.key)}
                className={`!rounded-2xl !border-2 !transition-all !cursor-pointer ${
                  selected === mode.key
                    ? `!border-indigo-500 !shadow-lg !shadow-indigo-100 !ring-2 !ring-indigo-100`
                    : `!border-slate-200 !shadow-sm hover:!shadow-md`
                }`}
                styles={{ body: { padding: '20px' } }}
              >
                {/* 推荐标签 */}
                {mode.badge && (
                  <Tag color="red" className="!absolute !top-3 !right-3 !text-[10px] !font-bold !rounded-full">
                    {mode.badge}
                  </Tag>
                )}

                {/* 图标+标题 */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${mode.color}15`, color: mode.color }}
                  >
                    {mode.icon}
                  </div>
                  <div>
                    <div className="font-bold text-[#1a1a2e] text-sm sm:text-base leading-tight">
                      {mode.title}
                    </div>
                    <Text className="!text-xs !text-slate-400">{mode.subtitle}</Text>
                  </div>
                </div>

                {/* 题量和时间 */}
                <div className="flex items-center gap-4 mb-4 text-xs">
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <FileTextOutlined className="text-slate-400" />
                    <span className="font-bold text-base" style={{ color: mode.color }}>{mode.questions}</span>题
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <ClockCircleOutlined className="text-slate-400" />
                    {mode.time}
                  </span>
                </div>

                {/* 特性列表 */}
                <ul className="space-y-1.5">
                  {mode.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-500">
                      <CheckCircleOutlined className="!text-[10px] mt-0.5 flex-shrink-0" style={{ color: mode.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 开始按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: selected ? 1 : 0.4 }}
          className="mb-8"
        >
          <Button
            type="primary"
            size="large"
            block
            disabled={!selected}
            onClick={handleStart}
            className={`!h-14 !text-lg !font-bold !rounded-2xl !shadow-lg !transition-all ${
              selected ? '!shadow-indigo-300/50' : ''
            }`}
            style={
              selected
                ? { background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none' }
                : undefined
            }
          >
            {selected
              ? `开始${MODES.find((m) => m.key === selected)!.title} · ${MODES.find((m) => m.key === selected)!.questions}题`
              : '请先选择评测模式'}
          </Button>
        </motion.div>

        {/* 答题小贴士 */}
        <Card
          className="!rounded-2xl !bg-amber-50 !border-amber-100 !mb-6"
          styles={{ body: { padding: '16px 20px' } }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-500">💡</span>
            <Text className="!text-amber-800 !font-semibold !text-sm">答题小贴士</Text>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {tips.map((t) => (
              <li key={t} className="text-xs sm:text-sm text-amber-700">{t}</li>
            ))}
          </ul>
        </Card>

        {/* 返回按钮 */}
        <Button
          type="default"
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
          block
          className="!h-12 !rounded-2xl !text-slate-500 !font-medium"
        >
          返回首页
        </Button>
      </motion.div>
    </div>
  );
}
