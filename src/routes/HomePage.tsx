import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Modal, Divider } from 'antd';
import { ThunderboltOutlined, SafetyCertificateOutlined, SmileOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useTestStore } from '../store/testStore';
import { getTypeMeta } from '../logic/constants';

const { Title, Text } = Typography;

const ALL_16_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

const highlights = [
  { icon: <ThunderboltOutlined />, text: '无需登录' },
  { icon: <SafetyCertificateOutlined />, text: '科学精准' },
  { icon: <SmileOutlined />, text: '极致体验' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const hasValidCache = useTestStore((s) => s.hasValidCache);
  const loadFromCache = useTestStore((s) => s.loadFromCache);
  const clearCache = useTestStore((s) => s.clearCache);

  const [showResumeModal, setShowResumeModal] = useState(false);

  const handleStart = () => {
    if (hasValidCache()) setShowResumeModal(true);
    else navigate('/intro');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* ====== Hero ====== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* 简洁图标 */}
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-200/50 mb-6">
            <span className="text-2xl sm:text-3xl text-white font-extrabold tracking-tighter">MB</span>
          </div>

          <Title className="!text-2xl sm:!text-3xl !font-extrabold !text-[#1a1a2e] !mb-2 !tracking-tight">
            MBTI 性格测试
          </Title>
          <Text className="!text-sm sm:!text-base !text-slate-400 block max-w-sm mx-auto !mb-7">
            基于荣格心理学 · 100题科学题库 · 精准人格分析
          </Text>

          {/* CTA */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="mb-10">
            <Button
              type="primary"
              size="large"
              onClick={handleStart}
              className="!h-14 sm:!h-16 !px-12 sm:!px-16 !text-lg !font-bold !rounded-2xl !shadow-lg !shadow-indigo-300/30"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none' }}
            >
              开始测试
            </Button>
          </motion.div>

          {/* 三要素 + 流程 合一行 */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs sm:text-sm text-slate-400 mb-12">
            {highlights.map((h) => (
              <span key={h.text} className="inline-flex items-center gap-1.5">
                <span className="text-indigo-400">{h.icon}</span>
                <span className="text-slate-500 font-medium">{h.text}</span>
              </span>
            ))}
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-slate-400">
              <span className="text-slate-500 font-medium">1.</span> 开始
              <span className="mx-1.5 text-slate-300">→</span>
              <span className="text-slate-500 font-medium">2.</span> 答题
              <span className="mx-1.5 text-slate-300">→</span>
              <span className="text-slate-500 font-medium">3.</span> 结果
            </span>
          </div>
        </motion.div>

        {/* ====== 16型图谱 ====== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <Divider className="!my-6">
            <Text className="!text-xs !text-slate-300 !font-medium !uppercase !tracking-wider">
              人格类型图谱
            </Text>
          </Divider>

          {/* 4列桌面 / 2列手机 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 max-w-3xl mx-auto">
            {ALL_16_TYPES.map((type, i) => {
              const meta = getTypeMeta(type);
              return (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.03 }}
                  className="group relative rounded-xl py-3 px-2 cursor-default transition-all hover:scale-[1.03] hover:shadow-md hover:z-10"
                  style={{ backgroundColor: `${meta.color}08` }}
                >
                  <span
                    className="block text-sm sm:text-base font-extrabold tracking-tight transition-colors"
                    style={{ color: meta.color }}
                  >
                    {type}
                  </span>
                  <span className="block text-[10px] sm:text-xs text-slate-400 mt-0.5 leading-tight group-hover:text-slate-600 transition-colors">
                    {meta.tag}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-5 px-4 border-t border-slate-100 bg-white/50">
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
            onClick={() => { loadFromCache(); setShowResumeModal(false); navigate('/test'); }}
            className="!flex-1 !h-12 !rounded-xl !font-bold"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none' }}
          >
            继续上次
          </Button>
          <Button
            size="large"
            onClick={() => { clearCache(); setShowResumeModal(false); navigate('/intro'); }}
            className="!flex-1 !h-12 !rounded-xl !font-medium"
          >
            重新开始
          </Button>
        </div>
      </Modal>
    </div>
  );
}
