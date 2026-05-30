import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Modal } from 'antd';
import { ThunderboltOutlined, SafetyCertificateOutlined, SmileOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useTestStore } from '../store/testStore';
import { getTypeMeta } from '../logic/constants';

const { Title, Text } = Typography;

// 四大气质分组
const TEMPERAMENTS = [
  { name: '分析师', emoji: '🧠', types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'], desc: '理性·战略·创新' },
  { name: '外交家', emoji: '🌿', types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'], desc: '共情·理想·激励' },
  { name: '守护者', emoji: '🛡️', types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'], desc: '务实·可靠·秩序' },
  { name: '探险家', emoji: '🔥', types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'], desc: '灵活·敏锐·行动' },
];

const highlights = [
  { icon: <ThunderboltOutlined />, text: '无需登录，即刻测试' },
  { icon: <SafetyCertificateOutlined />, text: '科学题库，精准评估' },
  { icon: <SmileOutlined />, text: '简洁高效，体验至上' },
];

const testimonials = [
  '"测试结果太准了！完全符合我的性格特点"',
  '"做了很多MBTI测试，这是我体验最好的一次"',
];

export default function HomePage() {
  const navigate = useNavigate();
  const hasValidCache = useTestStore((s) => s.hasValidCache);
  const loadFromCache = useTestStore((s) => s.loadFromCache);
  const clearCache = useTestStore((s) => s.clearCache);

  const [showResumeModal, setShowResumeModal] = useState(false);

  const handleStart = () => {
    if (hasValidCache()) {
      setShowResumeModal(true);
    } else {
      navigate('/intro');
    }
  };

  const handleResume = () => {
    loadFromCache();
    setShowResumeModal(false);
    navigate('/test');
  };

  const handleNewTest = () => {
    clearCache();
    setShowResumeModal(false);
    navigate('/intro');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Logo / Icon */}
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-200">
              <span className="text-3xl sm:text-4xl text-white font-bold tracking-tighter">
                MB
              </span>
            </div>
          </div>

          {/* 主标题 */}
          <Title
            level={2}
            className="!text-2xl sm:!text-3xl lg:!text-4xl !font-extrabold !text-[#1a1a2e] !mb-3"
          >
            MBTI 性格测试
          </Title>
          <Text className="!text-sm sm:!text-base lg:!text-lg !text-slate-500 block max-w-md mx-auto !mb-8">
            基于荣格心理学理论，科学评估你的性格类型
            <br className="hidden sm:block" />
            50道精选题目，带你发现真实的自己
          </Text>

          {/* CTA 按钮 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mb-8"
          >
            <Button
              type="primary"
              size="large"
              onClick={handleStart}
              className="!h-14 sm:!h-16 !px-10 sm:!px-16 !text-lg sm:!text-xl !font-bold !rounded-2xl !shadow-lg !shadow-indigo-300/50 hover:!shadow-xl hover:!shadow-indigo-400/60"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                border: 'none',
              }}
            >
              开始测试
            </Button>
          </motion.div>

          {/* 核心优势 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
            {highlights.map((h) => (
              <div
                key={h.text}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/80 backdrop-blur border border-slate-100 shadow-sm"
              >
                <span className="text-indigo-500 text-lg">{h.icon}</span>
                <span className="text-sm text-slate-600 font-medium">{h.text}</span>
              </div>
            ))}
          </div>

          {/* 流程说明 */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-sm text-slate-400 mb-10">
            <span className="bg-slate-100 px-3 py-1.5 rounded-full font-medium text-slate-600">
              1. 点击开始
            </span>
            <span className="text-slate-300">→</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-full font-medium text-slate-600">
              2. 完成答题
            </span>
            <span className="text-slate-300">→</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-full font-medium text-slate-600">
              3. 查看结果
            </span>
          </div>

          {/* 16种人格类型图谱 */}
          <div className="mb-10 w-full max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <Title level={4} className="!text-base sm:!text-lg !font-bold !text-[#1a1a2e] !mb-1">
                16种人格类型图谱
              </Title>
              <Text className="!text-xs sm:!text-sm !text-slate-400">
                了解全部人格类型，看看你属于哪一种
              </Text>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TEMPERAMENTS.map((group) => (
                <motion.div
                  key={group.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                >
                  <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-50 flex items-center gap-2">
                    <span className="text-base">{group.emoji}</span>
                    <span className="font-semibold text-sm text-slate-700">{group.name}</span>
                    <span className="text-[10px] text-slate-400 ml-auto">{group.desc}</span>
                  </div>
                  <div className="p-3 grid grid-cols-2 gap-2">
                    {group.types.map((type) => {
                      const meta = getTypeMeta(type);
                      return (
                        <div
                          key={type}
                          className="flex flex-col items-center py-2 px-2 rounded-xl transition-colors hover:bg-slate-50"
                        >
                          <span
                            className="text-sm font-extrabold tracking-tight mb-0.5"
                            style={{ color: meta.color }}
                          >
                            {type}
                          </span>
                          <span className="text-[10px] text-slate-400 text-center leading-tight">
                            {meta.tag}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 用户评价 */}
          <div className="space-y-2 mb-12">
            {testimonials.map((t, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.2 }}
                className="text-xs sm:text-sm text-slate-400 italic"
              >
                {t}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 px-4 border-t border-slate-100">
        <Text className="!text-xs !text-slate-400">
          本测试不收集任何个人信息，测试数据仅存储在您的浏览器中
        </Text>
      </footer>

      {/* 缓存续答弹窗 */}
      <Modal
        open={showResumeModal}
        onCancel={() => setShowResumeModal(false)}
        footer={null}
        title="发现未完成的测试"
        className="!rounded-2xl"
        styles={{ body: { padding: '16px 24px 24px' } }}
      >
        <Text className="!text-slate-500 !text-sm block !mb-6">
          检测到你有未完成的测试进度，是否需要继续答题？
        </Text>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="primary"
            size="large"
            onClick={handleResume}
            className="!flex-1 !h-12 !rounded-xl !font-bold"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none' }}
          >
            继续上次答题
          </Button>
          <Button
            size="large"
            onClick={handleNewTest}
            className="!flex-1 !h-12 !rounded-xl !font-medium"
          >
            重新开始
          </Button>
        </div>
      </Modal>
    </div>
  );
}
