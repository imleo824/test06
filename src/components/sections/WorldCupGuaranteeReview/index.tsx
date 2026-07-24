import React from "react";
import { CheckCircle2, Shield } from "lucide-react";
import { SubsectionTitle, Card } from "../../ReportSections";
import { InterceptTypeBarChart } from "../../ReportCharts";
import {
  highlightNumbers,
  MetricTile,
  CoreActionHeader,
  SignColoredValue,
  SummaryBox,
} from "./utils";
import {
  killRateBreakdownCards,
  closedLoopNodes,
  closedLoopRelations,
  mobileClosedLoopNodes,
  cEndSteps,
  onlineWarningScenes,
  auditStrategies,
  siteNewUserRiskControlData,
  allMatchTrendData,
  matchTrendSummary,
  matchTrendExtremes,
} from "./data";
import { MatchVolumeRateChart } from "./MatchVolumeRateChart";
import { SystemToolsEffectiveness } from "./SystemToolsEffectiveness";
import AuditVolumeStats from "./AuditVolumeStats";
import { SiteNewUserRiskControlStats } from "./SiteNewUserRiskControlStats";
import { ActivityBonusRatioRiskControlStats } from "./ActivityBonusRatioRiskControlStats";
import { PlaystyleStructureChart } from "./PlaystyleStructureChart";
import { TradingMonitorTable } from "./TradingMonitorTable";

import { BusinessReviewLogic } from "./BusinessReviewLogic";

export const WorldCupGuaranteeReview: React.FC = () => {
  const totalNewUserAdjustAmount = siteNewUserRiskControlData.reduce(
    (sum, item) => sum + item.adjustAmount,
    0,
  );
  const totalActivityInterceptAmount = 7427.77; // Sum of sports interception types (5136.22 + 1359.90 + 637.60 + 264.93 + 28.62 + 0.50 + 0.00)
  const totalInterceptAmount = 12579.89;

  const renderCEndColumnKeyActions = (step: any) => {
    if (step.isSystemWarning) {
      return (
        <div className="space-y-3">
          <div>
            <div className="divide-y divide-slate-100">
              {onlineWarningScenes.map((item, index) => (
                <div key={item.id} className="py-2">
                  <div className="flex items-center gap-2 text-base font-black text-slate-950">
                    <span className="w-5 shrink-0 font-mono text-slate-950">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="truncate">{item.name}</span>
                      <CheckCircle2
                        className="h-4 w-4 text-emerald-500 shrink-0"
                        strokeWidth={3}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (step.isSystemAudit) {
      return (
        <div className="divide-y divide-slate-100">
          {auditStrategies.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center justify-between gap-2 py-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="w-5 shrink-0 text-base font-mono font-black text-slate-950">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="truncate text-base font-black text-slate-950">
                    {item.name}
                  </span>
                  <CheckCircle2
                    className="h-4 w-4 text-emerald-500 shrink-0"
                    strokeWidth={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (step.isSystemDispatch) {
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 mt-2">
          <div className="flex flex-col items-center">
            <div className="rounded-lg bg-blue-100 px-6 py-2 text-sm font-black text-blue-800 text-center shadow-none z-10">
              新进订单
            </div>

            <div className="h-4 w-0.5 bg-slate-300"></div>

            <div className="rounded-lg bg-slate-800 px-6 py-2 text-sm font-black text-white text-center shadow-none z-10">
              判定类型
            </div>

            <div className="h-4 w-0.5 bg-slate-300"></div>

            <div className="flex w-full max-w-[260px] relative">
              {/* Horizontal line connecting the two branches */}
              <div className="absolute left-[25%] right-[25%] top-0 h-0.5 bg-slate-300"></div>
              {/* Vertical lines going down */}
              <div className="absolute left-[25%] top-0 h-4 w-0.5 bg-slate-300"></div>
              <div className="absolute right-[25%] top-0 h-4 w-0.5 bg-slate-300"></div>

              <div className="flex flex-col gap-2 w-1/2 pt-4 px-2 items-center">
                <div className="rounded bg-emerald-100 px-3 py-1.5 text-sm font-black text-emerald-900 text-center w-full z-10 relative">
                  TY订单
                </div>
                <div className="text-slate-800 text-sm font-bold">↓</div>
                <div className="rounded border-2 border-emerald-200 bg-white px-2 py-1.5 text-sm font-black text-slate-950 text-center w-full shadow-none z-10 relative">
                  TY组（34人）
                </div>
              </div>

              <div className="flex flex-col gap-2 w-1/2 pt-4 px-2 items-center">
                <div className="rounded bg-slate-200 px-3 py-1.5 text-sm font-black text-slate-900 text-center w-full z-10 relative">
                  其他类型
                </div>
                <div className="text-slate-800 text-sm font-bold">↓</div>
                <div className="rounded border-2 border-slate-200 bg-white px-2 py-1.5 text-sm font-black text-slate-950 text-center w-full shadow-none z-10 relative">
                  其他组
                </div>
              </div>
            </div>

            <div className="mt-5 text-sm text-slate-950 font-bold text-center bg-slate-100/80 px-4 py-2 rounded-lg border border-slate-200 w-full max-w-[260px]">
              注：系统分单还有很多其他逻辑，这里是说明跟TY相关
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {step.actions?.map((act: string, i: number) => {
          const parts = act.split("|").map((s) => s.trim());
          const title = parts[0];
          const text = parts[1];
          return (
            <div
              key={`${title}-${i}`}
              className="flex items-start gap-2 border-t border-slate-100 pt-2 first:border-t-0 first:pt-0"
            >
              <span className="w-5 shrink-0 text-base font-mono font-black text-slate-950">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <div className="text-base font-black text-slate-950">
                    {title}
                  </div>
                  <CheckCircle2
                    className="h-4 w-4 text-emerald-500 shrink-0"
                    strokeWidth={3}
                  />
                </div>
                <p className="mt-1 text-base font-semibold leading-relaxed text-slate-950">
                  {highlightNumbers(text)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-slate-200/90 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-7 bg-blue-600 rounded-full shrink-0" />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-950">
            1. 数据概览
          </h2>
        </div>
      </div>

      <SummaryBox tone="default">
        {highlightNumbers(
          `赛事场次翻倍（[[104场]] vs [[51场]]），[[总流水]]达 [[green:${matchTrendSummary.totalVolume.toLocaleString()}]]（同比 [[green:+64.5%]]），[[盈利率]]为 [[4.51%]]（同比 [[red:-0.09%]]），[[盈利额]]为 [[green:${matchTrendSummary.totalWinLoss.toLocaleString()}]]（同比 [[green:+61.3%]]）；`,
        )}
      </SummaryBox>

      <div className="space-y-6 mt-4 mb-8">
        <div>
          {/* 核心经营表现指标对比表格 */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-sm">
            <table className="w-full border-collapse text-left text-sm font-semibold">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-100 text-slate-950 font-black uppercase text-xs tracking-wider">
                  <th className="p-4 text-slate-950 font-black">
                    核心指标
                  </th>
                  <th className="p-4 text-blue-800 font-black tracking-wider text-right">
                    本届SJB
                  </th>
                  <th className="p-4 text-slate-800 font-black tracking-wider text-right">
                    上届OZB
                  </th>
                  <th className="p-4 text-slate-950 font-black tracking-wider text-right">
                    对比
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="odd:bg-white even:bg-slate-50/40">
                  <td className="p-4 text-slate-950 font-bold">
                    总场次
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-blue-700 text-right bg-blue-50/40">
                    104 场
                  </td>
                  <td className="p-4 font-mono tabular-nums font-bold text-slate-950 text-right">
                    51 场
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-emerald-700 text-right">
                    +53 场 (+103.9%)
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50/40">
                  <td className="p-4 text-slate-950 font-bold">
                    总流水
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-blue-700 text-right bg-blue-50/40">
                    {matchTrendSummary.totalVolume.toLocaleString()}
                  </td>
                  <td className="p-4 font-mono tabular-nums font-bold text-slate-950 text-right">
                    1,462,828.5
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-emerald-700 text-right">
                    +943,942.5 (+64.5%)
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50/40">
                  <td className="p-4 text-slate-800 font-medium pl-8">
                    ↳ 场均流水
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-blue-700 text-right bg-blue-50/40">
                    23,142.0
                  </td>
                  <td className="p-4 font-mono tabular-nums font-bold text-slate-950 text-right">
                    28,682.9
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-rose-700 text-right">
                    -5,540.9 (-19.3%)
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50/40">
                  <td className="p-4 text-slate-950 font-bold">
                    盈利额
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-blue-700 text-right bg-blue-50/40">
                    {matchTrendSummary.totalWinLoss.toLocaleString()}
                  </td>
                  <td className="p-4 font-mono tabular-nums font-bold text-slate-950 text-right">
                    67,254.7
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-emerald-700 text-right">
                    +41,253.3 (+61.3%)
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50/40">
                  <td className="p-4 text-slate-950 font-bold">
                    盈利率
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-blue-700 text-right bg-blue-50/40">
                    {matchTrendSummary.averageHoldRate.toFixed(2)}%
                  </td>
                  <td className="p-4 font-mono tabular-nums font-bold text-slate-950 text-right">
                    4.60%
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-rose-700 text-right">
                    -0.09%
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50/40">
                  <td className="p-4 text-slate-950 font-bold pl-8">
                    ↳ 全场让球
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-blue-700 text-right bg-blue-50/40">
                    1.11%
                  </td>
                  <td className="p-4 font-mono tabular-nums font-bold text-slate-950 text-right">
                    1.30%
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-rose-700 text-right">
                    -0.19%
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50/40">
                  <td className="p-4 text-slate-950 font-bold pl-8">
                    ↳ 全场大小
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-blue-700 text-right bg-blue-50/40">
                    1.48%
                  </td>
                  <td className="p-4 font-mono tabular-nums font-bold text-slate-950 text-right">
                    1.80%
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-rose-700 text-right">
                    -0.32%
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50/40">
                  <td className="p-4 text-slate-950 font-bold">
                    过盘率（早盘）
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-rose-700 text-right bg-rose-50/40">
                    50.76%
                  </td>
                  <td className="p-4 font-mono tabular-nums font-bold text-slate-950 text-right">
                    42.11%
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-rose-700 text-right">
                    +8.65%
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50/40">
                  <td className="p-4 text-slate-950 font-bold pl-8">
                    ↳ 全场让球
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-rose-700 text-right bg-rose-50/40">
                    49.48%
                  </td>
                  <td className="p-4 font-mono tabular-nums font-bold text-slate-950 text-right">
                    39.13%
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-rose-700 text-right">
                    +10.35%
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50/40">
                  <td className="p-4 text-slate-950 font-bold pl-8">
                    ↳ 全场大小
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-rose-700 text-right bg-rose-50/40">
                    52.00%
                  </td>
                  <td className="p-4 font-mono tabular-nums font-bold text-slate-950 text-right">
                    44.90%
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-rose-700 text-right">
                    +7.10%
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50/40">
                  <td className="p-4 text-slate-950 font-bold">
                    单场最大盈利
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-blue-700 text-right bg-blue-50/40">
                    21,113
                  </td>
                  <td className="p-4 font-mono tabular-nums font-bold text-slate-950 text-right">
                    1,628.8
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-emerald-700 text-right">
                    +19,484.2 (+1,196.2%)
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50/40">
                  <td className="p-4 text-slate-950 font-bold">
                    单场最大亏损
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-rose-700 text-right bg-rose-50/40">
                    -8,483
                  </td>
                  <td className="p-4 font-mono tabular-nums font-bold text-slate-950 text-right">
                    -2,293.3
                  </td>
                  <td className="p-4 font-mono tabular-nums font-black text-rose-700 text-right">
                    -6,189.7 (+269.9%)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-slate-200/90 pb-3 mt-10">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-7 bg-blue-600 rounded-full shrink-0" />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-950">
            2. 投注表现
          </h2>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <SummaryBox>
          <p className="text-base text-slate-950 font-bold leading-relaxed mb-3">
            {highlightNumbers(
              `总流水 [[blue:${matchTrendSummary.totalVolume.toLocaleString()}]]，场均流水 [[blue:23,142]]；其中[[单场最大流水]]达 [[blue:${matchTrendExtremes.maxVolume.volume.toLocaleString()}]]（7/20 西班牙 v 阿根廷 0:0(1:0)），[[单场最小流水]]为 [[blue:${matchTrendExtremes.minVolume.volume.toLocaleString()}]]（6/26 库拉索 v 科特迪瓦 0:2）。`,
            )}
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-950 font-bold">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
              <span>
                {highlightNumbers(
                  "[[按流水结构]]：核心仍由[[全场让球]]（[[blue:25.86%]]）与[[全场大小]]（[[blue:23.56%]]）驱动，[[老玩家]]投注高度集中于核心盘口。",
                )}
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-950 font-bold">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
              <span>
                {highlightNumbers(
                  "[[按人数结构]]：大杯赛[[波胆]]下注比例远超常规联赛；[[老玩家]]偏向主玩法以大博小，[[新玩家]]则倾向高倍数玩法追求[[以小博大]]。",
                )}
              </span>
            </li>
          </ul>
        </SummaryBox>

        <div className="space-y-3 break-inside-avoid">
          <PlaystyleStructureChart />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-slate-200/90 pb-3 mt-10">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-7 bg-blue-600 rounded-full shrink-0" />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-950">
            3. 操盘表现
          </h2>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <SummaryBox>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-base text-slate-950 font-bold leading-relaxed">
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
              <span>
                {highlightNumbers(
                  `1. [[盈利表现]]：[[总盈利额]] [[green:${matchTrendSummary.totalWinLoss.toLocaleString()}]]，[[盈利率]] [[blue:${Number(matchTrendSummary.averageHoldRate).toFixed(2)}%]]`,
                )}
              </span>
            </li>
            <li className="flex items-start gap-2 text-base text-slate-950 font-bold leading-relaxed">
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
              <span>
                {highlightNumbers(
                  `2. [[水钱表现]]：[[预期抽水率]] [[blue:${matchTrendSummary.expectedWaterRate.toFixed(2)}%]]，[[预期水钱]] [[blue:${matchTrendSummary.totalExpectedWater.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}]]，[[实际抽水率]] [[blue:${matchTrendSummary.actualWaterRate.toFixed(2)}%]]，[[实际水钱]] [[blue:${matchTrendSummary.totalActualWater.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}]]，[[抽水差]] [[red:${matchTrendSummary.waterRateDiff.toFixed(2)}%]]，[[水钱差]] [[red:${matchTrendSummary.totalWaterDiff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}]]`,
                )}
              </span>
            </li>
          </ul>
        </SummaryBox>

        <div className="break-inside-avoid">
          {/* 趋势图表组件 - 包含 1. 2. 3. */}
          <MatchVolumeRateChart mode="all" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-slate-200/90 pb-3 mt-10">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-7 bg-blue-600 rounded-full shrink-0" />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-950">
            4. 业务复盘
          </h2>
        </div>
        <div className="flex items-center gap-3 text-sm font-black text-slate-950 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <span>4.1 赛事保障</span>
          <span className="text-slate-300">/</span>
          <span>4.2 关联保障</span>
        </div>
      </div>

      <SummaryBox>
        <p className="text-base text-slate-950 font-bold leading-relaxed">
          {highlightNumbers(
            "在[[SJB前半年]]，即开始[[推进TY风控体系升级]]，强化[[BC端联动]]，在[[业务流程、控制策略与系统数据]]等方面进行[[深度协同]]；对标行业最佳实践，从[[B端操盘源头]]与[[C端TY风控]] 2 个维度进行闭环调优。经过本次赛事检验，阶段性成果[[符合预期]]，为后续[[持续系统迭代]]奠定了信心基础。",
          )}
        </p>
      </SummaryBox>

      <BusinessReviewLogic />

      <SubsectionTitle
        title="4.1 赛事保障"
        rightContent={
          <div className="flex items-center gap-3 text-sm font-black text-slate-950">
            <span>4.1.1 B端操盘监控</span>
            <span className="text-slate-300">/</span>
            <span>4.1.2 C端TY拦截</span>
          </div>
        }
      />

      {/* B端操盘监控 Section */}
      <div className="space-y-6 mb-12">
        <CoreActionHeader index="4.1.1" title="B端操盘监控" />

        <SummaryBox>
          <p className="text-base text-slate-950 font-bold leading-relaxed">
            {highlightNumbers(
              "[[SJB筹备阶段]]即建立[[C端风控监控]]与[[B端操盘协同机制]]。已实现[[异常发现、专人确认与15分钟协同反馈]]的闭环标准化流程；同时推动B端[[赔率联动]]覆盖 90% 以上进球类玩法，保障整体流程运转的高效性。",
            )}
          </p>
        </SummaryBox>

          <div className="space-y-6 break-inside-avoid">
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {mobileClosedLoopNodes.map((item, idx, arr) => {
                return (
                  <div key={`${item.title}-${idx}`} className="space-y-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-none">
                      {item.owner && (
                        <div className="mb-2 text-base font-black text-slate-950">
                          {item.owner}
                        </div>
                      )}
                      {item.label && (
                        <div className="mb-3 text-base font-black text-slate-950">
                          {item.label}
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <h5 className="text-2xl font-black tracking-tight text-slate-950">
                          {item.title}
                        </h5>
                        {item.statusBadge && (
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-sm font-black border ${
                              item.statusBadge.type === "success"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : item.statusBadge.type === "progress"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                          >
                            {item.statusBadge.text}
                          </span>
                        )}
                      </div>
                      {item.text && (
                        <p className="mt-3 text-base font-black leading-relaxed text-slate-950">
                          {highlightNumbers(item.text, "text-slate-950")}
                        </p>
                      )}
                      {item.points && item.points.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 gap-3">
                          {item.points.map((point) => (
                            <div
                              key={point.text}
                              className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3 text-base font-black leading-relaxed text-slate-950 border border-slate-200"
                            >
                              <span>{point.text}</span>
                              {point.tag && (
                                <span
                                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-sm font-black border ${
                                    point.tagType === "auto"
                                      ? "bg-slate-900 text-white border-slate-900"
                                      : "bg-slate-200 text-slate-800 border-slate-300"
                                  }`}
                                >
                                  {point.tag}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {item.note && (
                        <div className="mt-4 text-sm font-bold text-slate-950 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                          {item.note}
                        </div>
                      )}
                      {item.progress && (
                        <div className="mt-4 rounded-xl bg-slate-100 p-4 border border-slate-200">
                          <div className="mb-2 flex items-center justify-between text-base font-black text-slate-950">
                            <span>{item.progress.label}</span>
                            <span className="font-mono">
                              {item.progress.value}%
                            </span>
                          </div>
                          <div className="h-3 overflow-hidden rounded-full bg-white border border-slate-200">
                            <div
                              className="h-full rounded-full bg-slate-950"
                              style={{ width: `${item.progress.value}%` }}
                            />
                          </div>
                          <p className="mt-2 text-base font-black leading-relaxed text-slate-950">
                            {item.progress.desc}
                          </p>
                        </div>
                      )}
                      {item.focus && (
                        <div className="mt-2 rounded-lg bg-slate-50 p-3">
                          <div className="mb-1 text-base font-black text-slate-950">
                            {item.focus.title}
                          </div>
                          <p className="text-base font-black leading-relaxed text-slate-950">
                            {highlightNumbers(item.focus.desc)}
                          </p>
                        </div>
                      )}
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="flex justify-center">
                        <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-base font-black text-slate-950">
                          {closedLoopRelations[idx]} ↓
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="relative hidden pb-12 lg:block">
              <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-3">
                {[
                  {
                    title: "C端",
                    nodes: closedLoopNodes.slice(0, 2),
                    relationOffset: 0,
                    tone: "slate",
                  },
                  {
                    title: "B端",
                    nodes: closedLoopNodes.slice(2, 4),
                    relationOffset: 2,
                    tone: "blue",
                  },
                ].map((group, groupIdx) => (
                  <React.Fragment key={group.title}>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex flex-col h-full">
                      <div className="mb-3 text-center text-base font-black text-slate-950">
                        {group.title}
                      </div>
                      <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 flex-1">
                        {group.nodes.map((node, idx) => {
                          const toneStyle = {
                            title: "text-slate-950",
                            dot: "bg-slate-900",
                            highlight: "text-slate-950",
                          };

                          return (
                            <React.Fragment key={node.title}>
                              <Card
                                padding="none"
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-none h-full flex flex-col"
                              >
                                <div className="border-b border-slate-100 p-4">
                                  <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                      <span
                                        className={`h-4 w-4 rounded-full ${toneStyle.dot}`}
                                      />
                                      <h5
                                        className={`text-xl font-black tracking-tight ${toneStyle.title}`}
                                      >
                                        {node.title}
                                      </h5>
                                    </div>
                                    {node.statusBadge && (
                                      <span
                                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-sm font-black border ${
                                          node.statusBadge.type === "success"
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                            : node.statusBadge.type ===
                                                "progress"
                                              ? "bg-blue-50 text-blue-700 border-blue-200"
                                              : "bg-rose-50 text-rose-700 border-rose-200"
                                        }`}
                                      >
                                        {node.statusBadge.text}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                  <div className="space-y-2">
                                    {node.text && (
                                      <p className="text-base font-black leading-relaxed text-slate-950">
                                        {highlightNumbers(
                                          node.text,
                                          toneStyle.highlight,
                                        )}
                                      </p>
                                    )}
                                    {node.points && node.points.length > 0 && (
                                      <div className="grid grid-cols-1 gap-2 mt-2">
                                        {node.points.map((point) => (
                                          <div
                                            key={point.text}
                                            className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm font-black leading-relaxed text-slate-950 border border-slate-200"
                                          >
                                            <span>{point.text}</span>
                                            {point.tag && (
                                              <span
                                                className={`inline-flex items-center rounded-md px-2 py-0.5 text-sm font-black border ${
                                                  point.tagType === "auto"
                                                    ? "bg-slate-900 text-white border-slate-900"
                                                    : "bg-slate-100 text-slate-800 border-slate-200"
                                                }`}
                                              >
                                                {point.tag}
                                              </span>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    {node.note && (
                                      <div className="mt-2 text-sm font-bold text-slate-950 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                                        {node.note}
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    {node.progress && (
                                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 mt-2">
                                        <div className="mb-2 flex items-center justify-between text-sm font-black text-slate-950 uppercase tracking-widest">
                                          <span>{node.progress.label}</span>
                                          <span className="font-mono text-base">
                                            {node.progress.value}%
                                          </span>
                                        </div>
                                        <div className="h-3 overflow-hidden rounded-full bg-white border border-slate-200">
                                          <div
                                            className="h-full rounded-full bg-slate-950 shadow-none"
                                            style={{
                                              width: `${node.progress.value}%`,
                                            }}
                                          />
                                        </div>
                                        <p className="mt-2 text-sm font-black leading-relaxed text-slate-950">
                                          {node.progress.desc}
                                        </p>
                                      </div>
                                    )}
                                    {node.focus && (
                                      <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 mt-2">
                                        <div className="mb-1 text-sm font-black text-slate-950 uppercase tracking-widest">
                                          {node.focus.title}
                                        </div>
                                        <p className="text-sm font-black leading-relaxed text-slate-950">
                                          {highlightNumbers(node.focus.desc)}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </Card>
                              {idx < group.nodes.length - 1 && (
                                <div className="flex min-w-[62px] items-center justify-center">
                                  <div className="flex w-full items-center">
                                    <div className="h-0.5 flex-1 rounded-full bg-blue-600" />
                                    <span className="mx-1 whitespace-nowrap rounded-full border border-blue-200 bg-white px-2 py-1 text-base font-black text-slate-950">
                                      {
                                        closedLoopRelations[
                                          group.relationOffset
                                        ]
                                      }{" "}
                                      →
                                    </span>
                                    <div className="h-0.5 flex-1 rounded-full bg-blue-600" />
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                    {groupIdx === 0 && (
                      <div className="flex min-w-[76px] items-center justify-center">
                        <div className="flex w-full items-center">
                          <div className="h-0.5 flex-1 rounded-full bg-blue-600" />
                          <span className="mx-1 whitespace-nowrap rounded-full border border-blue-200 bg-white px-2 py-1 text-base font-black text-slate-950">
                            {closedLoopRelations[1]} →
                          </span>
                          <div className="h-0.5 flex-1 rounded-full bg-blue-600" />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-12">
                <div className="absolute bottom-6 left-1/4 h-5 w-0.5 -translate-x-1/2 bg-blue-600" />
                <div className="absolute bottom-6 left-3/4 h-5 w-0.5 -translate-x-1/2 bg-blue-600" />
                <div className="absolute bottom-6 left-1/4 right-1/4 h-0.5 bg-blue-600" />
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full border border-blue-200 bg-white px-3 py-1 text-base font-black text-slate-950">
                  {closedLoopRelations[3]}
                </span>
              </div>
            </div>
          </div>
        </div>

        <TradingMonitorTable />

      {/* C端TY拦截 Section */}
      <div className="space-y-6 mb-12">
        <CoreActionHeader index="4.1.2" title="C端TY拦截" />

        <SummaryBox>
          <p className="text-base text-slate-950 font-bold leading-relaxed">
            {highlightNumbers(
              `SJB期间，全面实施[[系统预警、系统初审、系统分单与人工复审]]的标准化流程，累计拦截TY高危订单金额达 [[green:7,427.77]]，确保高风险订单[[有效拦截]]。`,
            )}
          </p>
        </SummaryBox>

          <div className="space-y-4 break-inside-avoid">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {cEndSteps.map((step, idx) => (
                  <div
                    key={step.stage}
                    className="relative rounded-2xl border border-slate-200 p-4 shadow-none"
                  >
                    <div className="mb-3 flex items-center gap-3 border-b border-slate-100 pb-2">
                      <span className="font-mono text-slate-950 font-extrabold text-xl mr-3 mt-0.5">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h5 className="text-lg font-black tracking-tight text-slate-950">
                          {step.stage}
                        </h5>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <SummaryBox className="my-2 p-3">
                        {highlightNumbers(step.summary)}
                      </SummaryBox>

                      <div>
                        <div className="mb-2 flex items-center justify-between gap-2 border-b border-slate-100 pb-1"></div>
                        {renderCEndColumnKeyActions(step)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* 系统成效分析 */}
            <SystemToolsEffectiveness />

            {/* 拦截类型占比 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-none flex flex-col h-full">
              <div className="border-b border-slate-100 pb-3 mb-4 flex-none">
                <h5 className="text-base md:text-lg font-black text-slate-950 flex items-center gap-2 mb-3">
                  <Shield
                    className="h-4.5 w-4.5 text-slate-950"
                    strokeWidth={2}
                  />
                  <span>TY拦截类型</span>
                </h5>
                <SummaryBox className="mt-2 mb-0 p-3">
                  {highlightNumbers(
                    "异常注单拦截以[[TY打水]]（[[blue:69.15%]]）与[[出货]]（[[blue:18.31%]]）、[[批量打水]]（[[blue:8.58%]]）为主，累计拦截金额达 [[green:7,427.77]]",
                  )}
                </SummaryBox>
                <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                  <div className="space-y-1">
                    <div className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      原来TY审核
                    </div>
                    <div className="text-lg font-black text-slate-950">
                      专业知识缺欠
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-black text-slate-950 uppercase tracking-wider">
                      当前TY小组
                    </div>
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-lg font-black text-slate-950">
                        34专业人员
                      </span>
                      <span className="text-sm font-black text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded-sm ml-0.5 border border-blue-200/40">
                        占比 ~10%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[360px] mt-auto">
                <InterceptTypeBarChart />
              </div>
            </div>
          </div>
        </div>

      {/* 4.2 关联保障 */}
      <div className="space-y-6">
        <SubsectionTitle
          title="4.2 关联保障"
          rightContent={
            <div className="flex items-center gap-3 text-sm font-black text-slate-950">
              <span>4.2.1 审核监控</span>
              <span className="text-slate-300">/</span>
              <span>4.2.2 新人风控</span>
              <span className="text-slate-300">/</span>
              <span>4.2.3 活动风控</span>
            </div>
          }
        />

        <div className="mt-2 rounded-xl bg-slate-50/60 p-4 border border-slate-200/50 mb-4 space-y-4">
          <SummaryBox>
            <div className="space-y-3">
              <p className="text-base text-slate-950 font-bold leading-relaxed">
                {highlightNumbers(
                  "在[[SJB前]]，提前针对[[赛间低门槛、高额度]]的活动一定会带来[[大量新客套利者]]，进行[[全员风控宣导培训]]，强化[[跨站关联、批量注册、高红利低流水、红利后藏分]]等典型行为实施[[系统拦截与人工复合]]；同时，推行平衡[[业务发展]]和[[资损风险]]的[[弹性风控策略]]。",
                )}
              </p>
              
              <div className="pt-2 border-t border-blue-100/80">
                <p className="text-sm font-bold text-slate-900 bg-blue-50/70 p-2.5 rounded-lg border border-blue-100 text-blue-950 mb-2.5 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-blue-600 rounded-full inline-block shrink-0" />
                  <span>
                    {highlightNumbers(
                      "针对[[SJB期间]]建立[[专人专项]]机制，重点推进[[异常识别与前置处理]]，保障风险[[提前预警]]并及时跟进处置：",
                    )}
                  </span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      title: "盈利监控",
                      content: "对[[场馆杀率]]与[[盈利TOP会员]]按[[小时级]]开展分析统计，发现异常第一时间跟进处置",
                    },
                    {
                      title: "活动监控",
                      content: "针对[[活动派发数据]]进行[[每日复盘]]，及时排查并修复规则漏洞与潜在套利点",
                    },
                    {
                      title: "代理审核",
                      content: "在[[弹性风险范围]]内对[[新代理]]适度放宽审核，给予更充裕的[[观察期]]",
                    },
                    {
                      title: "盘口监控",
                      content: "体育组对每日[[早盘、滚球、赛后]]操盘数据安排[[专人复盘]]，及时发现问题并与[[B端联动优化]]",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-800 font-medium bg-white/80 p-2.5 rounded-lg border border-slate-200/60 shadow-2xs">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <div className="leading-snug">
                        <strong className="text-slate-950 font-bold mr-1">{idx + 1}、{item.title}：</strong>
                        <span className="text-slate-700">{highlightNumbers(item.content)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SummaryBox>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                title: "正常用户",
                desc: "直接放行，快速审核快速放行",
                badge: "执行：放行",
                color: "text-emerald-600 bg-emerald-50 border-emerald-200",
              },
              {
                title: "轻度可疑",
                desc: "打标备注，监控后续游戏行为。",
                badge: "执行：监控",
                color: "text-blue-600 bg-blue-50 border-blue-200",
              },
              {
                title: "确认套利",
                desc: "禁用扣款，扣红利追回不当得利。",
                badge: "执行：拦截",
                color: "text-rose-600 bg-rose-50 border-rose-200",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-3 shadow-none flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="text-base font-black text-slate-950">
                    {item.title}
                  </div>
                  <span
                    className={`shrink-0 text-sm font-black px-1.5 py-0.5 rounded-md border whitespace-nowrap ${item.color}`}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-900 font-bold">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <AuditVolumeStats 
            totalInterceptAmount={totalInterceptAmount}
            totalNewUserAdjustAmount={totalNewUserAdjustAmount}
            totalActivityInterceptAmount={totalActivityInterceptAmount}
          />
          <SiteNewUserRiskControlStats />

          {/* 4.2.3 活动风控 */}
          <div className="mt-6 rounded-2xl border border-slate-200/90 p-5 md:p-6 space-y-6 bg-white">
            <div className="mb-4">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full shrink-0" />
                  <span>4.2.3 活动风控率</span>
                </h4>
                <span className="text-xs text-slate-950 font-black bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200">
                  风控率 = 拦截人数 / 总人数
                </span>
              </div>
              <SummaryBox className="mt-4 mb-0 p-4">
                {highlightNumbers(
                  "针对[[重点营销活动]]实施专项风控，对玩家进行[[前置上标备注]]，提款进行[[严查]]。对SJB期间所有领过红利的用户，按照不同的红利/存款比例进行风控分析，整体保持稳健，平均[[风控拦截率]]为 [[blue:5.09%]]。",
                )}
              </SummaryBox>
            </div>

            <ActivityBonusRatioRiskControlStats />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorldCupGuaranteeReview;
