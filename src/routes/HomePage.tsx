import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Modal, Divider, Switch } from 'antd';
import { ThunderboltOutlined, SafetyCertificateOutlined, SmileOutlined, CloseOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useTestStore } from '../store/testStore';
import { getTypeMeta } from '../logic/constants';
import { useI18n } from '../i18n/context';

const { Title, Text, Paragraph } = Typography;

const ALL_16_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

const highlights = [
  { icon: <ThunderboltOutlined />, k: 'home.noLogin' },
  { icon: <SafetyCertificateOutlined />, k: 'home.scientific' },
  { icon: <SmileOutlined />, k: 'home.experience' },
];

export default function HomePage() {
  const { t, lang, setLang } = useI18n();
  const navigate = useNavigate();
  const hasValidCache = useTestStore((s) => s.hasValidCache);
  const loadFromCache = useTestStore((s) => s.loadFromCache);
  const clearCache = useTestStore((s) => s.clearCache);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleStart = () => {
    if (hasValidCache()) setShowResumeModal(true);
    else navigate('/intro');
  };

  const typeMeta = selectedType ? getTypeMeta(selectedType) : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
          {/* 语言切换 */}
          <div className="flex justify-end mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className={`text-xs font-medium transition-colors ${lang === 'zh' ? 'text-indigo-600' : 'text-slate-400'}`}>中</span>
              <Switch
                size="small"
                checked={lang === 'en'}
                onChange={(v) => setLang(v ? 'en' : 'zh')}
              />
              <span className={`text-xs font-medium transition-colors ${lang === 'en' ? 'text-indigo-600' : 'text-slate-400'}`}>EN</span>
            </div>
          </div>

          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-200/50 mb-6">
            <span className="text-2xl sm:text-3xl text-white font-extrabold tracking-tighter">MB</span>
          </div>

          <Title className="!text-2xl sm:!text-3xl !font-extrabold !text-[#1a1a2e] !mb-2 !tracking-tight">
            {t('home.title')}
          </Title>
          <Text className="!text-sm sm:!text-base !text-slate-400 block max-w-sm mx-auto !mb-2">
            {t('home.subtitle')}
          </Text>
          <div className="mb-7">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100">
              {t('home.credibility')}
            </span>
          </div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="mb-10">
            <Button type="primary" size="large" onClick={handleStart}
              className="!h-14 sm:!h-16 !px-12 sm:!px-16 !text-lg !font-bold !rounded-2xl !shadow-lg !shadow-indigo-300/30"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none' }}>
              {t('home.startBtn')}
            </Button>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs sm:text-sm text-slate-400 mb-12">
            {highlights.map((h) => (
              <span key={h.k} className="inline-flex items-center gap-1.5">
                <span className="text-indigo-400">{h.icon}</span>
                <span className="text-slate-500 font-medium">{t(h.k)}</span>
              </span>
            ))}
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-slate-400">
              <span className="text-slate-500 font-medium">1.</span> {t('home.step1')}
              <span className="mx-1.5 text-slate-300">→</span>
              <span className="text-slate-500 font-medium">2.</span> {t('home.step2')}
              <span className="mx-1.5 text-slate-300">→</span>
              <span className="text-slate-500 font-medium">3.</span> {t('home.step3')}
            </span>
          </div>
        </motion.div>

        {/* 16型图谱 */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-center">
          <Divider className="!my-6">
            <Text className="!text-xs !text-slate-300 !font-medium !uppercase !tracking-wider">
              {t('home.typeChart')}
            </Text>
          </Divider>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 max-w-3xl mx-auto">
            {ALL_16_TYPES.map((type, i) => {
              const meta = getTypeMeta(type);
              return (
                <motion.button key={type}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.03 }}
                  onClick={() => setSelectedType(type)}
                  className="group relative rounded-xl py-3 px-2 cursor-pointer transition-all hover:scale-[1.06] hover:shadow-lg hover:z-10 text-left border-2 border-transparent hover:border-indigo-200"
                  style={{ backgroundColor: `${meta.color}08` }}>
                  <span className="block text-sm sm:text-base font-extrabold tracking-tight" style={{ color: meta.color }}>{type}</span>
                  <span className="block text-[10px] sm:text-xs text-slate-400 mt-0.5 leading-tight group-hover:text-slate-600 transition-colors">{meta.tag}</span>
                  <span className="block text-[9px] text-indigo-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{t('home.typeDetail')}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </main>

      <footer className="text-center py-5 px-4 border-t border-slate-100 bg-white/50">
        <Text className="!text-xs !text-slate-400">{t('home.footer')}</Text>
      </footer>

      {/* 缓存续答弹窗 */}
      <Modal open={showResumeModal} onCancel={() => setShowResumeModal(false)} footer={null}
        title={t('home.resumeTitle')} className="!rounded-2xl"
        styles={{ body: { padding: '16px 24px 24px' } }}>
        <Text className="!text-slate-500 !text-sm block !mb-6">{t('home.resumeMsg')}</Text>
        <div className="flex gap-3">
          <Button type="primary" size="large"
            onClick={() => { loadFromCache(); setShowResumeModal(false); navigate('/test'); }}
            className="!flex-1 !h-12 !rounded-xl !font-bold"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none' }}>{t('home.resumeBtn')}</Button>
          <Button size="large"
            onClick={() => { clearCache(); setShowResumeModal(false); navigate('/intro'); }}
            className="!flex-1 !h-12 !rounded-xl !font-medium">{t('home.restartBtn')}</Button>
        </div>
      </Modal>

      {/* 类型详情弹窗 */}
      <Modal open={!!selectedType} onCancel={() => setSelectedType(null)} footer={null}
        closeIcon={<CloseOutlined />} width={{ xs: '90%', sm: 520 }} className="!rounded-2xl"
        styles={{ body: { padding: '20px 24px 24px' } }}>
        {typeMeta && (
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold shadow-lg flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${typeMeta.color}dd, ${typeMeta.color})` }}>{typeMeta.type}</div>
              <div>
                <Title level={4} className="!text-lg !font-bold !text-[#1a1a2e] !mb-0">{typeMeta.type} · {typeMeta.tag}</Title>
                <Text className="!text-xs !text-slate-400">{typeMeta.dimensions}</Text>
              </div>
            </div>
            <Paragraph className="!text-sm !text-slate-600 !leading-relaxed !mb-4">{typeMeta.description}</Paragraph>
            <div className="mb-4 p-4 rounded-xl bg-slate-50">
              <Text className="!text-xs !font-semibold !text-slate-500 !uppercase !tracking-wider block !mb-2">{t('type.behaviors')}</Text>
              <ul className="space-y-1.5">
                {typeMeta.behaviors.map((b, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-2"><span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>{b}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-indigo-50">
                <Text className="!text-[10px] !font-semibold !text-indigo-400 !uppercase !tracking-wider block !mb-1">{t('type.strengths')}</Text>
                <Text className="!text-xs !text-indigo-700 !leading-relaxed">{typeMeta.strengths}</Text>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50">
                <Text className="!text-[10px] !font-semibold !text-emerald-400 !uppercase !tracking-wider block !mb-1">{t('type.careers')}</Text>
                <Text className="!text-xs !text-emerald-700 !leading-relaxed">{typeMeta.careers}</Text>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
