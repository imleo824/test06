import React, { useState } from "react";
import {
  Timer,
  TrendingDown,
  Activity,
  Lightbulb
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  allMatchTrendData,
  matchTrendSummary,
  matchTrendExtremes,
  matchStageRanges,
  matchStageSummary,
  MatchTrendTooltip,
  CustomNestedBar,
  playstyleProfitData,
  playstyleWaterDiffData,
  waterDiffMatchData,
} from "./data";
import { highlightNumbers, SignColoredValue, SummaryBox } from "./utils";

const PlaystyleTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-none min-w-[220px] text-slate-950">
      <div className="text-base font-black text-slate-950 mb-2 pb-1.5 border-b border-slate-200">
        {row.name} 玩法
      </div>
      <div className="space-y-1.5 text-base font-bold">
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-950 font-bold">1. 投注流水</span>
          <span className="font-mono text-slate-950">
            {row.volume.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-950 font-bold">2. 盈亏金额</span>
          <span className="font-mono font-black">
            <span
              className={`${row.winLoss >= 0 ? "text-emerald-600" : "text-rose-600"} mr-0.5`}
            >
              {row.winLoss >= 0 ? "+" : "-"}
            </span>
            <span
              className={
                row.winLoss >= 0 ? "text-emerald-600" : "text-rose-600"
              }
            >
              {Math.abs(row.winLoss).toLocaleString()}
            </span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-950 font-bold">3. 盈利率 (杀率)</span>
          <span className="font-mono font-black">
            <span
              className={`${row.rate >= 0 ? "text-emerald-600" : "text-rose-600"} mr-0.5`}
            >
              {row.rate >= 0 ? "+" : "-"}
            </span>
            <span
              className={row.rate >= 0 ? "text-emerald-600" : "text-rose-600"}
            >
              {Math.abs(row.rate).toFixed(2)}%
            </span>
          </span>
        </div>
        {row.betsCount && (
          <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-1.5">
            <span className="text-slate-950 font-bold">4. 注单数量</span>
            <span className="font-mono text-slate-950">
              {row.betsCount.toLocaleString()}
            </span>
          </div>
        )}
        {row.playersCount && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-950 font-bold">5. 投注人数</span>
            <span className="font-mono text-slate-950">
              {row.playersCount.toLocaleString()}
            </span>
          </div>
        )}
        {row.volumeShare && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-950 font-bold">6. 流水占比</span>
            <span className="font-mono text-slate-950">{row.volumeShare}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const top3 = ["全场波胆", "谁先开球", "晋级球队"];
  const isTop3 = top3.includes(payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={14}
        textAnchor="middle"
        fill={isTop3 ? "#b45309" : "#334155"}
        fontSize={isTop3 ? 11.5 : 10.5}
        fontWeight={isTop3 ? "900" : "700"}
      >
        {payload.value}
      </text>
    </g>
  );
};

const GASP_MATCHES_INFO: Record<
  string,
  { isGasp: "是" | "否"; remark: string; isHandicapCleared?: "是" | "否" }
> = {
  "科特迪瓦 v 挪威": {
    isGasp: "是",
    remark: "挪威于 86' 攻入绝杀球 (1-1 → 1-2)",
    isHandicapCleared: "是",
  },
  "巴西 v 日本": {
    isGasp: "是",
    remark: "巴西于 90+5' 攻入绝杀球 (1-1 → 2-1)",
    isHandicapCleared: "否",
  },
  "墨西哥 v 英格兰": {
    isGasp: "否",
    remark: "最后进球于 69' (吉梅内斯点球)",
    isHandicapCleared: "是",
  },
  "阿根廷 v 埃及": {
    isGasp: "是",
    remark: "阿根廷于 83' 扳平、90+2' 绝杀 (1-2 → 2-2 → 3-2)",
    isHandicapCleared: "是",
  },
  "西班牙 v 比利时": {
    isGasp: "是",
    remark: "西班牙于 88' 攻入绝杀球 (1-1 → 2-1)",
    isHandicapCleared: "是",
  },
  "西班牙 v 奥地利": {
    isGasp: "否",
    remark: "西班牙大胜，最后进球于 89' (奥亚萨瓦尔)",
    isHandicapCleared: "是",
  },
  "法国 v 塞内加尔": {
    isGasp: "否",
    remark: "最后进球于 82' (巴尔科拉)",
    isHandicapCleared: "是",
  },
  "法国 v 瑞典": {
    isGasp: "否",
    remark: "法国零封大胜，最后进球于 74' (姆巴佩)",
    isHandicapCleared: "是",
  },
  "葡萄牙 v 克罗地亚": {
    isGasp: "是",
    remark: "葡萄牙于 90+4' 攻入绝杀球 (1-1 → 2-1)",
    isHandicapCleared: "是",
  },
  "阿尔及利亚 v 奥地利": {
    isGasp: "是",
    remark: "奥地利于 90+6' 攻入平局球 (2-3 → 3-3)",
    isHandicapCleared: "否",
  },
  "突尼斯 v 日本": {
    isGasp: "否",
    remark: "最后进球于 83' (上田绮世)",
    isHandicapCleared: "是",
  },
  "比利时 v 塞内加尔": {
    isGasp: "是",
    remark:
      "比利时于 89' 扳平 (0-2 → 2-2) 进入加时，并于 120+5' 攻入加时绝杀 (3-2)",
    isHandicapCleared: "否",
  },
  "乌兹别克斯坦 v 哥伦比亚": {
    isGasp: "否",
    remark: "最后进球于 90+9' (坎帕斯)",
    isHandicapCleared: "是",
  },
  "葡萄牙 v 乌兹别克斯坦": {
    isGasp: "否",
    remark: "葡萄牙大胜，最后进球于 87' (莱奥)",
    isHandicapCleared: "是",
  },
  "英格兰 v 克罗地亚": {
    isGasp: "否",
    remark: "英格兰大胜，最后进球于 85' (拉什福德)",
    isHandicapCleared: "是",
  },
  "加拿大 v 摩洛哥": {
    isGasp: "否",
    remark: "摩洛哥大胜零封，最后进球于 90+8' (拉希米)",
    isHandicapCleared: "是",
  },
  "塞内加尔 v 伊拉克": {
    isGasp: "否",
    remark: "塞内加尔大胜，最后进球于 82' (恩迪亚耶)",
    isHandicapCleared: "是",
  },
  "西班牙 v 沙特阿拉伯": {
    isGasp: "否",
    remark: "西班牙完胜，最后进球于 49' (乌龙球)",
    isHandicapCleared: "是",
  },
  "伊拉克 v 挪威": {
    isGasp: "否",
    remark: "挪威完胜，最后进球于 90+6' (乌龙球)",
    isHandicapCleared: "是",
  },
  "约旦 v 阿尔及利亚": {
    isGasp: "是",
    remark: "阿尔及利亚于 82' 攻入绝杀球 (1-1 → 1-2)",
    isHandicapCleared: "是",
  },
  "新西兰 v 埃及": {
    isGasp: "否",
    remark: "埃及完胜，最后进球于 82' (特雷泽盖)",
    isHandicapCleared: "是",
  },
  "民主刚果 v 乌兹别克斯坦": {
    isGasp: "否",
    remark: "民主刚果完胜，最后进球于 90+1' (维萨)",
    isHandicapCleared: "否",
  },
  "刚果（金） v 乌兹别克斯坦": {
    isGasp: "否",
    remark: "刚果（金）完胜，最后进球于 90+1' (维萨)",
    isHandicapCleared: "否",
  },
  "美国 v 巴拉圭": {
    isGasp: "否",
    remark: "美国大胜，最后进球于 90+8' (雷纳)",
    isHandicapCleared: "是",
  },
  "挪威 v 塞内加尔": {
    isGasp: "否",
    remark: "挪威逆转获胜，最后进球于 90+3' (萨尔)",
    isHandicapCleared: "是",
  },
  "奥地利 v 约旦": {
    isGasp: "否",
    remark: "奥地利获胜，最后进球于 90+12' (阿瑙托维奇)",
    isHandicapCleared: "否",
  },
  "瑞士 v 波黑": {
    isGasp: "否",
    remark: "瑞士大胜，最后进球于 90+7' (扎卡)",
    isHandicapCleared: "是",
  },
  "摩洛哥 v 海地": {
    isGasp: "否",
    remark: "摩洛哥大胜，最后进球于 89' (亚辛)",
    isHandicapCleared: "是",
  },
  "土耳其 v 美国": {
    isGasp: "是",
    remark: "土耳其于 90+8' 攻入绝杀球 (2-2 → 3-2)",
    isHandicapCleared: "是",
  },
  "墨西哥 v 南非": {
    isGasp: "否",
    remark: "墨西哥完胜，最后进球于 67' (吉梅内斯)",
    isHandicapCleared: "是",
  },
  "约旦 v 阿根廷": {
    isGasp: "否",
    remark: "阿根廷完胜，最后进球于 80' (梅西)",
    isHandicapCleared: "是",
  },
  "波黑 v 卡塔尔": {
    isGasp: "否",
    remark: "波黑完胜，最后进球于 80' (马赫米奇)",
    isHandicapCleared: "是",
  },
  "加纳 v 巴拿马": {
    isGasp: "是",
    remark: "加纳于 90+5' 攻入绝杀球 (0-0 → 1-0)",
    isHandicapCleared: "否",
  },
  "荷兰 v 瑞典": {
    isGasp: "否",
    remark: "荷兰大胜，最后进球于 89' (萨默维尔)",
    isHandicapCleared: "是",
  },
  "瑞典 v 突尼斯": {
    isGasp: "否",
    remark: "瑞典大胜，最后进球于 90+6' (阿亚里)",
    isHandicapCleared: "是",
  },
  "挪威 v 法国": {
    isGasp: "否",
    remark: "法国大胜，最后进球于 90+4' (杜埃)",
    isHandicapCleared: "是",
  },
  "英格兰 v 刚果（金）": {
    isGasp: "是",
    remark: "英格兰于 86' 攻入绝杀球 (1-1 → 2-1)",
    isHandicapCleared: "否",
  },
  "英格兰 v 民主刚果": {
    isGasp: "是",
    remark: "英格兰于 86' 攻入绝杀球 (1-1 → 2-1)",
    isHandicapCleared: "否",
  },
  "德国 v 库拉索": {
    isGasp: "否",
    remark: "德国大胜，最后进球于 88' (哈弗茨)",
    isHandicapCleared: "是",
  },
  "加拿大 v 卡塔尔": {
    isGasp: "否",
    remark: "加拿大完胜，最后进球于 90+2' (戴维)",
    isHandicapCleared: "是",
  },
  "苏格兰 v 巴西": {
    isGasp: "否",
    remark: "巴西大胜，最后进球于 60' (库尼亚)",
    isHandicapCleared: "是",
  },
  "德国 v 科特迪瓦": {
    isGasp: "是",
    remark: "德国于 90+4' 攻入绝杀球 (1-1 → 2-1)",
    isHandicapCleared: "否",
  },
  "巴西 v 海地": {
    isGasp: "否",
    remark: "巴西完胜，最后进球于 45+3' (维尼修斯)",
    isHandicapCleared: "是",
  },
  "克罗地亚 v 加纳": {
    isGasp: "是",
    remark: "克罗地亚于 83' 攻入绝杀球 (1-1 → 2-1)",
    isHandicapCleared: "否",
  },
  "阿根廷 v 阿尔及利亚": {
    isGasp: "否",
    remark: "阿根廷大胜零封，最后进球于 76' (梅西)",
    isHandicapCleared: "是",
  },
};

export const lossDetailsData = [...allMatchTrendData]
  .filter((item) => item.winLoss < 0)
  .sort((a, b) => a.winLoss - b.winLoss)
  .map((item, index) => {
    let stage = "小组赛";
    if (item.matchNo > 72 && item.matchNo <= 88) stage = "32强";
    else if (item.matchNo > 88 && item.matchNo <= 96) stage = "16强";
    else if (item.matchNo > 96 && item.matchNo <= 100) stage = "8强";
    else if (item.matchNo > 100 && item.matchNo <= 102) stage = "半决赛";
    else if (item.matchNo === 103) stage = "三四名";
    else if (item.matchNo === 104) stage = "决赛";

    const expectedRate = 0.025;
    const actualRate = item.volume > 0 ? item.actualWater / item.volume : 0;
    const rateDiff = actualRate - expectedRate;

    const label =
      item.waterDiff < 0 && item.winLoss < 0
        ? "双重亏损"
        : item.waterDiff < 0
          ? "水钱偏薄"
          : "博弈亏损";

    const getRemark = (matchName: string, labelStr: string) => {
      const cleanKey = Object.keys(GASP_MATCHES_INFO).find((k) =>
        matchName.includes(k),
      );
      if (cleanKey) {
        return GASP_MATCHES_INFO[cleanKey].remark;
      }
      if (labelStr === "双重亏损")
        return "公司博弈失利，且由于赔率调盘实际抽水低于预期，导致双重财务流失。";
      if (labelStr === "水钱偏薄")
        return "赛事本身的实际水位/赔率调盘偏厚，导致水钱抽成偏差偏低。";
      return "核心受热玩法赛果打出，公司单场博弈产生负向盈亏，但水钱抽成保持正常。";
    };

    const getHandicapCleared = (matchName: string) => {
      const cleanKey = Object.keys(GASP_MATCHES_INFO).find((k) =>
        matchName.includes(k),
      );
      if (
        cleanKey &&
        GASP_MATCHES_INFO[cleanKey].isHandicapCleared !== undefined
      ) {
        return GASP_MATCHES_INFO[cleanKey].isHandicapCleared;
      }
      return "是";
    };

    const getGaspStatus = (matchName: string) => {
      const cleanKey = Object.keys(GASP_MATCHES_INFO).find((k) =>
        matchName.includes(k),
      );
      return cleanKey ? GASP_MATCHES_INFO[cleanKey].isGasp : "否";
    };

    return {
      rank: index + 1,
      match: item.match,
      stage,
      betAmount: item.volume,
      companyWinLoss: item.winLoss,
      expectedWater: item.expectedWater,
      actualWater: item.actualWater,
      waterDiff: item.waterDiff,
      expectedRate,
      actualRate,
      rateDiff,
      label,
      remark: getRemark(item.match, label),
      isHandicapCleared: getHandicapCleared(item.match),
      isGasp: getGaspStatus(item.match),
    };
  });

export const MatchVolumeRateChart = ({
  mode = "all",
}: {
  mode?: string;
}) => {
  const [activeTab, setActiveTab] = useState<"trend" | "stage" | "water">(
    "trend",
  );

  const sortedPlaystyleProfitData = [...playstyleProfitData].sort(
    (a, b) => b.winLoss - a.winLoss,
  );

  // Calculate extremes for winLoss
  const maxWinMatch = allMatchTrendData.reduce(
    (max, row) => (row.winLoss > max.winLoss ? row : max),
    allMatchTrendData[0],
  );
  const maxLossMatch = allMatchTrendData.reduce(
    (min, row) => (row.winLoss < min.winLoss ? row : min),
    allMatchTrendData[0],
  );
  const avgVolume = Math.round(
    matchTrendSummary.totalVolume / allMatchTrendData.length,
  );

  const positiveProfitAmount = allMatchTrendData
    .filter((row) => row.winLoss >= 0)
    .reduce((sum, row) => sum + row.winLoss, 0);

  const negativeProfitAmount = allMatchTrendData
    .filter((row) => row.winLoss < 0)
    .reduce((sum, row) => sum + row.winLoss, 0);

  const positiveWaterAmount = waterDiffMatchData
    .filter((row) => row.waterDiff >= 0)
    .reduce((sum, row) => sum + row.waterDiff, 0);

  const negativeWaterAmount = waterDiffMatchData
    .filter((row) => row.waterDiff < 0)
    .reduce((sum, row) => sum + row.waterDiff, 0);

  const waterDiffs = waterDiffMatchData.map((d) => d.waterDiff);
  const minWaterDiff = Math.min(...waterDiffs);
  const maxWaterDiff = Math.max(...waterDiffs);
  const absMax = Math.max(Math.abs(minWaterDiff), Math.abs(maxWaterDiff));
  const domainLimit = Math.ceil(absMax / 50) * 50; // e.g. 150 or 200
  const waterYDomain = [-domainLimit, domainLimit];

  const renderTradingAnalysis = () => (
    <>
      {/* 1. 盈利分析 */}
      <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-none mb-6">
        <div className="mb-4 border-b border-slate-100 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <h5 className="text-2xl font-black text-slate-950 tracking-tight">
              3.1 盈利分析
            </h5>
            <div className="flex items-center gap-4 text-sm font-black text-slate-950 bg-slate-50 px-3 py-1 rounded border border-slate-200/60 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#cbd5e1] rounded-xs" />
                赛事流水
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#059669] rounded-xs" />
                正盈利
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#e11d48] rounded-xs" />
                负亏损
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-flex gap-0.5">
                  <span className="w-1.5 h-3 bg-[#10b981] rounded-xs" />
                  <span className="w-1.5 h-3 bg-[#ef4444] rounded-xs" />
                </span>
                盈利率 (右轴)
              </span>
            </div>
          </div>
        </div>

        {/* 全部赛事盈利分析 */}
        <div className="mt-6">
          <div className="mb-6">
            <h6 className="text-xl font-black text-slate-950 tracking-tight mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-600 rounded-full" />
              全部赛事盈利分析
            </h6>
            <SummaryBox>
              <p className="text-base text-slate-950 font-bold leading-relaxed mb-3">
                {highlightNumbers(
                  "赛事场次加倍的背景下，赛事流水与盈利金额均实现同步增长：",
                )}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-950 font-bold">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-700 shrink-0" />
                  <span>
                    {highlightNumbers(
                      `[[正负场次比例]]：[[正向盈利]]比赛 [[green:${matchTrendSummary.positive} 场]]（占比 [[green:${Number(matchTrendSummary.positiveShare).toFixed(2)}%]]），[[负向亏损]]比赛 [[red:${matchTrendSummary.negative} 场]]（占比 [[red:${Number(matchTrendSummary.negativeShare).toFixed(2)}%]]），盈利盘面分布健康。`,
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-950 font-bold">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-700 shrink-0" />
                  <span>
                    {highlightNumbers(
                      `[[单场最大盈亏]]：单场[[最大盈利]]达 [[green:${maxWinMatch.winLoss.toLocaleString()}]]（${maxWinMatch.match.split(" ").slice(1, 4).join(" ")}），单场[[最大亏损]]为 [[red:${maxLossMatch.winLoss.toLocaleString()}]]（${maxLossMatch.match.split(" ").slice(1, 4).join(" ")}）。`,
                    )}
                  </span>
                </li>

              </ul>
            </SummaryBox>
          </div>

        {/* 不同赛事阶段的盈利表现卡片 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          {matchStageRanges.map((stage) => {
            const isLoss = stage.winLossTotal < 0;
            return (
              <div
                key={stage.label}
                className="p-3 rounded-xl border border-slate-200/60 bg-slate-50/40 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-1 mb-1.5 border-b border-slate-100/60 pb-1.5">
                  <span className="text-[13px] font-black text-slate-950 truncate">
                    {stage.label}
                  </span>
                  <span className="text-[10px] text-slate-950 font-bold bg-slate-100 px-1 py-0.5 rounded whitespace-nowrap">
                    {stage.count} 场
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div>
                    <div className="text-sm text-slate-900 font-bold leading-none mb-0.5">
                      盈利
                    </div>
                    <div
                      className={`text-sm font-mono font-bold ${isLoss ? "text-rose-600" : "text-emerald-600"}`}
                    >
                      {stage.winLossTotal.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-900 font-bold leading-none mb-0.5">
                      盈利率
                    </div>
                    <div
                      className={`text-sm font-mono font-black ${stage.weightedRate < 0 ? "text-rose-600" : "text-emerald-600"}`}
                    >
                      {Number(stage.weightedRate).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-[480px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={allMatchTrendData}
              margin={{ top: 60, right: 16, left: 16, bottom: 12 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="matchNo"
                axisLine={false}
                tick={false}
                tickLine={false}
                dy={8}
                interval="preserveStartEnd"
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
                tickFormatter={(val) => val.toLocaleString()}
                domain={[-40000, 80000]}
                ticks={[-40000, -20000, 0, 20000, 40000, 60000, 80000]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
                tickFormatter={(val) =>
                  val < 0 ? `-${Math.abs(val)}%` : `${val}%`
                }
                domain={[-40, 80]}
                ticks={[-40, -20, 0, 20, 40, 60, 80]}
              />
              {/* Tooltip removed to disable interaction */}

              <ReferenceLine
                yAxisId="left"
                y={0}
                stroke="#334155"
                strokeWidth={2}
              />

              <Bar
                yAxisId="left"
                dataKey="volume"
                shape={<CustomNestedBar />}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey="winLoss"
                  content={(props: any) => {
                    const { x, y, width, index } = props;
                    const data = allMatchTrendData[index];
                    if (!data) return null;

                    // Find overall extremes for allMatchTrendData
                    const maxWinMatch = allMatchTrendData.reduce(
                      (max, curr) => (curr.winLoss > max.winLoss ? curr : max),
                      allMatchTrendData[0],
                    );
                    const maxLossMatch = allMatchTrendData.reduce(
                      (min, curr) => (curr.winLoss < min.winLoss ? curr : min),
                      allMatchTrendData[0],
                    );

                    const isMaxWin = data.matchNo === maxWinMatch.matchNo;
                    const isMaxLoss = data.matchNo === maxLossMatch.matchNo;

                    if (!isMaxWin && !isMaxLoss) return null;

                    // Calculate positioning based on chart logic
                    // The volume bar is from y to y + height. height = props.height
                    const height = props.height;
                    const yZero = y + height;

                    const teamName = data.match
                      .split(" ")
                      .slice(1, 4)
                      .join(" "); // Extract teams from "date TeamA v TeamB score"
                    const winLossStr =
                      (data.winLoss > 0 ? "+" : "") +
                      data.winLoss.toLocaleString();

                    const labelY = y - 35;
                    const color = isMaxWin ? "#059669" : "#e11d48";

                    return (
                      <g>
                        <rect
                          x={x + width / 2 - 50}
                          y={labelY - 14}
                          width={100}
                          height={32}
                          rx={4}
                          fill="white"
                          stroke={color}
                          strokeWidth={1}
                          fillOpacity={0.9}
                        />
                        <text
                          x={x + width / 2}
                          y={labelY}
                          fill={color}
                          textAnchor="middle"
                          fontSize={11}
                          fontWeight="black"
                        >
                          {teamName}
                        </text>
                        <text
                          x={x + width / 2}
                          y={labelY + 12}
                          fill={color}
                          textAnchor="middle"
                          fontSize={10}
                          fontWeight="bold"
                        >
                          {winLossStr}
                        </text>
                        <line
                          x1={x + width / 2}
                          y1={labelY + 18}
                          x2={x + width / 2}
                          y2={y}
                          stroke={color}
                          strokeWidth={1}
                          strokeDasharray="2 2"
                        />
                      </g>
                    );
                  }}
                />
              </Bar>
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rate"
                stroke="#64748b"
                strokeWidth={3}
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  const isPositive = payload.rate >= 0;
                  return (
                    <circle
                      key={`dot-${payload.matchNo}`}
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={isPositive ? "#10b981" : "#ef4444"}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  );
                }}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

        {/* 赛事特征分析 */}
        <div className="mt-12 mb-2 border-t border-slate-200 pt-8">
          <h6 className="text-xl font-black text-slate-950 tracking-tight flex items-center gap-2 mb-4">
            <Activity className="w-6 h-6 text-indigo-600" />
            赛事特征分析
          </h6>
          <SummaryBox className="mb-6">
            {highlightNumbers(
              "本届赛事呈现[[「过盘率相比较高」]]以及[[「绝杀绝平比例高」]]的特点。一般这种现象比例较高时，[[red:会降低整体盈利表现]]。",
            )}
          </SummaryBox>

          {/* 绝杀绝平与亏损赛事明细整合进特征分析 */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-4">
            {/* 左列：绝杀/绝平分析 */}
            <div className="flex flex-col h-full">
              <div className="flex-none mb-4">
                <h6 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Timer className="w-5 h-5 text-blue-600" />
                  绝杀绝平分析
                </h6>
              </div>
              <SummaryBox className="mb-4">
                {highlightNumbers(
                  "本届赛事[[绝杀绝平]]现象频发。从阶段分布看，[[32强阶段]] 最为集中，共 [[blue:9 场]]（占比达 [[blue:56.3%]]）；[[4强阶段]] 占比也高达 [[blue:50.0%]]。",
                )}
              </SummaryBox>
              
              <div className="flex-1" />

              <div className="flex-none">
                <div className="grid grid-cols-1 gap-4">
                  {/* 各阶段绝杀绝平场次比例 */}
                  <div className="bg-white rounded-xl border border-slate-200/80 p-5 h-[480px] flex flex-col shadow-sm">
                    <h6 className="text-base font-black text-slate-900 block mb-4 flex items-center gap-1.5 flex-none">
                      <span className="w-1 h-3 bg-blue-500 rounded-full" />
                      各阶段绝杀绝平场次占比
                      <span className="text-[10px] font-bold text-slate-950 ml-1">
                        (80:00至90+N'、110:00至120+N'出现绝杀/绝平)
                      </span>
                    </h6>
                    <div className="flex-1 w-full min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { stage: "小组赛", count: 1, rate: 16.67, label: "1场 (16.7%)" },
                            { stage: "32强", count: 9, rate: 56.25, label: "9场 (56.3%)" },
                            { stage: "16强", count: 2, rate: 25.00, label: "2场 (25.0%)" },
                            { stage: "8强", count: 1, rate: 25.00, label: "1场 (25.0%)" },
                            { stage: "4强", count: 1, rate: 50.00, label: "1场 (50.0%)" },
                            { stage: "三四名", count: 0, rate: 0, label: "" },
                            { stage: "决赛", count: 0, rate: 0, label: "" },
                          ]}
                          margin={{ top: 20, right: 10, left: -15, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="stage" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 13, fontWeight: 800 }}
                            interval={0}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }}
                            domain={[0, 'dataMax + 1']}
                            allowDecimals={false}
                            tickFormatter={(val) => `${val}场`}
                          />
                          <Tooltip 
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ 
                              borderRadius: '8px', 
                              border: '1px solid #e2e8f0',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}
                            formatter={(val: number, name: string) => {
                              if (name === 'count') return [`${val} 场`, '场次'];
                              return [val, name];
                            }}
                          />
                          <Bar 
                            dataKey="count" 
                            fill="#3b82f6" 
                            radius={[6, 6, 0, 0]} 
                            barSize={42}
                            isAnimationActive={false}
                          >
                            <Cell fill="#3b82f6" />
                            <Cell fill="#2563eb" />
                            <Cell fill="#3b82f6" />
                            <Cell fill="#3b82f6" />
                            <Cell fill="#1d4ed8" />
                            <Cell fill="#94a3b8" />
                            <Cell fill="#94a3b8" />
                            <LabelList 
                              dataKey="label" 
                              position="top" 
                              style={{ fill: '#1e293b', fontSize: 16, fontWeight: 900 }}
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右列：亏损赛事明细 */}
            <div className="flex flex-col h-full">
              <div className="flex-none mb-4">
                <h6 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-rose-600" />
                  亏损赛事明细
                </h6>
              </div>

              <SummaryBox className="mb-4">
                <p className="text-base text-slate-950 font-bold leading-relaxed">
                  {highlightNumbers(
                    `与上届OZB相比，过盘率有显著上升：达 [[blue:50.76%]]（上届 42.11%，[[red:+8.65%]]）。在全部 ${lossDetailsData.length} 场亏损比赛中，共有 [[red:${
                      lossDetailsData.filter(
                        (item) =>
                          item.isHandicapCleared === "是" || item.isGasp === "是",
                      ).length
                    } 场]] 命中了[[red:「过盘现象」]]。`,
                  )}
                </p>
              </SummaryBox>

              <div className="flex-1" />

              <div className="flex-none">
                <div className="bg-white rounded-xl border border-slate-200/80 p-5 h-[480px] flex flex-col shadow-sm overflow-hidden">
                  <h6 className="text-base font-black text-slate-900 block mb-3 flex items-center gap-1.5 flex-none">
                    <span className="w-1 h-3 bg-rose-500 rounded-full" />
                    TOP 10 亏损赛事明细
                  </h6>
                  <div className="flex-1 w-full min-h-0 overflow-hidden rounded-lg border border-slate-200/80 bg-white">
                    <table className="w-full text-left text-xs font-bold text-slate-950 border-collapse">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr className="text-slate-900 font-bold text-xs uppercase tracking-wider">
                          <th className="py-2 px-2 text-center border-r border-slate-200/70 w-10 bg-slate-50 font-bold text-slate-900">
                            排名
                          </th>
                          <th className="py-2 px-2.5 text-left border-r border-slate-200/70 font-bold text-slate-900">
                            赛事
                          </th>
                          <th className="py-2 px-2.5 text-right border-r border-slate-200/70 font-bold text-slate-900">
                            公司输赢
                          </th>
                          <th className="py-2 px-2 text-center border-r border-slate-200/70 w-18 font-bold text-slate-900">
                            是否过盘
                          </th>
                          <th className="py-2 px-2 text-center font-bold text-slate-900 w-18">
                            绝杀绝平
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-xs">
                        {lossDetailsData.slice(0, 10).map((item) => {
                          return (
                            <tr key={item.rank} className="hover:bg-slate-50/60 transition-colors bg-white">
                              <td className="py-1.5 px-2 text-center font-mono font-bold border-r border-slate-100 text-slate-950 bg-slate-50/40">
                                {item.rank}
                              </td>
                              <td className="py-1.5 px-2.5 font-sans font-bold border-r border-slate-100 text-slate-900 truncate max-w-[140px]">
                                {item.match}
                              </td>
                              <td className="py-1.5 px-2.5 text-right font-mono font-bold border-r border-slate-100 whitespace-nowrap">
                                <SignColoredValue
                                  value={item.companyWinLoss.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                  className="font-mono font-bold"
                                />
                              </td>
                              <td className="py-1.5 px-2 text-center border-r border-slate-100">
                                <span
                                  className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-bold border ${
                                    item.isHandicapCleared === "是"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : "bg-rose-50 text-rose-700 border-rose-200"
                                  }`}
                                >
                                  {item.isHandicapCleared}
                                </span>
                              </td>
                              <td className="py-1.5 px-2 text-center">
                                <span
                                  className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-bold border ${
                                    item.isGasp === "是"
                                      ? "bg-amber-50 text-amber-700 border-amber-200"
                                      : "bg-slate-100 text-slate-900 border-slate-200"
                                  }`}
                                >
                                  {item.isGasp}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>

        {/* 核心玩法盈利分析 */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-slate-100 pb-3">
              <h6 className="text-xl font-black text-slate-950 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-5 bg-emerald-600 rounded-full" />
                核心玩法盈利分析
              </h6>
              <div className="flex items-center gap-3 text-sm font-black text-slate-950 bg-slate-50 px-3 py-1 rounded border border-slate-200/60 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#059669] rounded-xs" />
                  盈利金额
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#e11d48] rounded-xs" />
                  亏损金额
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-flex gap-0.5">
                    <span className="w-1.5 h-3 bg-[#10b981] rounded-xs" />
                    <span className="w-1.5 h-3 bg-[#ef4444] rounded-xs" />
                  </span>
                  盈利率 (%)
                </span>
              </div>
            </div>
          </div>

        <SummaryBox>
          <p className="text-base text-slate-950 font-bold leading-relaxed mb-3">
            {highlightNumbers(
              "核心玩法杀率整体相对较低，波胆等玩法为核心利润来源",
            )}
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-950 font-bold">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-700 shrink-0" />
              <span>
                {highlightNumbers(
                  "[[核心玩法杀率]]：主力玩法[[全场让球]]（杀率 [[blue:1.11%]]）与[[全场大小]]（杀率 [[blue:1.48%]]）合计贡献了 [[blue:49.42%]] 的主力流水，但其[[杀率（盈利率）相对较低]]。",
                )}
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-950 font-bold">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-700 shrink-0" />
              <span>
                {highlightNumbers(
                  "[[利润拉动贡献]]：相比之下，高倍数/高赔付玩法如[[全场波胆]]（杀率 [[green:15.56%]]）、[[谁先开球]]（杀率 [[green:11.45%]]）、[[晋级球队]]（杀率 [[green:11.07%]]）杀率极高，是平台利润沉淀的坚实支柱。",
                )}
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-950 font-bold">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-700 shrink-0" />
              <span>
                {highlightNumbers(
                  "[[早盘滚球对比]]：早盘流水 [[blue:1,206,726]]、盈利额 [[green:65,926]]（盈利率 [[green:5.46%]]）；滚球流水 [[blue:1,200,045]]、盈利额 [[green:42,582]]（盈利率 [[green:3.55%]]）。",
                )}
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-950 font-bold">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-700 shrink-0" />
              <span>
                {highlightNumbers(
                  "[[下注刺激策略]]：在保障主力玩法盘口流动性的同时，后续赛事，尤其杯赛以及新人应[[加大高盈利玩法的针对性推广与下注刺激]]，引导用户向高杀率玩法转化。",
                )}
              </span>
            </li>
          </ul>
        </SummaryBox>
        <div className="h-[480px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={sortedPlaystyleProfitData}
              margin={{ top: 40, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={<CustomXAxisTick />}
                dy={10}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "monospace",
                }}
                domain={[0, 40000]}
                ticks={[0, 10000, 20000, 30000, 40000]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "monospace",
                }}
                tickFormatter={(val) => `${val}%`}
                domain={[0, 20]}
                ticks={[0, 5, 10, 15, 20]}
              />
              {/* Tooltip removed to disable interaction */}
              <ReferenceLine
                yAxisId="left"
                y={0}
                stroke="#334155"
                strokeWidth={2.5}
              />
              <Bar
                yAxisId="left"
                dataKey="winLoss"
                barSize={32}
                isAnimationActive={false}
              >
                {sortedPlaystyleProfitData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.winLoss >= 0 ? "#059669" : "#e11d48"}
                  />
                ))}
                <LabelList
                  dataKey="volume"
                  position="top"
                  content={(props: any) => {
                    const { x, y, width, value } = props;
                    if (value === undefined) return null;
                    return (
                      <text
                        x={x + width / 2}
                        y={y - 25}
                        fill="#334155"
                        textAnchor="middle"
                        fontSize={11}
                        fontWeight="black"
                      >
                        流:{value.toLocaleString()}
                      </text>
                    );
                  }}
                />
                <LabelList
                  dataKey="winLoss"
                  position="top"
                  content={(props: any) => {
                    const { x, y, width, value } = props;
                    if (value === undefined) return null;
                    return (
                      <text
                        x={x + width / 2}
                        y={y - 8}
                        fill={value >= 0 ? "#047857" : "#be123c"}
                        textAnchor="middle"
                        fontSize={11}
                        fontWeight="black"
                      >
                        盈:{value.toLocaleString()}
                      </text>
                    );
                  }}
                />
              </Bar>
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rate"
                stroke="#475569"
                strokeWidth={3}
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  const isPositive = payload.rate >= 0;
                  const isTop3 = ["全场波胆", "谁先开球", "晋级球队"].includes(
                    payload.name,
                  );
                  return (
                    <circle
                      key={`playstyle-dot-${payload.name}`}
                      cx={cx}
                      cy={cy}
                      r={isTop3 ? 7 : 5}
                      fill={
                        isTop3 ? "#d97706" : isPositive ? "#10b981" : "#ef4444"
                      }
                      stroke="white"
                      strokeWidth={2}
                    />
                  );
                }}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey="rate"
                  position="top"
                  content={(props: any) => {
                    const { x, y, value, index } = props;
                    if (value === undefined) return null;
                    const item = sortedPlaystyleProfitData[index];
                    const isTop3 =
                      item &&
                      ["全场波胆", "谁先开球", "晋级球队"].includes(item.name);
                    return (
                      <g>
                        <rect
                          x={x - 22}
                          y={y - 22}
                          width={44}
                          height={16}
                          rx={4}
                          fill={isTop3 ? "#fef3c7" : "#f1f5f9"}
                          stroke={isTop3 ? "#d97706" : "#64748b"}
                          strokeWidth={1}
                        />
                        <text
                          x={x}
                          y={y - 10}
                          fill={isTop3 ? "#b45309" : "#0f172a"}
                          textAnchor="middle"
                          fontSize={10}
                          fontWeight={isTop3 ? "black" : "bold"}
                        >
                          {`${Number(value).toFixed(2)}%`}
                        </text>
                      </g>
                    );
                  }}
                />
              </Line>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </>
);

  const renderWaterMonitoring = () => (
    <>
      {/* 2. 水钱分析 */}
      <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-none mb-6">
        <div className="mb-4 border-b border-slate-100 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <h5 className="text-2xl font-black text-slate-950 tracking-tight">
              3.2 水钱分析
            </h5>
            <div className="flex items-center gap-3 text-sm font-bold text-slate-950 bg-slate-50 px-3 py-1 rounded border border-slate-200/60">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-emerald-500 rounded-xs" />
                水钱超额 (正偏差)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-rose-500 rounded-xs" />
                水钱流失 (负偏差)
              </span>
            </div>
          </div>
        </div>

        <SummaryBox className="mt-4 mb-6">
          <p className="text-base text-slate-950 font-bold leading-relaxed">
            {highlightNumbers(
              `全场[[水钱监控]]中，预期[[总水钱]] [[blue:${matchTrendSummary.totalExpectedWater.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}]]（[[预期抽水率]] [[blue:${matchTrendSummary.expectedWaterRate.toFixed(2)}%]]），实际[[总水钱]] [[blue:${matchTrendSummary.totalActualWater.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}]]（[[实际抽水率]] [[blue:${matchTrendSummary.actualWaterRate.toFixed(2)}%]]），[[净偏离值]] [[red:${matchTrendSummary.totalWaterDiff > 0 ? "+" : ""}${matchTrendSummary.totalWaterDiff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}]]（[[抽水差]] [[red:${matchTrendSummary.waterRateDiff.toFixed(2)}%]]）。`,
            )}
          </p>
        </SummaryBox>

        

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-8">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 shadow-none">
            <div className="text-sm text-slate-900 font-black uppercase tracking-wider mb-1">
              预期总水钱
            </div>
            <div className="text-3xl font-mono text-slate-900 font-black tracking-tighter">
              {matchTrendSummary.totalExpectedWater.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 shadow-none">
            <div className="text-sm text-slate-900 font-black uppercase tracking-wider mb-1">
              实际总水钱
            </div>
            <div className="text-3xl font-mono text-slate-950 font-black tracking-tighter">
              {matchTrendSummary.totalActualWater.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
           
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 shadow-none">
            <div className="text-sm text-slate-900 font-black uppercase tracking-wider mb-1">
              水钱净偏离值
            </div>
            <div className="text-3xl font-mono text-slate-950 font-black tracking-tighter flex items-baseline gap-1">
              <SignColoredValue
                value={matchTrendSummary.totalWaterDiff.toLocaleString(
                  undefined,
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 },
                )}
                className="font-mono font-black tracking-tighter"
              />
            </div>
           
          </div>
        </div>

        {/* 预期水钱标准 */}
        <div className="mt-6 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200/60">
          <p className="text-sm text-slate-950 font-bold leading-relaxed mb-1.5 flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0" />
            <span>
              {highlightNumbers(
                "[[对比方式]]：基于[[玩法盘口]]的[[实际平均赔率]]算出[[实际抽水]]与其[[预设抽水]]进行对比。",
              )}
            </span>
          </p>
          <p className="text-sm text-slate-950 font-bold leading-relaxed flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0" />
            <span>
              {highlightNumbers(
                "[[预期标准]]：早盘：[[全场大小 0.1]]、[[全场让球 0.08]]、[[上半场大小 0.1]]、[[上半场让球 0.1]]；滚球：[[全场大小 0.12]]、[[全场让球 0.1]]、[[上半场大小 0.12]]、[[上半场让球 0.12]]。",
              )}
            </span>
          </p>
        </div>

         {/* 全部赛事水钱分析 */}
        <div className="mt-8">
          <div className="mb-6">
            <h6 className="text-lg font-black text-slate-950 tracking-tight mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-600 rounded-full" />
              全部赛事水钱分析
            </h6>
            <SummaryBox>
              <p className="text-base text-slate-950 font-bold leading-relaxed">
                {highlightNumbers(
                  `在全场 [[blue:${waterDiffMatchData.length} 场赛事]] 中，共有 [[red:${matchTrendSummary.deficitMatches} 场]] 出现实际水钱低于预期（占比 [[red:${((matchTrendSummary.deficitMatches / waterDiffMatchData.length) * 100).toFixed(2)}%]]），合计达 [[red:${matchTrendSummary.totalLostWater.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}]]；另有 [[blue:${waterDiffMatchData.length - matchTrendSummary.deficitMatches} 场]] 水钱超过预期，合计达 [[green:${positiveWaterAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}]]。低预期赛事的单场偏离幅度高于超预期赛事，呈现 [[red:亏水特征]]。`,
                )}
              </p>
            </SummaryBox>
          </div>

          {/* 不同赛事阶段的水钱表现卡片 */}
          <div className="mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { label: "小组赛", count: 72, volume: 837127.57, winLoss: 5178.77, expectedWater: 24122.26, actualWater: 22213.08, waterDiff: -1909.18, rateDiff: -0.23 },
                { label: "32强", count: 16, volume: 242439.99, winLoss: -2931.27, expectedWater: 7015.84, actualWater: 6874.78, waterDiff: -141.06, rateDiff: -0.06 },
                { label: "16强", count: 8, volume: 135281.08, winLoss: 526.84, expectedWater: 3912.80, actualWater: 4163.80, waterDiff: 251.00, rateDiff: 0.19 },
                { label: "8强", count: 4, volume: 72819.91, winLoss: 4954.66, expectedWater: 2090.17, actualWater: 2105.87, waterDiff: 15.70, rateDiff: 0.02 },
                { label: "半决赛", count: 2, volume: 36432.63, winLoss: 7028.81, expectedWater: 1083.18, actualWater: 1134.31, waterDiff: 51.13, rateDiff: 0.14 },
                { label: "季军赛", count: 1, volume: 16799.38, winLoss: -1039.36, expectedWater: 497.70, actualWater: 454.81, waterDiff: -42.89, rateDiff: -0.26 },
                { label: "冠军赛", count: 1, volume: 21029.86, winLoss: 6266.31, expectedWater: 603.57, actualWater: 467.46, waterDiff: -136.11, rateDiff: -0.65 },
              ].map((stage) => {
                const isLoss = stage.waterDiff < 0;

                return (
                  <div
                    key={stage.label}
                    className="p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/50 flex flex-col justify-between shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-1 mb-2 border-b border-slate-200/60 pb-1.5">
                      <span className="text-[13px] font-black text-slate-950 truncate">
                        {stage.label}
                      </span>
                      <span className="text-[10px] text-slate-950 font-bold bg-slate-200/60 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                        {stage.count} 场
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-950 font-bold">预期水钱</span>
                        <span className="font-mono font-bold text-slate-950">
                          {stage.expectedWater.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-950 font-bold">实际水钱</span>
                        <span className="font-mono font-bold text-slate-950">
                          {stage.actualWater.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-200/50 pt-1.5">
                        <span className="text-slate-950 font-bold">水钱差</span>
                        <span
                          className={`font-mono font-black ${
                            isLoss ? "text-rose-600" : "text-emerald-600"
                          }`}
                        >
                          {stage.waterDiff > 0 ? "+" : ""}
                          {stage.waterDiff.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-950 font-bold">抽水率差</span>
                        <span
                          className={`font-mono font-black ${
                            isLoss ? "text-rose-600" : "text-emerald-600"
                          }`}
                        >
                          {stage.rateDiff > 0 ? "+" : ""}
                          {stage.rateDiff.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="h-[400px] w-full mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={waterDiffMatchData}
              margin={{ top: 20, right: 20, left: 20, bottom: 12 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="matchNo"
                axisLine={false}
                tickLine={false}
                padding={{ left: 10, right: 10 }}
                tick={{
                  fill: "#64748b",
                  fontSize: 13,
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              />
              <YAxis
                yAxisId="left"
                width={60}
                axisLine={false}
                tickLine={false}
                domain={waterYDomain}
                tick={{
                  fill: "#64748b",
                  fontSize: 13,
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                width={60}
                axisLine={false}
                tickLine={false}
                tick={false}
                domain={waterYDomain}
              />

              <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={1.5} />
              {/* Tooltip removed to disable interaction */}

              <Bar dataKey="waterDiff" yAxisId="left" barSize={10} isAnimationActive={false}>
                {waterDiffMatchData.map((entry, idx) => {
                  const isPositive = entry.waterDiff >= 0;
                  return (
                    <Cell
                      key={`cell-${idx}`}
                      fill={isPositive ? "#10b981" : "#ef4444"}
                    />
                  );
                })}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* 核心玩法水钱分析 - 参照 Section 2 形式 */}
        <div className="mt-8">
          <div className="mb-6">
            <h6 className="text-xl font-black text-slate-950 tracking-tight mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-600 rounded-full" />
              核心玩法水钱分析
            </h6>
            <SummaryBox>
              <div className="space-y-3">
                <p className="text-base text-slate-950 font-bold leading-relaxed">
                  {highlightNumbers(
                    "在 [[blue:4个核心玩法]] 中，有 [[red:3个呈亏水]] 状态（其中 [[全场大小]] 亏水 [[red:-2,141.05]]，[[全场让球]] 亏水 [[red:-158.53]]，[[上半场让球]] 亏水 [[red:-94.87]]；仅 [[上半场大小]] 呈 [[green:+483.04]] 正向偏离）。",
                  )}
                </p>
                <div className="pt-2 border-t border-blue-100/80">
                  <p className="text-sm font-bold text-slate-900 bg-amber-50/80 p-3 rounded-lg border border-amber-200/80 text-amber-950 flex items-start gap-2.5 shadow-2xs">
                    <span className="p-1 rounded-md bg-amber-100 text-amber-600 shrink-0 mt-0.5">
                      <Lightbulb className="w-4 h-4" />
                    </span>
                    <span className="leading-relaxed">
                      {highlightNumbers(
                        "结构上[[早盘均未亏水]]，亏水全部集中于[[滚球阶段]]：风控对[[早盘监控更为提前]]，能对早盘赔率及投注数据实施前置监控与分析，拥有充足时间与B端沟通调整；而[[滚球阶段]]受实时动态因素较多限制，风控可干预的时空有限，后续主要依赖操盘端本身策略与工具的升级优化。",
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </SummaryBox>
          </div>

          {/* 数据表格 - 采用 Section 2 的高对比度、层级分明形式 */}
          <div className="overflow-x-auto border border-slate-200/60 rounded-xl shadow-none relative">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100 shadow-none">
                <tr className="border-b-2 border-slate-300 text-slate-950 font-black text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 text-left border-r border-slate-300/80 bg-slate-100">
                    玩法类型/投注阶段
                  </th>
                  <th className="py-3 px-3 text-right border-r border-slate-300/80 bg-slate-100">
                    预期水钱盈利
                  </th>
                  <th className="py-3 px-3 text-right border-r border-slate-300/80 bg-slate-100">
                    实际水钱盈利
                  </th>
                  <th className="py-3 px-3 text-right border-r border-slate-300/80 bg-slate-100">
                    水钱盈利差
                  </th>
                  <th className="py-3 px-3 text-right border-r border-slate-300/80 bg-slate-100">
                    预期抽水率
                  </th>
                  <th className="py-3 px-3 text-right border-r border-slate-300/80 bg-slate-100">
                    实际抽水率
                  </th>
                  <th className="py-3 px-3 text-right bg-slate-100">
                    抽水率差
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {playstyleWaterDiffData.map((item, index) => (
                  <tr 
                    key={`water-playstyle-${index}`} 
                    className={`${item.isSub ? "bg-slate-50/30" : "bg-white font-bold"}`}
                  >
                    <td className={`py-2.5 px-4 border-r border-slate-100 text-[11px] ${item.isSub ? "pl-10 text-slate-950 font-bold italic" : "text-slate-950 font-black"}`}>
                      {!item.isSub ? "● " : "└ "}
                      {item.name}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-950 font-bold border-r border-slate-100 text-[11px]">
                      {item.expectedWater.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-950 font-bold border-r border-slate-100 text-[11px]">
                      {item.actualWater.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums border-r border-slate-100 text-[11px]">
                      <SignColoredValue
                        value={item.waterDiff.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                        className="font-black"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-950 font-bold border-r border-slate-100 text-[11px]">
                      {item.expectedRate.toFixed(2)}%
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-950 font-bold border-r border-slate-100 text-[11px]">
                      {item.actualRate.toFixed(2)}%
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[11px]">
                      <SignColoredValue
                        className="font-black"
                        value={
                          item.rateDiff.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) + "%"
                        }
                      />
                    </td>
                  </tr>
                ))}
                {/* Total row */}
                <tr className="bg-slate-50 text-slate-950 font-black border-t-2 border-slate-300">
                  <td className="py-3 px-4 border-r border-slate-200 text-[11px]">
                    总计
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums border-r border-slate-200 text-[11px]">
                    {matchTrendSummary.totalExpectedWater.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums border-r border-slate-200 text-[11px]">
                    {matchTrendSummary.totalActualWater.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums border-r border-slate-200 text-[11px]">
                    {matchTrendSummary.totalWaterDiff.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums border-r border-slate-200 text-[11px]">
                    {matchTrendSummary.expectedWaterRate.toFixed(2)}%
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums border-r border-slate-200 text-[11px]">
                    {matchTrendSummary.actualWaterRate.toFixed(2)}%
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-[11px]">
                    {matchTrendSummary.waterRateDiff.toFixed(2)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-6 w-full mt-2">
      {mode === "trading" || mode === "all" ? renderTradingAnalysis() : null}
      {mode === "water" || mode === "all" ? renderWaterMonitoring() : null}
    </div>
  );
};
export default MatchVolumeRateChart;
