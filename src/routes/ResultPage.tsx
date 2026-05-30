import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Card, Divider, message, Spin } from 'antd';
import {
  ReloadOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  HomeOutlined,
  HistoryOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useResultStore } from '../store/resultStore';
import { useTestStore } from '../store/testStore';
import { useIsMobile } from '../hooks/useResponsive';
import { useI18n } from '../i18n/context';
import {
  getDimLabel,
  getPoleLabel,
  getDimInterpretation,
  getTypeMeta,
} from '../logic/constants';

const LazyChart = lazy(() => import('echarts-for-react'));

const { Title, Text, Paragraph } = Typography;

export default function ResultPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t, lang } = useI18n();
  const printRef = useRef<HTMLDivElement>(null);

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

  const meta = getTypeMeta(currentResult.type, lang);

  // ECharts 维度图表配置
  const chartOption = {
    grid: { left: 12, right: 24, top: 8, bottom: 8 },
    xAxis: { type: 'value', max: 65, axisLabel: { show: false }, splitLine: { show: false } },
    yAxis: {
      type: 'category',
      data: currentResult.dimensionScores.map(
        (ds) => getDimLabel(ds.dimension, lang),
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
          name: getPoleLabel(ds.leftPole, lang),
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
          name: getPoleLabel(ds.rightPole, lang),
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

  // 截图（动态加载 html2canvas）
  const handleScreenshot = async () => {
    if (!printRef.current) return;
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `MBTI-${currentResult.type}-${Date.now()}.png`;
      link.click();
      message.success(t('result.screenshotOk'));
    } catch {
      message.error(t('result.pdfFail'));
    }
  };

  // PDF 下载（动态加载 html2canvas + jsPDF）
  const handlePDF = async () => {
    if (!printRef.current) return;
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const dataUrl = canvas.toDataURL('image/png');

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

      pdf.save(`MBTI-${currentResult.type}-${meta.tag}.pdf`);
      message.success(t('result.pdfOk'));
    } catch {
      message.error(t('result.pdfFail'));
    }
  };

  // 分享
  const handleShare = async () => {
    const shareText = `${t('result.shareMsg')} ${currentResult.type}（${meta.tag}）！${t('result.shareMsg2')}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'MBTI Personality Test', text: shareText, url: window.location.origin });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      message.success(t('result.shareCopied'));
    }
  };

  // 重新测试
  const handleRetry = () => {
    clearResult();
    initTest();
    navigate('/test');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8 sm:py-12 px-4">
      {/* 可打印区域：仅包含结果内容 */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 mb-8" ref={printRef}>
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
            {meta.tag}
          </Text>
          <div className="mt-2">
            <Text className="!text-sm !text-slate-400">
              {meta.dimensions}
            </Text>
          </div>
        </motion.div>

        {/* 可信度标识 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-4"
        >
          {(() => {
            const clearCount = currentResult.dimensionScores.filter((ds) => !ds.ambiguous).length;
            if (clearCount === 4) {
              return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {t('result.confHigh')}
                </span>
              );
            } else if (clearCount >= 2) {
              return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {4 - clearCount}{t('result.confMid')}
                </span>
              );
            } else {
              return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  {t('result.confLow')}
                </span>
              );
            }
          })()}
        </motion.div>

        {/* 维度得分图表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <Card className="!rounded-2xl !border !border-slate-100 !shadow-sm !mb-6">
            <div className="flex items-center justify-between mb-3">
              <Text className="!font-semibold !text-[#1a1a2e] !text-sm sm:!text-base">
                {t('result.scoreTitle')}
              </Text>
              <Text className="!text-xs !text-slate-400">
                {t('result.scoreMax')} {currentResult.dimensionScores[0].leftScore + currentResult.dimensionScores[0].rightScore} {t('result.scorePerDim')}
              </Text>
            </div>

            {/* 用 Ant Design Progress 展示每个维度的得分对比 */}
            <div className="space-y-3 mb-4">
              {currentResult.dimensionScores.map((ds) => {
                const total = ds.leftScore + ds.rightScore;
                const leftPct = Math.round((ds.leftScore / total) * 100);
                const margin = Math.abs(ds.leftScore - ds.rightScore);
                const maxPole = ds.leftScore >= ds.rightScore ? ds.leftPole : ds.rightPole;

                return (
                  <div key={ds.dimension}>
                    <div className="flex items-center justify-between mb-1">
                      <Text className="!text-xs !font-medium !text-slate-600">
                        {getDimLabel(ds.dimension, lang)}
                      </Text>
                      <Text className={`!text-xs !font-medium ${ds.ambiguous ? '!text-amber-500' : '!text-emerald-600'}`}>
                        {getPoleLabel(maxPole, lang).split(' ')[0]} {t('result.poleLean')}
                        {ds.ambiguous ? ` (${t('result.poleAmbiguous')})` : ''}
                        <span className="ml-1 text-slate-400">{t('result.scoreDiff')}{margin}{t('result.scoreUnit')}</span>
                      </Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <Text className="!text-xs !text-slate-400 !w-6 text-right !flex-shrink-0">
                        {getPoleLabel(ds.leftPole, lang).split(' ')[0]}
                      </Text>
                      <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden flex">
                        <div
                          className="h-full transition-all duration-700"
                          style={{
                            width: `${leftPct}%`,
                            background: leftPct >= 50
                              ? `linear-gradient(90deg, ${currentResult.color}cc, ${currentResult.color})`
                              : '#cbd5e1',
                            borderRadius: leftPct > 50 ? '9999px 0 0 9999px' : '9999px',
                          }}
                        />
                        <div
                          className="h-full transition-all duration-700"
                          style={{
                            width: `${100 - leftPct}%`,
                            background: leftPct < 50
                              ? `linear-gradient(90deg, ${currentResult.color}, ${currentResult.color}cc)`
                              : '#e2e8f0',
                            borderRadius: leftPct < 50 ? '0 9999px 9999px 0' : '9999px',
                          }}
                        />
                      </div>
                      <Text className="!text-xs !text-slate-400 !w-6 !flex-shrink-0">
                        {getPoleLabel(ds.rightPole, lang).split(' ')[0]}
                      </Text>
                    </div>
                    <div className="flex justify-between mt-1">
                      <Text className="!text-[10px] !text-slate-400">{ds.leftScore}分</Text>
                      <div
                        className="w-px h-3"
                        style={{
                          marginLeft: `${leftPct}%`,
                          background: ds.ambiguous ? '#f59e0b' : '#10b981',
                        }}
                      />
                      <Text className="!text-[10px] !text-slate-400">{ds.rightScore}分</Text>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ECharts 横向对比图 */}
            <Text className="!text-xs !text-slate-400 block !mb-2">{t('result.chartTitle')}</Text>
            <Suspense fallback={<div className="flex items-center justify-center" style={{ height: isMobile ? 140 : 180 }}><Spin size="small" /></div>}>
              <LazyChart
                option={chartOption}
                style={{ height: isMobile ? 140 : 180 }}
                opts={{ renderer: 'svg' }}
              />
            </Suspense>
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
              {t('result.interpretTitle')}
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
              {t('result.detailTitle')}
            </Text>
            {currentResult.dimensionScores.map((ds) => (
              <div key={ds.dimension} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Text className="!font-semibold !text-sm !text-[#1a1a2e]">
                    {getDimLabel(ds.dimension, lang)}
                  </Text>
                  <Text className="!text-xs !text-indigo-500 !font-medium">
                    {getPoleLabel(ds.dominant, lang)}
                    {ds.ambiguous ? ` (${t('result.poleAmbiguous')})` : ''}
                  </Text>
                </div>
                <Paragraph className="!text-xs sm:!text-sm !text-slate-500 !leading-relaxed !mb-0">
                  {getDimInterpretation(ds.dimension, ds.dominant, lang)}
                </Paragraph>
                {currentResult.dimensionScores.indexOf(ds) < 3 && (
                  <Divider className="!my-3" />
                )}
              </div>
            ))}
          </Card>
        </motion.div>
      </div>{/* 打印区域结束 */}

      {/* 反馈 + 操作按钮（不包含在截图/PDF中） */}
      <div className="max-w-2xl mx-auto">
        {/* 反馈入口 */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Card className="!rounded-2xl !border !border-slate-100 !shadow-sm !mb-6 !bg-slate-50">
              <Text className="!text-sm !text-slate-500 block !mb-3 !text-center">{t('result.feedback')}</Text>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => { message.success(t('result.feedbackThanks')); setShowFeedback(false); }}
                  className="!rounded-xl !font-medium">{t('result.feedbackYes')}</Button>
                <Button
                  onClick={() => { message.info(t('result.feedbackThanksNo')); setShowFeedback(false); }}
                  className="!rounded-xl !font-medium">{t('result.feedbackNo')}</Button>
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
            <Button icon={<ShareAltOutlined />} onClick={handleShare} className="!rounded-xl !font-medium !h-12">{t('result.share')}</Button>
            <Button icon={<CameraOutlined />} onClick={handleScreenshot} className="!rounded-xl !font-medium !h-12">{t('result.screenshot')}</Button>
            <Button icon={<DownloadOutlined />} onClick={handlePDF} className="!rounded-xl !font-medium !h-12">{t('result.pdf')}</Button>
            <Button icon={<HistoryOutlined />} onClick={() => setShowHistory(!showHistory)} className="!rounded-xl !font-medium !h-12">{t('result.history')}</Button>
          </div>

          <Button type="primary" size="large" icon={<ReloadOutlined />} onClick={handleRetry} block
            className="!h-14 !text-lg !font-bold !rounded-2xl !shadow-lg !shadow-indigo-300/50"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none' }}>{t('result.retry')}</Button>
          <Button icon={<HomeOutlined />} onClick={() => navigate('/')} block
            className="!h-12 !rounded-2xl !text-slate-500 !font-medium">{t('result.home')}</Button>
        </motion.div>

        {/* 历史记录 */}
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <Card
              title={t('result.historyTitle')}
              className="!rounded-2xl !border !border-slate-100 !shadow-sm !mb-6"
            >
              {history.length === 0 ? (
                <Text className="!text-sm !text-slate-400">{t('result.historyEmpty')}</Text>
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
