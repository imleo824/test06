import React from "react";
import { highlightNumbers, SignColoredValue, SummaryBox } from "./utils";

export const ActivityBonusRatioRiskControlStats = () => {
  const rangeData = [
    {
      range: "无存款",
      accounts: 176361,
      totalDeposit: 0,
      profitCount: 36534,
      totalProfit: 2530.29,
      lossCount: 139827,
      totalLoss: -3635.69,
      memberWinLoss: -1105.4,
      totalBonus: 6512.8,
      totalRebate: 520.22,
      banned: 16072,
      adjust: 0,
      both: 0,
      adjustAmount: 503.82,
      rate: 9.11,
    },
    {
      range: "0.00% - 3.00%",
      accounts: 194326,
      totalDeposit: 368810.24,
      profitCount: 47777,
      totalProfit: 23177.34,
      lossCount: 146549,
      totalLoss: -80813.7,
      memberWinLoss: -57636.36,
      totalBonus: 3588.1,
      totalRebate: 3354.62,
      banned: 21155,
      adjust: 0,
      both: 0,
      adjustAmount: 2336.77,
      rate: 10.89,
    },
    {
      range: "3.01% - 6.00%",
      accounts: 101606,
      totalDeposit: 507076.77,
      profitCount: 20645,
      totalProfit: 24568.14,
      lossCount: 80961,
      totalLoss: -109822.28,
      memberWinLoss: -85254.14,
      totalBonus: 10813.69,
      totalRebate: 11488.46,
      banned: 4526,
      adjust: 0,
      both: 0,
      adjustAmount: 1234.76,
      rate: 4.45,
    },
    {
      range: "6.01% - 10.00%",
      accounts: 88482,
      totalDeposit: 349633.67,
      profitCount: 16149,
      totalProfit: 18054.05,
      lossCount: 72333,
      totalLoss: -94260.6,
      memberWinLoss: -76206.55,
      totalBonus: 12307.23,
      totalRebate: 14695.74,
      banned: 4373,
      adjust: 0,
      both: 0,
      adjustAmount: 632.44,
      rate: 4.94,
    },
    {
      range: "10.01% - 20.00%",
      accounts: 102015,
      totalDeposit: 226874.57,
      profitCount: 18575,
      totalProfit: 13080.4,
      lossCount: 83440,
      totalLoss: -83515.13,
      memberWinLoss: -70434.72,
      totalBonus: 14711.96,
      totalRebate: 16293.76,
      banned: 5959,
      adjust: 0,
      both: 0,
      adjustAmount: 511.46,
      rate: 5.84,
    },
    {
      range: "20.01% - 30.00%",
      accounts: 38693,
      totalDeposit: 50311.02,
      profitCount: 7694,
      totalProfit: 4038.28,
      lossCount: 30999,
      totalLoss: -23625.71,
      memberWinLoss: -19587.43,
      totalBonus: 6047.45,
      totalRebate: 6023.88,
      banned: 3322,
      adjust: 0,
      both: 0,
      adjustAmount: 329.03,
      rate: 8.59,
    },
    {
      range: "30.01% - 40.00%",
      accounts: 22333,
      totalDeposit: 23564.69,
      profitCount: 4688,
      totalProfit: 2232.33,
      lossCount: 17645,
      totalLoss: -10707.13,
      memberWinLoss: -8474.8,
      totalBonus: 3417.94,
      totalRebate: 4565.14,
      banned: 1914,
      adjust: 0,
      both: 0,
      adjustAmount: 108.35,
      rate: 8.57,
    },
    {
      range: "40.01% - 50.00%",
      accounts: 12357,
      totalDeposit: 11404.91,
      profitCount: 2413,
      totalProfit: 4889.48,
      lossCount: 9944,
      totalLoss: -6500.37,
      memberWinLoss: -1610.89,
      totalBonus: 2103.02,
      totalRebate: 2962.95,
      banned: 882,
      adjust: 0,
      both: 0,
      adjustAmount: 92.53,
      rate: 7.14,
    },
    {
      range: "50.01% - 60.00%",
      accounts: 8377,
      totalDeposit: 4861.27,
      profitCount: 1624,
      totalProfit: 877.14,
      lossCount: 6753,
      totalLoss: -3577.74,
      memberWinLoss: -2700.59,
      totalBonus: 1412.33,
      totalRebate: 1221.95,
      banned: 373,
      adjust: 0,
      both: 0,
      adjustAmount: 38.25,
      rate: 4.45,
    },
    {
      range: "60.01% - 70.00%",
      accounts: 6823,
      totalDeposit: 3184.07,
      profitCount: 1373,
      totalProfit: 797.29,
      lossCount: 5450,
      totalLoss: -2375.87,
      memberWinLoss: -1578.58,
      totalBonus: 1202.93,
      totalRebate: 823.79,
      banned: 537,
      adjust: 0,
      both: 0,
      adjustAmount: 139.35,
      rate: 7.87,
    },
    {
      range: "70.01% - 80.00%",
      accounts: 5438,
      totalDeposit: 1440.83,
      profitCount: 1087,
      totalProfit: 988.37,
      lossCount: 4351,
      totalLoss: -1310.38,
      memberWinLoss: -322.01,
      totalBonus: 848.4,
      totalRebate: 224.32,
      banned: 263,
      adjust: 0,
      both: 0,
      adjustAmount: 68.85,
      rate: 4.84,
    },
    {
      range: "80.01% - 90.00%",
      accounts: 3809,
      totalDeposit: 946.14,
      profitCount: 726,
      totalProfit: 233.41,
      lossCount: 3083,
      totalLoss: -902.31,
      memberWinLoss: -668.9,
      totalBonus: 610.85,
      totalRebate: 186.98,
      banned: 170,
      adjust: 0,
      both: 0,
      adjustAmount: 15.8,
      rate: 4.46,
    },
    {
      range: "90.01% 以上",
      accounts: 25978,
      totalDeposit: 3185.29,
      profitCount: 5189,
      totalProfit: 7161.64,
      lossCount: 20789,
      totalLoss: -4573.43,
      memberWinLoss: 2588.21,
      totalBonus: 4184.93,
      totalRebate: 2031.74,
      banned: 2251,
      adjust: 0,
      both: 0,
      adjustAmount: 283.91,
      rate: 8.67,
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
    <div className="bg-white border border-slate-200/60 rounded-xl p-4 md:p-5 shadow-none overflow-hidden space-y-4">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center justify-between gap-4">
          <h5 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <span>2. 全部活动风控率</span>
          </h5>
        </div>
        <SummaryBox className="mt-2 mb-0 p-4">
          {highlightNumbers(
            "SJB期间所有领过红利的用户，按照不同的红利/存款比例进行风控分析，整体保持稳健，平均[[风控拦截率]]为 [[7.86%]]。其中[[低红利占比]]（0-3%）与[[无存款]]人群的[[拦截率]]相对较高（约 [[9-11%]]），有效防范了[[低门槛套利]]风险。",
          )}
        </SummaryBox>
      </div>

      <div className="overflow-x-auto border border-slate-200/60 rounded-xl shadow-none">
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
            <tr className="bg-slate-50 border-b-2 border-slate-300 text-slate-950 font-black text-sm">
              <th className="py-2.5 px-3 text-right text-slate-950 font-black">
                盈利人数
              </th>
              <th className="py-2.5 px-3 text-right text-slate-950 font-black">
                盈利额
              </th>
              <th className="py-2.5 px-3 text-right text-slate-950 font-black">
                输钱人数
              </th>
              <th className="py-2.5 px-3 text-right text-slate-950 font-black">
                输钱额
              </th>
              <th className="py-2.5 px-3 text-right border-r border-slate-300/80 text-slate-950 font-black">
                总输赢
              </th>
              <th className="py-2.5 px-3 text-right text-slate-950 font-black">
                总红利
              </th>
              <th className="py-2.5 px-3 text-right border-r border-slate-300/80 text-slate-950 font-black">
                总返水
              </th>
              <th className="py-2.5 px-3 text-right text-slate-950 font-black">
                拦截人数
              </th>
              <th className="py-2.5 px-3 text-right text-slate-950 font-black">
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
  );
};
export default ActivityBonusRatioRiskControlStats;
