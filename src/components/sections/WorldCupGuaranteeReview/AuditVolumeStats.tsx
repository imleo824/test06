import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb } from 'lucide-react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { auditVolumeData } from './data';
import { highlightNumbers, SummaryBox } from './utils';

interface AuditVolumeStatsProps {
  totalInterceptAmount?: number;
  totalNewUserAdjustAmount?: number;
  totalActivityInterceptAmount?: number;
}

const AuditVolumeStats: React.FC<AuditVolumeStatsProps> = ({
  totalInterceptAmount = 0,
  totalNewUserAdjustAmount = 0,
  totalActivityInterceptAmount = 0,
}) => {
  const totalAudit = auditVolumeData.reduce((sum, item) => sum + item.total, 0);
  const totalSystem = auditVolumeData.reduce((sum, item) => sum + item.system, 0);
  const totalManual = auditVolumeData.reduce((sum, item) => sum + item.manual, 0);
  const totalDurationSec = auditVolumeData.reduce((sum, item) => sum + item.durationSec, 0);

  const avgSystemPct = (totalSystem / totalAudit) * 100;
  const avgManualPct = (totalManual / totalAudit) * 100;
  
  const dailyAvg = totalAudit / auditVolumeData.length;
  const dailySystemAvg = totalSystem / auditVolumeData.length;
  const dailyManualAvg = totalManual / auditVolumeData.length;

  const avgDurSec = Math.round(totalDurationSec / auditVolumeData.length);
  const avgDurM = Math.floor(avgDurSec / 60);
  const avgDurS = avgDurSec % 60;
  const avgDurStr = `${avgDurM.toString().padStart(2, '0')}:${avgDurS.toString().padStart(2, '0')}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-xs"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full shrink-0" />
            4.2.1 审核提款单量 <span className="text-slate-950 font-bold text-base">(只统计SJB期间)</span>
          </h4>
        </div>
      </div>

      <SummaryBox>
        <div className="space-y-3">
          <p className="text-base text-slate-950 font-bold leading-relaxed">
            {highlightNumbers(
              `SJB期间日均提款单量达 [[blue:${dailyAvg.toLocaleString(undefined, { maximumFractionDigits: 0 })} 单/天]]；其中 [[系统审核]] 占比 [[blue:${avgSystemPct.toFixed(2)}%]]，[[人工审核]] 占比 [[amber:${avgManualPct.toFixed(2)}%]]（日均人工审核 [[amber:${dailyManualAvg.toLocaleString(undefined, { maximumFractionDigits: 0 })} 单/天]]，较5月日常人工审核 [[70,886 单/天]] 环比大增 [[red:+65.61%]]）。尽管受赛事期间新用户激增影响人工复核工作量大幅上升，但订单[[平均审核时长]]依然稳定压制在 [[green:${avgDurStr}]]（8分钟以内），属于良好范围。`,
            )}
          </p>

          <div className="flex items-start gap-2 bg-blue-50/70 p-2.5 rounded-lg border border-blue-100 text-xs sm:text-sm text-blue-950 font-medium">
            <span className="inline-block px-1.5 py-0.5 rounded text-xs font-bold bg-blue-600 text-white shrink-0 mt-0.5">
              后续优化空间
            </span>
            <span className="leading-relaxed">
              {highlightNumbers(
                "针对高峰期偶发的爆单与订单排队积压，后续可开发系统功能将订单按【[[预约&即时]]】进行拆分，优先保障[[即时提款]]用户的审核放行。",
              )}
            </span>
          </div>
          <div className="pt-2 border-t border-blue-100/80">
            <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200/80 text-amber-950 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-950">
                <span className="p-1 rounded-md bg-amber-100 text-amber-600 shrink-0">
                  <Lightbulb className="w-4 h-4" />
                </span>
                <span>
                  {highlightNumbers("本届[[SJB]]如何做到[[单量大幅增加]]但[[审核时效无明显增加]]：")}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                {[
                  {
                    title: "班次调度",
                    content: "[[班次合理调整与分配]]，保障高峰期人力充沛与高效运转",
                  },
                  {
                    title: "前置审核",
                    content: "针对[[大客户及高风险用户]]实施[[前置审核与上标]]（系统预警、人工排查、客户名单等在提款前即已完成大部分审核）",
                  },
                  {
                    title: "工具支持",
                    content: "提供[[快速、批量]]的风控查询工具，实现高效精准的问题定位",
                  },
                  {
                    title: "系统初审",
                    content: "系统审核自动提供[[初审高亮标记]]与[[套利特征提醒]]，大幅提升人工复核效率",
                  },
                  {
                    title: "日常咨询",
                    content: "针对[[流水查询与场馆解锁]]的咨询会影响时效，已将工具和方法对[[WH及YY]]进行培训赋能，来降低用户咨询的链路和等待时长",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-slate-200/60">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div className="leading-snug">
                      <strong className="text-slate-950 font-bold mr-1">{idx + 1}、{item.title}：</strong>
                      <span className="text-slate-700">{highlightNumbers(item.content)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SummaryBox>

      {/* 拦截汇总指标 (Moved to top as primary indicators) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-rose-50/20 border border-rose-200/60 rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="flex flex-col h-full">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">总拦截金额 (SJB)</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-rose-700 font-mono tabular-nums tracking-tight">
                {totalInterceptAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-rose-50/20 border border-rose-200/60 rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="flex flex-col h-full">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">新客拦截金额</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-rose-700 font-mono tabular-nums tracking-tight">
                {totalNewUserAdjustAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-rose-50/20 border border-rose-200/60 rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="flex flex-col h-full">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">TY拦截金额</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-rose-700 font-mono tabular-nums tracking-tight">
                {totalActivityInterceptAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 汇总指标 (Audit Volume Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 日均提款单量 */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-950 uppercase tracking-wider">SJB日均单量</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                提款总规模
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-black text-slate-950 tabular-nums">
                {dailyAvg.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className="text-xs font-black text-slate-950">单/天</span>
            </div>
            <div className="mt-auto pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">累计提款: <span className="text-slate-900 font-bold">{(totalAudit / 10000).toFixed(1)}万单</span></span>
              <span className="font-bold text-slate-500">统计周期: <span className="text-slate-900 font-bold">39天</span></span>
            </div>
          </div>
        </div>

        {/* 系统自动审核 */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-950 uppercase tracking-wider">系统审核</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                占比 {avgSystemPct.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-black text-slate-950 tabular-nums">
                {dailySystemAvg.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className="text-xs font-black text-slate-950">单/天</span>
            </div>
            <div className="mt-auto pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">累计系统: <span className="text-slate-900 font-bold">{(totalSystem / 10000).toFixed(1)}万单</span></span>
              <span className="font-bold text-slate-500">自动放行</span>
            </div>
          </div>
        </div>

        {/* 人工审核量 */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-950 uppercase tracking-wider">人工审核</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                占比 {avgManualPct.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-black text-slate-950 tabular-nums">
                {dailyManualAvg.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className="text-xs font-black text-slate-950">单/天</span>
            </div>
            <div className="mt-auto pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">5月日常人工: <span className="text-slate-900 font-bold">70,886</span></span>
              <span className="font-bold text-slate-500">较5月人工: <span className="text-rose-600 font-bold">+65.6%</span></span>
            </div>
          </div>
        </div>

        {/* 平均审核时长 */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-950 uppercase tracking-wider">平均审核时长</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                压至8分钟内
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-black text-emerald-700 tabular-nums">
                {avgDurStr}
              </span>
              <span className="text-xs font-bold text-slate-500">（{avgDurM}分{avgDurS}秒）</span>
            </div>
            <div className="mt-auto pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">时效控制: <span className="text-emerald-700 font-bold">属于良好范围</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* 图表展示 */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 h-[440px] shadow-xs">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={auditVolumeData}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
            barGap={0}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }}
              minTickGap={20}
              dy={10}
            />
            {/* 左轴：提款单量 */}
            <YAxis 
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              ticks={[0, 100000, 200000, 300000, 400000, 500000]}
              domain={[0, 500000]}
              tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }}
              tickFormatter={(val) => val === 0 ? '0' : `${(val/1000).toFixed(0)}k`}
              dx={-5}
            />
            {/* 右轴：审核时长 */}
            <YAxis 
              yAxisId="rightDuration"
              orientation="right"
              axisLine={false}
              tickLine={false}
              ticks={[0, 120, 240, 360, 480, 600]}
              domain={[0, 600]}
              tick={{ fill: '#059669', fontSize: 11, fontWeight: 700 }}
              tickFormatter={(sec) => {
                const m = Math.floor(sec / 60);
                const s = sec % 60;
                return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
              }}
              dx={5}
            />
            <Tooltip
              cursor={{ fill: '#f1f5f9', opacity: 0.6 }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border border-slate-300 shadow-xl rounded-xl p-3.5 min-w-[220px]">
                      <div className="flex items-center justify-between mb-2.5 pb-1.5 border-b border-slate-200">
                        <span className="text-xs font-bold text-slate-900">{label}</span>
                        <div className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-900">审核日志</div>
                      </div>
                      <div className="space-y-2.5">
                        {payload.map((entry: any, index: number) => {
                          let displayValue = entry.value?.toLocaleString();
                          if (entry.name === '人工比例') {
                            displayValue = `${entry.value.toFixed(2)}%`;
                          } else if (entry.name === '审核时长') {
                            displayValue = entry.payload.durationStr || displayValue;
                          }
                          return (
                            <div key={index} className="flex flex-col gap-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: entry.color || entry.stroke }} />
                                  <span className="text-xs font-bold text-slate-900">{entry.name}</span>
                                </div>
                                <span className="text-xs font-black text-slate-950 tabular-nums">
                                  {displayValue}
                                </span>
                              </div>
                              {(entry.name === '系统单量' || entry.name === '人工单量') && (
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full transition-all duration-500 ease-out rounded-full" 
                                    style={{ 
                                      width: `${entry.name === '系统单量' ? entry.payload.systemPct : entry.payload.manualPct}%`,
                                      backgroundColor: entry.color 
                                    }} 
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">单日总计</span>
                          <span className="text-xs font-black text-slate-950 tabular-nums">{payload[0].payload.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              verticalAlign="top" 
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 25, fontSize: 12, fontWeight: 700, color: '#334155' }}
            />
            <Bar
              yAxisId="left"
              dataKey="system"
              name="系统单量"
              stackId="a"
              fill="#2563eb"
              radius={[0, 0, 0, 0]}
              barSize={24}
            />
            <Bar
              yAxisId="left"
              dataKey="manual"
              name="人工单量"
              stackId="a"
              fill="#d97706"
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
            <Line
              yAxisId="rightDuration"
              type="monotone"
              dataKey="durationSec"
              name="审核时长"
              stroke="#059669"
              strokeWidth={3}
              dot={{ r: 3, fill: '#fff', stroke: '#059669', strokeWidth: 2 }}
              activeDot={{ r: 5, fill: '#059669', stroke: '#fff', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AuditVolumeStats;
