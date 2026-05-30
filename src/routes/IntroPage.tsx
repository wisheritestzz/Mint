import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Tag } from 'antd';
import { ThunderboltOutlined, ExperimentOutlined, ClockCircleOutlined, FileTextOutlined, ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useTestStore } from '../store/testStore';
import { useI18n } from '../i18n/context';

const { Title, Text } = Typography;

export default function IntroPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const initTest = useTestStore((s) => s.initTest);
  const [selected, setSelected] = useState<string | null>(null);

  const MODES = [
    { key: 'quick', icon: <ThunderboltOutlined />, title: t('intro.quickTitle'), subtitle: t('intro.quickSub'), questions: 50, time: '8-10', color: '#6366f1',
      features: [t('intro.quickF1'), t('intro.quickF2'), t('intro.quickF3'), t('intro.quickF4')] },
    { key: 'pro', icon: <ExperimentOutlined />, title: t('intro.proTitle'), subtitle: t('intro.proSub'), questions: 80, time: '15-18', color: '#0ea5e9',
      features: [t('intro.proF1'), t('intro.proF2'), t('intro.proF3'), t('intro.proF4')], badge: t('intro.proBadge') },
  ];

  const handleStart = () => {
    if (!selected) return;
    const mode = MODES.find((m) => m.key === selected)!;
    initTest({ questionCount: mode.questions });
    navigate('/test');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:py-12 bg-[#fafafa]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Title level={3} className="!text-xl sm:!text-2xl !font-extrabold !text-[#1a1a2e] !mb-2">{t('intro.title')}</Title>
          <Text className="!text-sm !text-slate-400">{t('intro.subtitle')}</Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {MODES.map((mode, i) => (
            <motion.div key={mode.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
              <Card hoverable onClick={() => setSelected(mode.key)}
                className={`!rounded-2xl !border-2 !transition-all !cursor-pointer ${selected === mode.key ? '!border-indigo-500 !shadow-lg !shadow-indigo-100 !ring-2 !ring-indigo-100' : '!border-slate-200 !shadow-sm hover:!shadow-md'}`}
                styles={{ body: { padding: '20px' } }}>
                {mode.badge && <Tag color="red" className="!absolute !top-3 !right-3 !text-[10px] !font-bold !rounded-full">{mode.badge}</Tag>}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${mode.color}15`, color: mode.color }}>{mode.icon}</div>
                  <div>
                    <div className="font-bold text-[#1a1a2e] text-sm sm:text-base leading-tight">{mode.title}</div>
                    <Text className="!text-xs !text-slate-400">{mode.subtitle}</Text>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4 text-xs">
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <FileTextOutlined className="text-slate-400" />
                    <span className="font-bold text-base" style={{ color: mode.color }}>{mode.questions}</span>{t('intro.questionsUnit')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <ClockCircleOutlined className="text-slate-400" />{mode.time}{t('intro.time')}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {mode.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-500">
                      <CheckCircleOutlined className="!text-[10px] mt-0.5 flex-shrink-0" style={{ color: mode.color }} />{f}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: selected ? 1 : 0.4 }} className="mb-8">
          <Button type="primary" size="large" block disabled={!selected} onClick={handleStart}
            className={`!h-14 !text-lg !font-bold !rounded-2xl !shadow-lg !transition-all ${selected ? '!shadow-indigo-300/50' : ''}`}
            style={selected ? { background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none' } : undefined}>
            {selected ? `${t('intro.startPrefix')}${MODES.find((m) => m.key === selected)!.title} · ${MODES.find((m) => m.key === selected)!.questions}${t('intro.questionsUnit')}` : t('intro.selectHint')}
          </Button>
        </motion.div>

        <Card className="!rounded-2xl !bg-amber-50 !border-amber-100 !mb-6" styles={{ body: { padding: '16px 20px' } }}>
          <div className="flex items-center gap-2 mb-2">
            <span>💡</span><Text className="!text-amber-800 !font-semibold !text-sm">{t('intro.tipsTitle')}</Text>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {['intro.tip1', 'intro.tip2', 'intro.tip3'].map((k) => (
              <li key={k} className="text-xs sm:text-sm text-amber-700">{t(k)}</li>
            ))}
          </ul>
        </Card>

        <Button type="default" size="large" icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} block
          className="!h-12 !rounded-2xl !text-slate-500 !font-medium">{t('intro.backBtn')}</Button>
      </motion.div>
    </div>
  );
}
