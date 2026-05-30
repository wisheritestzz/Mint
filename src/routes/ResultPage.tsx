import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Card, Divider, message } from 'antd';
import {
  ReloadOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  HomeOutlined,
  HistoryOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { useResultStore } from '../store/resultStore';
import { useTestStore } from '../store/testStore';
import { useIsMobile } from '../hooks/useResponsive';
import { useScreenshot } from '../hooks/useScreenshot';
import {
  DIMENSION_LABELS,
  POLE_LABELS,
  DIMENSION_INTERPRETATION,
  getTypeMeta,
} from '../logic/constants';
import { jsPDF } from 'jspdf';

const { Title, Text, Paragraph } = Typography;

export default function ResultPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { capture } = useScreenshot();
  const resultRef = useRef<HTMLDivElement>(null);

  const currentResult = useResultStore((s) => s.currentResult);
  const history = useResultStore((s) => s.history);
  const loadHistory = useResultStore((s) => s.loadHistory);
  const clearResult = useResultStore((s) => s.clearResult);
  const initTest = useTestStore((s) => s.initTest);

  const [showHistory, setShowHistory] = useState(false);
  const [showFeedback, setShowFeedback] = useState(true);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // 无结果时回首页
  useEffect(() => {
    if (!currentResult) {
      // 尝试从history加载最新的
      if (history.length > 0) {
        // 只能看history列表，不能还原完整result
      } else {
        navigate('/');
      }
    }
  }, [currentResult, history, navigate]);

  if (!currentResult) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Text className="!text-slate-400">加载中...</Text>
      </div>
    );
  }

  const meta = getTypeMeta(currentResult.type);

  // ECharts 维度图表配置
  const chartOption = {
    grid: { left: 12, right: 24, top: 8, bottom: 8 },
    xAxis: { type: 'value', max: 65, axisLabel: { show: false }, splitLine: { show: false } },
    yAxis: {
      type: 'category',
      data: currentResult.dimensionScores.map(
        (ds) => DIMENSION_LABELS[ds.dimension],
      ),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 13, color: '#64748b', fontWeight: 500 },
    },
    series: [
      {
        type: 'bar',
        data: currentResult.dimensionScores.map((ds) => ({
          value: ds.leftScore,
          name: POLE_LABELS[ds.leftPole],
        })),
        itemStyle: {
          color: currentResult.color,
          borderRadius: [0, 4, 4, 0],
        },
        barWidth: 16,
        label: {
          show: true,
          position: 'right',
          formatter: (p: { data: { name: string } }) => p.data.name.split(' ')[0],
          fontSize: 11,
          color: '#64748b',
        },
      },
      {
        type: 'bar',
        data: currentResult.dimensionScores.map((ds) => ({
          value: ds.rightScore,
          name: POLE_LABELS[ds.rightPole],
        })),
        itemStyle: {
          color: '#cbd5e1',
          borderRadius: [0, 4, 4, 0],
        },
        barWidth: 16,
        label: {
          show: true,
          position: 'right',
          formatter: (p: { data: { name: string } }) => p.data.name.split(' ')[0],
          fontSize: 11,
          color: '#94a3b8',
        },
      },
    ],
  };

  // 截图分享
  const handleScreenshot = async () => {
    if (!resultRef.current) return;
    try {
      const dataUrl = await capture(resultRef.current);
      // 创建临时链接用于下载
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `MBTI-${currentResult.type}-${Date.now()}.png`;
      link.click();
      message.success('截图已保存');
    } catch {
      message.error('截图失败，请重试');
    }
  };

  // PDF 下载（用截图方式避免中文字体问题）
  const handlePDF = async () => {
    if (!resultRef.current) return;
    try {
      const dataUrl = await capture(resultRef.current);

      // 加载截图到 Image 对象以获取原始尺寸
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Image load failed'));
        img.src = dataUrl;
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const usableW = pageW - margin * 2;
      const usableH = pageH - margin * 2;

      // 图片在PDF中的尺寸（宽度充满可用区域）
      const pdfImgW = usableW;

      // 每页能容纳的原始图片高度（像素）
      const pxPerMm = img.width / pdfImgW;
      const slicePxH = usableH * pxPerMm;

      const totalPages = Math.ceil(img.height / slicePxH);

      for (let p = 0; p < totalPages; p++) {
        if (p > 0) pdf.addPage();

        const srcY = p * slicePxH;
        const srcH = Math.min(slicePxH, img.height - srcY);
        const slicePdfH = srcH / pxPerMm;

        // 用 canvas 裁剪当前页部分
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = srcH;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, srcY, img.width, srcH, 0, 0, img.width, srcH);
        const sliceDataUrl = canvas.toDataURL('image/png');

        pdf.addImage(sliceDataUrl, 'PNG', margin, margin, pdfImgW, slicePdfH);
      }

      pdf.save(`MBTI-${currentResult.type}-测试报告.pdf`);
      message.success('PDF报告已下载');
    } catch {
      message.error('PDF生成失败，请重试');
    }
  };

  // 分享
  const handleShare = async () => {
    const shareText = `我在MBTI测试中获得了 ${currentResult.type}（${currentResult.tag}）！来看看你是什么类型吧～`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'MBTI性格测试', text: shareText, url: window.location.origin });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      message.success('分享文案已复制到剪贴板');
    }
  };

  // 重新测试
  const handleRetry = () => {
    clearResult();
    initTest(false);
    navigate('/test');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto" ref={resultRef}>
        {/* 核心结果渐显 */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="inline-block mb-4">
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-4xl flex items-center justify-center text-white text-3xl sm:text-4xl font-extrabold tracking-tighter shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${currentResult.color}dd, ${currentResult.color})`,
              }}
            >
              {currentResult.type}
            </div>
          </div>
          <Title level={2} className="!text-3xl sm:!text-4xl !font-extrabold !text-[#1a1a2e] !mb-1">
            {currentResult.type}
          </Title>
          <Text className="!text-lg sm:!text-xl !text-slate-500 !font-medium">
            {currentResult.tag}
          </Text>
          <div className="mt-2">
            <Text className="!text-sm !text-slate-400">
              {meta.dimensions}
            </Text>
          </div>
        </motion.div>

        {/* 维度得分图表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="!rounded-2xl !border !border-slate-100 !shadow-sm !mb-6">
            <Text className="!font-semibold !text-[#1a1a2e] !text-sm sm:!text-base block !mb-3">
              维度得分
            </Text>
            <ReactECharts
              option={chartOption}
              style={{ height: isMobile ? 160 : 200 }}
              opts={{ renderer: 'svg' }}
            />
            {/* 倾向不明显标记 */}
            {currentResult.dimensionScores.some((ds) => ds.ambiguous) && (
              <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
                <Text className="!text-xs !text-amber-700">
                  {currentResult.dimensionScores
                    .filter((ds) => ds.ambiguous)
                    .map((ds) => DIMENSION_LABELS[ds.dimension])
                    .join('、')}
                  {' '}维度倾向不明显，这表明你在该维度上的偏好较为灵活和平衡。
                </Text>
              </div>
            )}
          </Card>
        </motion.div>

        {/* 人格解读 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="!rounded-2xl !border !border-slate-100 !shadow-sm !mb-6">
            <Text className="!font-semibold !text-[#1a1a2e] !text-sm sm:!text-base block !mb-3">
              人格解读
            </Text>
            <Paragraph className="!text-sm !text-slate-600 !leading-relaxed !mb-4">
              {meta.description}
            </Paragraph>
          </Card>
        </motion.div>

        {/* 各维度详细解读 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Card className="!rounded-2xl !border !border-slate-100 !shadow-sm !mb-6">
            <Text className="!font-semibold !text-[#1a1a2e] !text-sm sm:!text-base block !mb-4">
              详细维度解读
            </Text>
            {currentResult.dimensionScores.map((ds) => (
              <div key={ds.dimension} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Text className="!font-semibold !text-sm !text-[#1a1a2e]">
                    {DIMENSION_LABELS[ds.dimension]}
                  </Text>
                  <Text className="!text-xs !text-indigo-500 !font-medium">
                    {POLE_LABELS[ds.dominant]}
                    {ds.ambiguous ? ' (倾向不明显)' : ''}
                  </Text>
                </div>
                <Paragraph className="!text-xs sm:!text-sm !text-slate-500 !leading-relaxed !mb-0">
                  {DIMENSION_INTERPRETATION[ds.dimension][ds.dominant]}
                </Paragraph>
                {currentResult.dimensionScores.indexOf(ds) < 3 && (
                  <Divider className="!my-3" />
                )}
              </div>
            ))}
          </Card>
        </motion.div>

        {/* 反馈入口 */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Card className="!rounded-2xl !border !border-slate-100 !shadow-sm !mb-6 !bg-slate-50">
              <Text className="!text-sm !text-slate-500 block !mb-3 !text-center">
                这个结果是否符合你的认知？
              </Text>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => {
                    message.success('感谢反馈！我们会持续优化测试精准度');
                    setShowFeedback(false);
                  }}
                  className="!rounded-xl !font-medium"
                >
                  符合
                </Button>
                <Button
                  onClick={() => {
                    message.info('感谢反馈！我们会根据反馈持续优化评分逻辑');
                    setShowFeedback(false);
                  }}
                  className="!rounded-xl !font-medium"
                >
                  不太符合
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="space-y-3 mb-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button
              icon={<ShareAltOutlined />}
              onClick={handleShare}
              className="!rounded-xl !font-medium !h-12"
            >
              分享
            </Button>
            <Button
              icon={<CameraOutlined />}
              onClick={handleScreenshot}
              className="!rounded-xl !font-medium !h-12"
            >
              截图
            </Button>
            <Button
              icon={<DownloadOutlined />}
              onClick={handlePDF}
              className="!rounded-xl !font-medium !h-12"
            >
              PDF
            </Button>
            <Button
              icon={<HistoryOutlined />}
              onClick={() => setShowHistory(!showHistory)}
              className="!rounded-xl !font-medium !h-12"
            >
              历史
            </Button>
          </div>

          <Button
            type="primary"
            size="large"
            icon={<ReloadOutlined />}
            onClick={handleRetry}
            block
            className="!h-14 !text-lg !font-bold !rounded-2xl !shadow-lg !shadow-indigo-300/50"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              border: 'none',
            }}
          >
            重新测试
          </Button>

          <Button
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
            block
            className="!h-12 !rounded-2xl !text-slate-500 !font-medium"
          >
            返回首页
          </Button>
        </motion.div>

        {/* 历史记录 */}
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <Card
              title="最近测试记录"
              className="!rounded-2xl !border !border-slate-100 !shadow-sm !mb-6"
            >
              {history.length === 0 ? (
                <Text className="!text-sm !text-slate-400">暂无历史记录</Text>
              ) : (
                <div className="space-y-2">
                  {history.map((h) => (
                    <div
                      key={h.timestamp}
                      className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50"
                    >
                      <div>
                        <Text className="!font-bold !text-[#1a1a2e] !text-sm">
                          {h.type}
                        </Text>
                        <Text className="!text-xs !text-slate-400 !ml-2">
                          {h.tag}
                        </Text>
                      </div>
                      <Text className="!text-xs !text-slate-400">
                        {new Date(h.timestamp).toLocaleDateString('zh-CN')}
                      </Text>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
