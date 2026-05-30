import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Space } from 'antd';
import {
  ClockCircleOutlined,
  FileTextOutlined,
  BarChartOutlined,
  ArrowLeftOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useTestStore } from '../store/testStore';

const { Title, Text } = Typography;

const rules = [
  {
    icon: <FileTextOutlined />,
    title: '50道精选题目',
    desc: '涵盖精力来源、信息获取、决策方式、生活态度四个维度，全面评估你的性格类型',
  },
  {
    icon: <ClockCircleOutlined />,
    title: '不限答题时间',
    desc: '建议10-15分钟完成，请根据真实情况作答，无需刻意迎合',
  },
  {
    icon: <BarChartOutlined />,
    title: '专业结果解读',
    desc: '你将获得MBTI人格类型、四维度详细得分、专业解读及适配场景分析',
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

  const handleStartTest = () => {
    initTest(false);
    navigate('/test');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        {/* 标题 */}
        <div className="text-center mb-8">
          <Title level={3} className="!text-2xl sm:!text-3xl !font-bold !text-[#1a1a2e] !mb-2">
            测试说明
          </Title>
          <Text className="!text-slate-500 !text-sm sm:!text-base">
            请在舒适的环境中完成测试，确保结果准确有效
          </Text>
        </div>

        {/* 规则卡片 */}
        <div className="space-y-3 mb-8">
          {rules.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Card
                className="!rounded-2xl !border !border-slate-100 !shadow-sm hover:!shadow-md"
                styles={{ body: { padding: '16px 20px' } }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 text-lg">
                    {r.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-[#1a1a2e] text-sm sm:text-base mb-1">
                      {r.title}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {r.desc}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 答题建议 */}
        <Card
          className="!rounded-2xl !bg-amber-50 !border-amber-100 !mb-8"
          styles={{ body: { padding: '16px 20px' } }}
        >
          <Text className="!text-amber-800 !font-semibold !text-sm block !mb-2">
            答题小贴士
          </Text>
          <ul className="list-disc list-inside space-y-1">
            {tips.map((t) => (
              <li key={t} className="text-xs sm:text-sm text-amber-700">
                {t}
              </li>
            ))}
          </ul>
        </Card>

        {/* 按钮组 */}
        <Space direction="vertical" className="w-full">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={handleStartTest}
              className="!w-full !h-14 !text-lg !font-bold !rounded-2xl !shadow-lg !shadow-indigo-300/50"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                border: 'none',
              }}
            >
              开始答题
            </Button>
          </motion.div>

          <Button
            type="default"
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/')}
            className="!w-full !h-12 !rounded-2xl !text-slate-500 !font-medium"
          >
            返回首页
          </Button>
        </Space>
      </motion.div>
    </div>
  );
}
