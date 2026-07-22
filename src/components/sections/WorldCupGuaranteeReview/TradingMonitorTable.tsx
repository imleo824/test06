import React, { useState } from "react";
import {
  Eye,
  ShieldAlert,
  BarChart3,
  TrendingUp,
  CheckCircle,
  Info,
} from "lucide-react";

import { highlightNumbers, SummaryBox } from "./utils";

interface SubMarketItem {
  name: string;
  bets: number;
  amount: number;
  expectedWinLoss: number;
  avgOdds: number;
  evaluation?: string;
  isAnomaly?: boolean;
}

interface MarketGroup {
  category: string;
  totalBets: number;
  totalAmount: number;
  totalExpectedWinLoss: number;
  avgOdds: number;
  items: SubMarketItem[];
}

export const TradingMonitorTable: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const marketData: MarketGroup[] = [
    {
      category: "全场大小",
      totalBets: 18977,
      totalAmount: 14437808.17,
      totalExpectedWinLoss: 14198651.49,
      avgOdds: 0.98,
      items: [
        {
          name: "大1.5",
          bets: 749,
          amount: 721346.32,
          expectedWinLoss: 304675.85,
          avgOdds: 0.42,
          evaluation: "正常",
        },
        {
          name: "大1.5/2",
          bets: 334,
          amount: 170086.07,
          expectedWinLoss: 90103.24,
          avgOdds: 0.53,
          evaluation: "正常",
        },
        {
          name: "大1/1.5",
          bets: 6,
          amount: 10223.41,
          expectedWinLoss: 2964.79,
          avgOdds: 0.29,
          evaluation: "低频投注",
        },
        {
          name: "大2",
          bets: 2633,
          amount: 2098365.3,
          expectedWinLoss: 1516578.12,
          avgOdds: 0.72,
          evaluation: "密集注入",
        },
        {
          name: "大2.5",
          bets: 1890,
          amount: 1582570.47,
          expectedWinLoss: 2086356.51,
          avgOdds: 1.32,
          evaluation: "正常",
        },
        {
          name: "大2.5/3",
          bets: 218,
          amount: 184419.18,
          expectedWinLoss: 315026.73,
          avgOdds: 1.71,
          evaluation: "高水位波动",
        },
        {
          name: "大2/2.5",
          bets: 8767,
          amount: 5634470.81,
          expectedWinLoss: 5781365.57,
          avgOdds: 1.03,
          evaluation: "核心热门",
          isAnomaly: true,
        },
        {
          name: "大3",
          bets: 593,
          amount: 379506.48,
          expectedWinLoss: 907232.21,
          avgOdds: 2.39,
          evaluation: "高赔买入",
        },
        {
          name: "小1.5",
          bets: 45,
          amount: 26925.9,
          expectedWinLoss: 51561.39,
          avgOdds: 1.91,
          evaluation: "正常",
        },
        {
          name: "小1.5/2",
          bets: 18,
          amount: 17640.65,
          expectedWinLoss: 27334.95,
          avgOdds: 1.55,
          evaluation: "正常",
        },
        {
          name: "小2",
          bets: 357,
          amount: 248779.13,
          expectedWinLoss: 301346.56,
          avgOdds: 1.21,
          evaluation: "正常",
        },
        {
          name: "小2.5",
          bets: 492,
          amount: 375454.49,
          expectedWinLoss: 246946.24,
          avgOdds: 0.66,
          evaluation: "正常",
        },
        {
          name: "小2.5/3",
          bets: 92,
          amount: 34598.63,
          expectedWinLoss: 16838.65,
          avgOdds: 0.49,
          evaluation: "正常",
        },
        {
          name: "小2/2.5",
          bets: 2662,
          amount: 2918394.75,
          expectedWinLoss: 2539232.66,
          avgOdds: 0.87,
          evaluation: "正常",
        },
        {
          name: "小3",
          bets: 121,
          amount: 35026.58,
          expectedWinLoss: 11088.05,
          avgOdds: 0.32,
          evaluation: "正常",
        },
      ],
    },
    {
      category: "全场独赢",
      totalBets: 30081,
      totalAmount: 13786912.32,
      totalExpectedWinLoss: 24983416.46,
      avgOdds: 1.81,
      items: [
        {
          name: "平局",
          bets: 7836,
          amount: 3150614.29,
          expectedWinLoss: 6679193.61,
          avgOdds: 2.12,
          evaluation: "平局防范",
        },
        {
          name: "西班牙",
          bets: 11722,
          amount: 6445489.82,
          expectedWinLoss: 8061907.33,
          avgOdds: 1.25,
          evaluation: "胜方热门",
        },
        {
          name: "阿根廷",
          bets: 10523,
          amount: 4190808.21,
          expectedWinLoss: 10242315.52,
          avgOdds: 2.44,
          evaluation: "高风险高暴露",
          isAnomaly: true,
        },
      ],
    },
    {
      category: "全场让球",
      totalBets: 18295,
      totalAmount: 21457194.81,
      totalExpectedWinLoss: 20601058.78,
      avgOdds: 0.96,
      items: [
        {
          name: "西班牙 +0.5",
          bets: 203,
          amount: 489884.49,
          expectedWinLoss: 175809.94,
          avgOdds: 0.36,
          evaluation: "正常",
        },
        {
          name: "西班牙 +0/0.5",
          bets: 150,
          amount: 177428.06,
          expectedWinLoss: 82572.94,
          avgOdds: 0.47,
          evaluation: "正常",
        },
        {
          name: "西班牙 0",
          bets: 860,
          amount: 1178857.22,
          expectedWinLoss: 739666.15,
          avgOdds: 0.63,
          evaluation: "正常",
        },
        {
          name: "西班牙 -0.5",
          bets: 1409,
          amount: 1348045.64,
          expectedWinLoss: 1690614.1,
          avgOdds: 1.25,
          evaluation: "正常",
        },
        {
          name: "西班牙 -0.5/1",
          bets: 170,
          amount: 120898.76,
          expectedWinLoss: 204738.35,
          avgOdds: 1.69,
          evaluation: "水位预警",
        },
        {
          name: "西班牙 -0/0.5",
          bets: 7155,
          amount: 10122679.71,
          expectedWinLoss: 9313435.71,
          avgOdds: 0.92,
          evaluation: "极度偏重投注",
          isAnomaly: true,
        },
        {
          name: "西班牙 -1",
          bets: 404,
          amount: 457387.98,
          expectedWinLoss: 1134973.0,
          avgOdds: 2.48,
          evaluation: "高危偏离",
        },
        {
          name: "阿根廷 +0.5",
          bets: 1206,
          amount: 1449496.04,
          expectedWinLoss: 1039068.78,
          avgOdds: 0.72,
          evaluation: "正常",
        },
        {
          name: "阿根廷 +0.5/1",
          bets: 143,
          amount: 62741.14,
          expectedWinLoss: 31863.02,
          avgOdds: 0.51,
          evaluation: "正常",
        },
        {
          name: "阿根廷 +0/0.5",
          bets: 5809,
          amount: 5531953.61,
          expectedWinLoss: 5468523.54,
          avgOdds: 0.99,
          evaluation: "正常",
        },
        {
          name: "阿根廷 +1",
          bets: 126,
          amount: 60718.3,
          expectedWinLoss: 19398.45,
          avgOdds: 0.32,
          evaluation: "正常",
        },
        {
          name: "阿根廷 0",
          bets: 469,
          amount: 377273.9,
          expectedWinLoss: 533102.32,
          avgOdds: 1.41,
          evaluation: "正常",
        },
        {
          name: "阿根廷 -0.5",
          bets: 144,
          amount: 49189.65,
          expectedWinLoss: 110111.2,
          avgOdds: 2.24,
          evaluation: "高风险",
        },
        {
          name: "阿根廷 -0/0.5",
          bets: 47,
          amount: 30640.31,
          expectedWinLoss: 57181.29,
          avgOdds: 1.87,
          evaluation: "正常",
        },
      ],
    },
    {
      category: "上半场大小",
      totalBets: 2870,
      totalAmount: 1361633.74,
      totalExpectedWinLoss: 1375183.98,
      avgOdds: 1.01,
      items: [
        {
          name: "大0.5",
          bets: 346,
          amount: 133298.95,
          expectedWinLoss: 78933.55,
          avgOdds: 0.59,
          evaluation: "正常",
        },
        {
          name: "大0.5/1",
          bets: 1210,
          amount: 472988.73,
          expectedWinLoss: 408368.29,
          avgOdds: 0.86,
          evaluation: "正常",
        },
        {
          name: "大1",
          bets: 315,
          amount: 161435.05,
          expectedWinLoss: 236772.51,
          avgOdds: 1.47,
          evaluation: "正常",
        },
        {
          name: "大1/1.5",
          bets: 142,
          amount: 69913.63,
          expectedWinLoss: 143846.89,
          avgOdds: 2.06,
          evaluation: "水位高敏感",
        },
        {
          name: "小0.5",
          bets: 144,
          amount: 47240.24,
          expectedWinLoss: 66235.88,
          avgOdds: 1.4,
          evaluation: "正常",
        },
        {
          name: "小0.5/1",
          bets: 560,
          amount: 381418.88,
          expectedWinLoss: 388688.29,
          avgOdds: 1.02,
          evaluation: "正常",
        },
        {
          name: "小1",
          bets: 127,
          amount: 89225.66,
          expectedWinLoss: 50087.11,
          avgOdds: 0.56,
          evaluation: "正常",
        },
        {
          name: "小1/1.5",
          bets: 26,
          amount: 6112.63,
          expectedWinLoss: 2251.47,
          avgOdds: 0.37,
          evaluation: "正常",
        },
      ],
    },
    {
      category: "上半场独赢",
      totalBets: 3619,
      totalAmount: 1249784.37,
      totalExpectedWinLoss: 2645494.41,
      avgOdds: 2.12,
      items: [
        {
          name: "平局",
          bets: 1027,
          amount: 357255.12,
          expectedWinLoss: 354910.18,
          avgOdds: 0.99,
          evaluation: "正常",
        },
        {
          name: "西班牙",
          bets: 1399,
          amount: 540350.83,
          expectedWinLoss: 1065224.82,
          avgOdds: 1.97,
          evaluation: "半场强势",
        },
        {
          name: "阿根廷",
          bets: 1193,
          amount: 352178.42,
          expectedWinLoss: 1225359.41,
          avgOdds: 3.48,
          evaluation: "高水位买入",
        },
      ],
    },
    {
      category: "上半场让球",
      totalBets: 630,
      totalAmount: 615422.25,
      totalExpectedWinLoss: 763056.03,
      avgOdds: 1.24,
      items: [
        {
          name: "西班牙 +0/0.5",
          bets: 17,
          amount: 2450.31,
          expectedWinLoss: 770.36,
          avgOdds: 0.31,
          evaluation: "正常",
        },
        {
          name: "西班牙 0",
          bets: 55,
          amount: 25400.6,
          expectedWinLoss: 14866.69,
          avgOdds: 0.59,
          evaluation: "正常",
        },
        {
          name: "西班牙 -0.5",
          bets: 91,
          amount: 72253.76,
          expectedWinLoss: 138655.18,
          avgOdds: 1.92,
          evaluation: "正常",
        },
        {
          name: "西班牙 -0/0.5",
          bets: 257,
          amount: 131547.49,
          expectedWinLoss: 167176.27,
          avgOdds: 1.27,
          evaluation: "正常",
        },
        {
          name: "阿根廷 +0.5",
          bets: 18,
          amount: 4611.4,
          expectedWinLoss: 1841.33,
          avgOdds: 0.4,
          evaluation: "正常",
        },
        {
          name: "阿根廷 +0/0.5",
          bets: 96,
          amount: 185409.85,
          expectedWinLoss: 119659.57,
          avgOdds: 0.65,
          evaluation: "正常",
        },
        {
          name: "阿根廷 0",
          bets: 73,
          amount: 136976.07,
          expectedWinLoss: 190310.32,
          avgOdds: 1.39,
          evaluation: "正常",
        },
        {
          name: "阿根廷 -0/0.5",
          bets: 23,
          amount: 56772.77,
          expectedWinLoss: 129776.31,
          avgOdds: 2.29,
          evaluation: "正常",
        },
      ],
    },
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("zh-CN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const filteredData = marketData;

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-none"
      id="trading-monitor-section"
    >
      {/* Header and Controls */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Eye className="h-5 w-5" />
            </span>
            <div className="flex items-center gap-3">
              <h4 className="text-xl font-black tracking-tight text-slate-950 md:text-2xl">
                赛事即时操盘监控
              </h4>
              <span className="text-sm font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                26年下半年重点协同建设方向
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Footnote appropriate for projection / static reporting */}
      <div className="mb-6">
        <SummaryBox className="mb-6">
          <p className="text-base text-slate-950 font-bold leading-relaxed">
            {highlightNumbers(
              "系统将通过【外部】[[百家赔监控]]外部赔率偏离异常，结合【内部】[[操盘数据监控]]自身赔率抽水合理，后续将推进以下两个关键点：",
            )}
          </p>
        </SummaryBox>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5 text-slate-950 font-black text-base">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>关键方向一：百家赔数据源（监控外部赔率异常）</span>
              </div>
              <div className="text-sm font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full">
                进度：90%
              </div>
            </div>
            <p className="text-base text-slate-950 font-bold leading-relaxed">
              {highlightNumbers(
                "目前缺少[[blue:平博]]，需要继续推动B端尽快引入。通过引入更完整的[[百家赔数据]]，实现自身盘口赔率与外部市场主流赔率的[[red:异常偏离监控]]，保障[[外部定价对齐]]，[[green:降低被打水机率]]。",
              )}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5 text-slate-950 font-black text-base">
                <span className="w-2 h-2 rounded-full bg-blue-600 " />
                <span>关键方向二：操盘数据监控（监控内部赔率异常）</span>
              </div>
              <div className="text-sm font-black text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full">
                进度：45%
              </div>
            </div>
            <p className="text-base text-slate-950 font-bold leading-relaxed">
              {highlightNumbers(
                "目前内部的[[赔率联动]]覆盖进球类玩法 [[blue:90%]]，但仍缺乏核心的[[赛事操盘过程数据]]。后续将重点推进全部比赛的玩法、盘口赔率与投注数据的[[blue:自动对接]]，以实现对自身盘口合理性的[[green:即时监控]]。",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Main Excel-like Structured Table */}
      <div className="mb-3 text-slate-900 font-bold text-sm bg-blue-50 text-blue-900 border border-blue-200 px-4 py-2 rounded-lg inline-block">
        以 西班牙 vs 阿根廷
        为例，将来要实现如下方表格呈现的B端操盘过程合理性即时监控
      </div>
      <div className="overflow-x-auto border border-slate-200/60 rounded-2xl shadow-none">
        <table className="w-full min-w-[950px] border-collapse text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/60 text-slate-900 font-black text-sm uppercase tracking-wider">
              <th className="py-4 px-6 min-w-[240px] text-slate-900 font-black">
                西班牙 vs 阿根廷
              </th>
              <th className="py-4 px-4 text-right text-slate-900 font-black">
                单数
              </th>
              <th className="py-4 px-4 text-right text-slate-900 font-black">
                总流水
              </th>
              <th className="py-4 px-4 text-right text-slate-900 font-black">
                预计输赢
              </th>
              <th className="py-4 px-4 text-right bg-blue-100/80 border-l border-blue-200 min-w-[130px] text-blue-900 font-black">
                平均赔率（内部）
              </th>
              <th className="py-4 px-4 text-right bg-indigo-100/80 border-l border-indigo-200 min-w-[130px] text-indigo-900 font-black">
                百家赔率 (外部)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70">
            {filteredData.map((group) => {
              const groupMarketOdds = Number((group.avgOdds + 0.02).toFixed(2));
              return (
                <React.Fragment key={group.category}>
                  {/* Parent Row (Pivot Table Group Header) */}
                  <tr className="bg-slate-50/70 font-black text-sm text-slate-950 border-y border-slate-200/60">
                    <td className="py-3.5 px-6 flex items-center gap-2 font-black">
                      <div className="w-2.5 h-2.5 rounded-sm bg-slate-950" />
                      <span>{group.category}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-black">
                      {group.totalBets.toLocaleString("zh-CN")}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-black text-slate-950">
                      {formatNumber(group.totalAmount)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-black text-slate-950">
                      {formatNumber(group.totalExpectedWinLoss)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-black bg-blue-50/40 border-l border-blue-100 text-slate-950">
                      {group.avgOdds.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-black bg-indigo-50/40 border-l border-indigo-100 text-slate-950">
                      {groupMarketOdds.toFixed(2)}
                    </td>
                  </tr>

                  {/* Sub-Market Child Rows */}
                  {isExpanded &&
                    group.items
                      .slice(0, group.category === "全场大小" ? 3 : 1)
                      .map((item, itemIdx) => {
                        // Dynamically mock market odds with slight deviation
                          let marketOdds = item.avgOdds;
                        if (item.isAnomaly) {
                          marketOdds = Number((item.avgOdds + 0.15).toFixed(2));
                        } else {
                          const hash = (item.name || "")
                            .split("")
                            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
                          const diff = ((hash % 5) - 2) * 0.02; // -0.04 to +0.04
                          marketOdds = Number(Math.max(0.1, item.avgOdds + diff).toFixed(2));
                        }

                        return (
                          <tr
                            key={`${group.category}-${item.name}-${itemIdx}`}
                            className={`text-slate-900 text-sm font-semibold border-b border-slate-100 ${
                              item.isAnomaly
                                ? "bg-red-50/40 hover:bg-red-50/60"
                                : ""
                            }`}
                          >
                            <td className="py-3 px-6 pl-12 text-slate-800 font-bold flex items-center gap-2">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${item.isAnomaly ? "bg-red-500" : "bg-slate-300"}`}
                              />
                              {item.name}
                            </td>
                            <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-950 font-bold">
                              {item.bets.toLocaleString("zh-CN")}
                            </td>
                            <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-950 font-bold">
                              {formatNumber(item.amount)}
                            </td>
                            <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-950 font-bold">
                              {formatNumber(item.expectedWinLoss)}
                            </td>
                            <td
                              className={`py-3 px-4 text-right font-mono tabular-nums border-l border-blue-100 bg-blue-50/20 ${
                                item.isAnomaly
                                  ? "text-red-600 font-black"
                                  : "text-slate-950 font-bold"
                              }`}
                            >
                              {item.avgOdds}
                            </td>
                            <td
                              className={`py-3 px-4 text-right font-mono tabular-nums border-l border-indigo-100 bg-indigo-50/20 ${
                                item.isAnomaly
                                  ? "text-red-600 font-black"
                                  : "text-slate-950 font-bold"
                              }`}
                            >
                              {marketOdds}
                            </td>
                          </tr>
                        );
                      })}
                  {isExpanded &&
                    group.items.length >
                      (group.category === "全场大小" ? 3 : 1) && (
                      <tr className="text-slate-300 text-sm font-bold border-b border-slate-100 bg-slate-50/10">
                        <td className="py-2 px-6 pl-12 font-black text-left">
                          ……
                        </td>
                        <td className="py-2 px-4 text-right font-mono">……</td>
                        <td className="py-2 px-4 text-right font-mono">……</td>
                        <td className="py-2 px-4 text-right font-mono">……</td>
                        <td className="py-2 px-4 text-right font-mono border-l border-slate-100/50">
                          ……
                        </td>
                        <td className="py-2 px-4 text-right font-mono border-l border-slate-100/50">
                          ……
                        </td>
                      </tr>
                    )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
