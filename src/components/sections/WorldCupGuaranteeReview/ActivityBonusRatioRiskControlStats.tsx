import React from "react";
import { Lightbulb } from "lucide-react";
import { highlightNumbers, SignColoredValue, SummaryBox } from "./utils";

export const ActivityBonusRatioRiskControlStats = () => {
  const rangeData = [
    {
      range: "有领取无存款",
      accounts: 348042,
      totalDeposit: 0,
      profitCount: 74922,
      totalProfit: 5228.61,
      lossCount: 273120,
      totalLoss: -8210.15,
      memberWinLoss: -2981.54,
      totalBonus: 15807.21,
      totalRebate: 9846.23,
      banned: 20066,
      adjust: 0,
      both: 0,
      adjustAmount: 949.91,
      rate: 5.77,
    },
    {
      range: "0.00% - 3.00%",
      accounts: 564697,
      totalDeposit: 3001908.04,
      profitCount: 117535,
      totalProfit: 121378.89,
      lossCount: 447162,
      totalLoss: -563901.18,
      memberWinLoss: -442522.28,
      totalBonus: 47285.73,
      totalRebate: 151307.63,
      banned: 30949,
      adjust: 0,
      both: 0,
      adjustAmount: 6039.42,
      rate: 5.48,
    },
    {
      range: "3.01% - 6.00%",
      accounts: 194086,
      totalDeposit: 1185586.92,
      profitCount: 35242,
      totalProfit: 33815.33,
      lossCount: 158844,
      totalLoss: -223628.54,
      memberWinLoss: -189813.2,
      totalBonus: 44454.23,
      totalRebate: 59896.04,
      banned: 5592,
      adjust: 0,
      both: 0,
      adjustAmount: 1407.54,
      rate: 2.88,
    },
    {
      range: "6.01% - 10.00%",
      accounts: 148635,
      totalDeposit: 565691.84,
      profitCount: 25267,
      totalProfit: 18390.43,
      lossCount: 123368,
      totalLoss: -108456.43,
      memberWinLoss: -90066.0,
      totalBonus: 31553.47,
      totalRebate: 30135.68,
      banned: 5614,
      adjust: 0,
      both: 0,
      adjustAmount: 686.03,
      rate: 3.78,
    },
    {
      range: "10.01% - 20.00%",
      accounts: 168208,
      totalDeposit: 455821.26,
      profitCount: 28794,
      totalProfit: 13694.99,
      lossCount: 139414,
      totalLoss: -85639.7,
      memberWinLoss: -71944.71,
      totalBonus: 34982.79,
      totalRebate: 29853.96,
      banned: 7883,
      adjust: 0,
      both: 0,
      adjustAmount: 791.12,
      rate: 4.69,
    },
    {
      range: "20.01% - 30.00%",
      accounts: 69150,
      totalDeposit: 136670.71,
      profitCount: 13158,
      totalProfit: 4644.02,
      lossCount: 55992,
      totalLoss: -22470.65,
      memberWinLoss: -17826.62,
      totalBonus: 13804.96,
      totalRebate: 7229.93,
      banned: 4588,
      adjust: 0,
      both: 0,
      adjustAmount: 260.91,
      rate: 6.63,
    },
    {
      range: "30.01% - 40.00%",
      accounts: 44240,
      totalDeposit: 62955.02,
      profitCount: 8326,
      totalProfit: 7067.29,
      lossCount: 35914,
      totalLoss: -11366.76,
      memberWinLoss: -4299.47,
      totalBonus: 7673.87,
      totalRebate: 4897.69,
      banned: 2680,
      adjust: 0,
      both: 0,
      adjustAmount: 181.36,
      rate: 6.06,
    },
    {
      range: "40.01% - 50.00%",
      accounts: 23692,
      totalDeposit: 50600.44,
      profitCount: 4230,
      totalProfit: 1292.61,
      lossCount: 19462,
      totalLoss: -5760.45,
      memberWinLoss: -4467.84,
      totalBonus: 5308.73,
      totalRebate: 2922.83,
      banned: 1286,
      adjust: 0,
      both: 0,
      adjustAmount: 77.88,
      rate: 5.43,
    },
    {
      range: "50.01% - 60.00%",
      accounts: 17926,
      totalDeposit: 44253.27,
      profitCount: 3245,
      totalProfit: 960.25,
      lossCount: 14681,
      totalLoss: -3829.92,
      memberWinLoss: -2869.67,
      totalBonus: 3774.91,
      totalRebate: 2126.07,
      banned: 603,
      adjust: 0,
      both: 0,
      adjustAmount: 55.39,
      rate: 3.36,
    },
    {
      range: "60.01% - 70.00%",
      accounts: 14514,
      totalDeposit: 30236.58,
      profitCount: 2684,
      totalProfit: 1142.51,
      lossCount: 11830,
      totalLoss: -3320.94,
      memberWinLoss: -2178.43,
      totalBonus: 3470.43,
      totalRebate: 1801.38,
      banned: 853,
      adjust: 0,
      both: 0,
      adjustAmount: 308.83,
      rate: 5.88,
    },
    {
      range: "70.01% - 80.00%",
      accounts: 12361,
      totalDeposit: 16335.36,
      profitCount: 2264,
      totalProfit: 778.54,
      lossCount: 10097,
      totalLoss: -2180.99,
      memberWinLoss: -1402.46,
      totalBonus: 2428.46,
      totalRebate: 1149.66,
      banned: 424,
      adjust: 0,
      both: 0,
      adjustAmount: 113.7,
      rate: 3.43,
    },
    {
      range: "80.01% - 90.00%",
      accounts: 7847,
      totalDeposit: 16154.82,
      profitCount: 1483,
      totalProfit: 410.07,
      lossCount: 6364,
      totalLoss: -1371.99,
      memberWinLoss: -961.92,
      totalBonus: 1917.16,
      totalRebate: 1040.12,
      banned: 275,
      adjust: 0,
      both: 0,
      adjustAmount: 37.67,
      rate: 3.5,
    },
    {
      range: "90.01% 以上",
      accounts: 58440,
      totalDeposit: 163196.01,
      profitCount: 10201,
      totalProfit: 3958.59,
      lossCount: 48239,
      totalLoss: -7536.85,
      memberWinLoss: -3578.26,
      totalBonus: 14605.55,
      totalRebate: 11016.9,
      banned: 4306,
      adjust: 0,
      both: 0,
      adjustAmount: 384.31,
      rate: 7.37,
    },
  ];

  const totalAccounts = rangeData.reduce((sum, item) => sum + item.accounts, 0);
  const totalDepositAmountSummary = rangeData.reduce(
    (sum, item) => sum + item.totalDeposit,
    0,
  );
  const totalBanned = rangeData.reduce((sum, item) => sum + item.banned, 0);
  const totalAdjust = rangeData.reduce((sum, item) => sum + item.adjust, 0);
  const totalBoth = rangeData.reduce((sum, item) => sum + item.both, 0);
  const totalProfitCount = rangeData.reduce(
    (sum, item) => sum + item.profitCount,
    0,
  );
  const totalLossCount = rangeData.reduce(
    (sum, item) => sum + item.lossCount,
    0,
  );
  const totalAdjustAmount = rangeData.reduce(
    (sum, item) => sum + item.adjustAmount,
    0,
  );
  const totalMemberWinLoss = rangeData.reduce(
    (sum, item) => sum + item.memberWinLoss,
    0,
  );
  const totalProfitAmount = rangeData.reduce(
    (sum, item) => sum + item.totalProfit,
    0,
  );
  const totalLossAmount = rangeData.reduce(
    (sum, item) => sum + item.totalLoss,
    0,
  );
  const totalBonusAmount = rangeData.reduce(
    (sum, item) => sum + item.totalBonus,
    0,
  );
  const totalRebateAmount = rangeData.reduce(
    (sum, item) => sum + item.totalRebate,
    0,
  );
  const overallRate =
    ((totalBanned + totalAdjust + totalBoth) / totalAccounts) * 100;

  return (
    <div className="space-y-6">
      {/* 核心活动子模块 */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 官网注册送 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-300 transition-colors duration-200">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5 mb-3">
              <span className="font-black text-slate-900 text-sm flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
                重点活动：官网注册送活动（截止到7.19）
              </span>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                异常占比: 1.9%
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="text-slate-500 font-bold mb-0.5">派发人数</div>
                <div className="font-mono font-black text-slate-950 text-sm">50,818 人</div>
              </div>
              <div>
                <div className="text-slate-500 font-bold mb-0.5">派发金额</div>
                <div className="font-mono font-black text-slate-950 text-sm">503</div>
              </div>
              <div>
                <div className="text-slate-500 font-bold mb-0.5">会员输赢</div>
                <div className="font-mono font-black text-rose-600 text-sm">-4659</div>
              </div>
            </div>
          </div>

          {/* 官网首存送 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-300 transition-colors duration-200">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5 mb-3">
              <span className="font-black text-slate-900 text-sm flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-amber-600 rounded-full" />
                重点活动：官网首存送活动（截止到7.19）
              </span>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                异常占比: 3.7%
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="text-slate-500 font-bold mb-0.5">派发人数</div>
                <div className="font-mono font-black text-slate-950 text-sm">92,498 人</div>
              </div>
              <div>
                <div className="text-slate-500 font-bold mb-0.5">派发金额</div>
                <div className="font-mono font-black text-slate-950 text-sm">5959.6</div>
              </div>
              <div>
                <div className="text-slate-500 font-bold mb-0.5">会员输赢</div>
                <div className="font-mono font-black text-rose-600 text-sm">-27,100.0</div>
              </div>
            </div>
          </div>

          {/* 100%投注返还 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-300 transition-colors duration-200">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5 mb-3">
              <span className="font-black text-slate-900 text-sm flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-emerald-600 rounded-full" />
                重点活动：100%投注返还（截止到7.23）
              </span>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                异常占比: 0.3%
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="text-slate-500 font-bold mb-0.5">派发人数</div>
                <div className="font-mono font-black text-slate-950 text-sm">205,743 人</div>
              </div>
              <div>
                <div className="text-slate-500 font-bold mb-0.5">派发金额（第一期）</div>
                <div className="font-mono font-black text-slate-950 text-sm">5043.9</div>
              </div>
              <div>
                <div className="text-slate-500 font-bold mb-0.5">会员输赢</div>
                <div className="font-mono font-black text-rose-600 text-sm">-19,200.0</div>
              </div>
            </div>
          </div>
        </div>

        {/* 重点活动运营保障与排班说明 */}
        <div className="flex items-start gap-2 bg-amber-50/80 p-3 rounded-lg border border-amber-200/80 text-amber-950 text-xs sm:text-sm shadow-2xs font-medium">
          <span className="p-1 rounded-md bg-amber-100 text-amber-600 shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </span>
          <div className="leading-relaxed">
            {highlightNumbers(
              "由于[[世界杯热门活动]]目前仍在派发阶段（预计[[8月中下旬]]结束），人员为保障[[线上及时性及拦截质量]]，均执行[[统一活动拦截审核标准]]并做好[[人员排班]]，以应对活动派发后的爆单情况。",
            )}
          </div>
        </div>
      </div>

      {/* 全部活动风控率 */}
      <div className="bg-white border border-slate-200/60 rounded-xl shadow-none overflow-hidden space-y-4">
        <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-bold border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 text-slate-950 font-black text-sm uppercase tracking-wider">
              <th
                rowSpan={2}
                className="py-3 px-4 text-left border-r border-slate-300/80 text-slate-950 font-black whitespace-nowrap"
              >
                红利/存款
              </th>
              <th
                rowSpan={2}
                className="py-3 px-4 text-right border-r border-slate-300/80 text-slate-950 font-black"
              >
                总人数
              </th>
              <th
                rowSpan={2}
                className="py-3 px-4 text-right border-r border-slate-300/80 text-slate-950 font-black"
              >
                总存款
              </th>
              <th
                colSpan={5}
                className="py-2.5 px-4 text-center border-b border-slate-300 text-slate-950 font-black bg-slate-100/90"
              >
                会员输赢
              </th>
              <th
                colSpan={2}
                className="py-2.5 px-4 text-center border-b border-slate-300 text-slate-950 font-black bg-slate-100/90"
              >
                红利返水
              </th>
              <th
                colSpan={2}
                className="py-2.5 px-4 text-center border-b border-slate-300 text-slate-950 font-black bg-slate-100/90"
              >
                风控结果
              </th>
              <th
                rowSpan={2}
                className="py-3 px-4 text-right w-48 text-slate-950 font-black border-l border-slate-300/80"
              >
                风控率
              </th>
            </tr>
            <tr className="bg-slate-50 border-b-2 border-slate-300 text-slate-950 font-black text-sm whitespace-nowrap">
              <th className="py-2.5 px-3 text-right text-slate-950 font-black whitespace-nowrap">
                盈利人数
              </th>
              <th className="py-2.5 px-3 text-right text-slate-950 font-black whitespace-nowrap">
                盈利额
              </th>
              <th className="py-2.5 px-3 text-right text-slate-950 font-black whitespace-nowrap">
                输钱人数
              </th>
              <th className="py-2.5 px-3 text-right text-slate-950 font-black whitespace-nowrap">
                输钱额
              </th>
              <th className="py-2.5 px-3 text-right border-r border-slate-300/80 text-slate-950 font-black whitespace-nowrap">
                总输赢
              </th>
              <th className="py-2.5 px-3 text-right text-slate-950 font-black whitespace-nowrap">
                总红利
              </th>
              <th className="py-2.5 px-3 text-right border-r border-slate-300/80 text-slate-950 font-black whitespace-nowrap">
                总返水
              </th>
              <th className="py-2.5 px-3 text-right text-slate-950 font-black whitespace-nowrap">
                拦截人数
              </th>
              <th className="py-2.5 px-3 text-right text-slate-950 font-black whitespace-nowrap">
                拦截金额
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rangeData.map((item) => (
              <tr key={item.range} className=" ">
                <td className="py-3 px-4 text-slate-950 font-black border-r border-slate-100 bg-slate-50/30">
                  {item.range}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 font-bold">
                  {item.accounts.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 font-bold">
                  {item.totalDeposit.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 font-bold">
                  {item.profitCount.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums">
                  <SignColoredValue
                    value={item.totalProfit.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    className="font-mono font-bold"
                  />
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 font-bold">
                  {item.lossCount.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums">
                  <SignColoredValue
                    value={item.totalLoss.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    className="font-mono font-bold"
                  />
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums border-r border-slate-100 bg-blue-50/30">
                  <SignColoredValue
                    value={item.memberWinLoss.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    className="font-mono font-bold"
                  />
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 font-bold">
                  {item.totalBonus.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 font-bold border-r border-slate-100">
                  {item.totalRebate.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 font-bold">
                  {(item.banned + item.adjust + item.both).toLocaleString()}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums bg-blue-50/30">
                  <SignColoredValue
                    value={item.adjustAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                    className="font-mono font-bold"
                  />
                </td>
                <td className="py-3 px-4 bg-slate-50/50 border-l border-slate-100">
                  <div className="flex items-center justify-end gap-3">
                    <span className="w-14 text-right font-mono tabular-nums font-black text-sm text-slate-950">
                      {item.rate.toFixed(2)}%
                    </span>
                    <div className="flex-1 bg-slate-200/50 rounded-full h-1.5 overflow-hidden max-w-[100px] hidden sm:block border border-slate-200">
                      <div
                        className="h-full rounded-full bg-slate-950"
                        style={{
                          width: `${Math.min((item.rate / (item.rate > 100 ? 200 : 100)) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            <tr className="bg-blue-50/70 font-black text-slate-950 border-t border-slate-200">
              <td className="py-3.5 px-4 border-r border-slate-200 uppercase tracking-wider font-black">
                汇总
              </td>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums font-black">
                {totalAccounts.toLocaleString()}
              </td>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums font-black">
                {totalDepositAmountSummary.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums font-black">
                {totalProfitCount.toLocaleString()}
              </td>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums">
                <SignColoredValue
                  value={totalProfitAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                  className="font-mono font-black"
                />
              </td>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums font-black">
                {totalLossCount.toLocaleString()}
              </td>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums">
                <SignColoredValue
                  value={totalLossAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                  className="font-mono font-black"
                />
              </td>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums border-r border-slate-200">
                <SignColoredValue
                  value={totalMemberWinLoss.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                  className="font-mono font-black"
                />
              </td>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums font-black">
                {totalBonusAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums font-black border-r border-slate-200">
                {totalRebateAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums font-black">
                {(totalBanned + totalAdjust + totalBoth).toLocaleString()}
              </td>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums">
                <span className="font-mono font-black text-blue-600">
                  {totalAdjustAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </td>
              <td className="py-3.5 px-4 border-l border-slate-200">
                <div className="flex items-center justify-end gap-3">
                  <span className="w-14 text-right font-mono tabular-nums font-black text-sm text-blue-600">
                    {overallRate.toFixed(2)}%
                  </span>
                  <div className="flex-1 bg-slate-200 rounded-full h-1.5 overflow-hidden max-w-[120px] hidden sm:block border border-slate-300/20">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${Math.min(overallRate, 100)}%` }}
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
};
export default ActivityBonusRatioRiskControlStats;
