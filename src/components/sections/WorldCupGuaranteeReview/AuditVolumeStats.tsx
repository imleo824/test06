import React from 'react';
import { motion } from 'motion/react';
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
  const avgSystemPct = (totalSystem / totalAudit) * 100;
  const avgManualPct = (totalManual / totalAudit) * 100;
  
  const dailyAvg = totalAudit / auditVolumeData.length;
  const dailySystemAvg = totalSystem / auditVolumeData.length;
  const dailyManualAvg = totalManual / auditVolumeData.length;

  const headcount = 409;
  const sjbEfficiency = 28.8; // (Tickets / Hour / Person)
  const dailyEfficiency = 12.5; // (Tickets / Hour / Person)
  const efficiencyGrowth = ((sjbEfficiency - dailyEfficiency) / dailyEfficiency) * 100;

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
            4.2.1 审核单量分析 <span className="text-slate-950 font-bold text-base">(只统计SJB期间)</span>
          </h4>
        </div>
      </div>

      <SummaryBox>
        {highlightNumbers(
          `SJB期间日均单量达 [[blue:42,546]]，较日常环比大幅增长 [[green:+165%]]；其中 [[系统自动审核]] 占比 [[blue:80.08%]]。在 [[blue:${headcount} 名]] 审核人员的协作下，通过[[工具赋能]]与[[流程优化]]，人均审核效能从日常的 [[blue:${dailyEfficiency} 单/时]] 提升至 [[green:${sjbEfficiency} 单/时]]（涨幅 [[green:+${efficiencyGrowth.toFixed(1)}%]]）。`,
        )}
      </SummaryBox>

      {/* 拦截汇总指标 (Moved to top as primary indicators) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-600" />
          <div className="flex flex-col h-full pl-1">
            <span className="text-xs font-black text-slate-950 uppercase tracking-wide mb-1.5">总拦截金额 (SJB)</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-slate-950 tabular-nums tracking-tight">
                {totalInterceptAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" />
          <div className="flex flex-col h-full pl-1">
            <span className="text-xs font-black text-slate-950 uppercase tracking-wide mb-1.5">新客拦截金额</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-slate-950 tabular-nums tracking-tight">
                {totalNewUserAdjustAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" />
          <div className="flex flex-col h-full pl-1">
            <span className="text-xs font-black text-slate-950 uppercase tracking-wide mb-1.5">体育拦截金额</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-slate-950 tabular-nums tracking-tight">
                {totalActivityInterceptAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 汇总指标 (Audit Volume Metrics) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 总审核量 */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex flex-col h-full">
            <span className="text-xs font-black text-slate-950 uppercase tracking-wider mb-2">总审核单量</span>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-black text-slate-950 tabular-nums">
                {totalAudit.toLocaleString()}
              </span>
              <span className="text-xs font-black text-slate-950">单</span>
            </div>
            <div className="mt-auto pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">日均</span>
              <span className="text-sm font-black text-slate-950 tabular-nums">
                {dailyAvg.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        {/* 系统自动审核 */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-950 uppercase tracking-wider">系统审核</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                {avgSystemPct.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-black text-slate-950 tabular-nums">
                {totalSystem.toLocaleString()}
              </span>
              <span className="text-xs font-black text-slate-950">单</span>
            </div>
            <div className="mt-auto pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">日均</span>
              <span className="text-sm font-black text-blue-700 tabular-nums">
                {dailySystemAvg.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        {/* 人工审核量 */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-950 uppercase tracking-wider">人工审核</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                {avgManualPct.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-black text-slate-950 tabular-nums">
                {totalManual.toLocaleString()}
              </span>
              <span className="text-xs font-black text-slate-950">单</span>
            </div>
            <div className="mt-auto pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">日均</span>
              <span className="text-sm font-black text-amber-700 tabular-nums">
                {dailyManualAvg.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        {/* 人均效能 */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-950 uppercase tracking-wider">人均效能</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                +{efficiencyGrowth.toFixed(0)}%
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-black text-slate-950 tabular-nums">
                {sjbEfficiency.toFixed(1)}
              </span>
              <span className="text-xs font-black text-slate-950">单/时</span>
            </div>
            <div className="mt-auto pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">日常水平</span>
              <span className="text-sm font-black text-emerald-700 tabular-nums">
                {dailyEfficiency.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 图表展示 */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 h-[420px] shadow-xs">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={auditVolumeData}
            margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
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
            <YAxis 
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }}
              tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(0)}k` : val}
              dx={-5}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#b45309', fontSize: 11, fontWeight: 700 }}
              tickFormatter={(val) => `${val}%`}
              domain={[0, 40]}
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
                          const isPercent = entry.name === '人工比例';
                          return (
                            <div key={index} className="flex flex-col gap-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: entry.color || entry.stroke }} />
                                  <span className="text-xs font-bold text-slate-900">{entry.name}</span>
                                </div>
                                <span className="text-xs font-black text-slate-950 tabular-nums">
                                  {isPercent ? `${entry.value.toFixed(2)}%` : entry.value.toLocaleString()}
                                </span>
                              </div>
                              {!isPercent && (
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
              yAxisId="right"
              type="monotone"
              dataKey="manualPct"
              name="人工比例"
              stroke="#d97706"
              strokeWidth={3}
              dot={{ r: 3, fill: '#fff', stroke: '#d97706', strokeWidth: 2 }}
              activeDot={{ r: 5, fill: '#d97706', stroke: '#fff', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AuditVolumeStats;
