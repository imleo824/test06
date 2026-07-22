import React from "react";
import { SignColoredValue, highlightNumbers, SummaryBox } from "./utils";
import { siteNewUserRiskControlData as siteData } from "./data";

export const SiteNewUserRiskControlStats = () => {
  const sortedData = React.useMemo(() => {
    return [...siteData].sort((a, b) => b.rate - a.rate);
  }, []);

  const totalAccounts = siteData.reduce((sum, item) => sum + item.accounts, 0);
  const totalDepositAmountSummary = siteData.reduce((sum, item) => sum + item.totalDeposit, 0);
  const totalBanned = siteData.reduce((sum, item) => sum + item.banned, 0);
  const totalAdjust = siteData.reduce((sum, item) => sum + item.adjust, 0);
  const totalBoth = siteData.reduce((sum, item) => sum + item.both, 0);
  const totalProfitCount = siteData.reduce((sum, item) => sum + item.profitCount, 0);
  const totalLossCount = siteData.reduce((sum, item) => sum + item.lossCount, 0);
  const totalAdjustAmount = siteData.reduce((sum, item) => sum + item.adjustAmount, 0);
  const totalMemberWinLoss = siteData.reduce((sum, item) => sum + item.memberWinLoss, 0);
  const totalProfitAmount = siteData.reduce((sum, item) => sum + item.totalProfit, 0);
  const totalLossAmount = siteData.reduce((sum, item) => sum + item.totalLoss, 0);
  const totalBonusAmount = siteData.reduce((sum, item) => sum + item.totalBonus, 0);
  const totalRebateAmount = siteData.reduce((sum, item) => sum + item.totalRebate, 0);
  const overallRate = ((totalBanned + totalAdjust + totalBoth) / totalAccounts * 100);

  return (
    <div className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-5 md:p-6 space-y-6">
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full shrink-0" />
            <span>4.2.2 新人风控率</span>
          </h4>
          <span className="text-xs text-slate-950 font-black bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200">
            风控率 = 拦截人数 / 总人数
          </span>
        </div>
        <SummaryBox className="mt-4 mb-0 p-4 flex flex-col gap-2.5">
          <div>
            {highlightNumbers(`SJB期间注册的用户且有发起提款的数量 [[${totalAccounts.toLocaleString()} 人]]，发现[[高风险异常账号]] [[${(totalBanned + totalAdjust + totalBoth).toLocaleString()} 人]]，[[拦截金额]]达 [[green:${totalAdjustAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}]]，整体实现 [[${overallRate.toFixed(2)}%]] 的[[新人风控率]]。`)}
          </div>
          <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-600 flex items-center gap-1.5 font-normal">
            <span className="inline-block w-1 h-1 rounded-full bg-slate-400 shrink-0" />
            <span>
              {highlightNumbers(`备注：[[blue:A8]] 玩家总输赢为 [[blue:21,173.24]]，该数据主要由[[核心一些出货客户]]投注导致，共拦截金额 [[green:2,037.44]]。`)}
            </span>
          </div>
        </SummaryBox>
      </div>
 
 {/* Risk Control Table Card */}
 <div className="bg-white border border-slate-200/60 rounded-xl shadow-none overflow-hidden space-y-4">
 <div className="overflow-x-auto">
 <table className="w-full text-left text-sm font-bold border-collapse">
 <thead>
 <tr className="bg-slate-100 border-b border-slate-300 text-slate-950 font-bold text-sm uppercase tracking-wider">
 <th rowSpan={2} className="py-3 px-4 text-left border-r border-slate-300/80 text-slate-950 font-bold">站点</th>
 <th rowSpan={2} className="py-3 px-4 text-right border-r border-slate-300/80 text-slate-950 font-bold">总人数</th>
 <th rowSpan={2} className="py-3 px-4 text-right border-r border-slate-300/80 text-slate-950 font-bold">总存款</th>
 <th colSpan={5} className="py-2.5 px-4 text-center border-b border-slate-300 text-slate-950 font-bold bg-slate-100/90">会员输赢</th>
 <th colSpan={2} className="py-2.5 px-4 text-center border-b border-slate-300 text-slate-950 font-bold bg-slate-100/90">红利返水</th>
 <th colSpan={2} className="py-2.5 px-4 text-center border-b border-slate-300 text-slate-950 font-bold bg-slate-100/90">风控结果</th>
 <th rowSpan={2} className="py-3 px-4 text-right w-48 text-slate-950 font-bold border-l border-slate-300/80">风控率</th>
 </tr>
 <tr className="bg-slate-50 border-b-2 border-slate-300 text-slate-900 font-bold text-sm">
 <th className="py-2.5 px-3 text-right text-slate-950 font-bold">盈利人数</th>
 <th className="py-2.5 px-3 text-right text-slate-950 font-bold">盈利额</th>
 <th className="py-2.5 px-3 text-right text-slate-950 font-bold">输钱人数</th>
 <th className="py-2.5 px-3 text-right text-slate-950 font-bold">输钱额</th>
 <th className="py-2.5 px-3 text-right border-r border-slate-300/80 text-slate-950 font-bold">总输赢</th>
 <th className="py-2.5 px-3 text-right text-slate-950 font-bold">总红利</th>
 <th className="py-2.5 px-3 text-right border-r border-slate-300/80 text-slate-950 font-bold">总返水</th>
 <th className="py-2.5 px-3 text-right text-slate-950 font-bold">拦截人数</th>
 <th className="py-2.5 px-3 text-right text-slate-950 font-bold">拦截金额</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {sortedData.map((item) => (
 <tr key={item.site} className=" ">
 <td className="py-3 px-4 text-slate-950 font-black border-r border-slate-100 bg-slate-50/30">
 {item.site}
 </td>
 <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 font-bold">{item.accounts.toLocaleString()}</td>
 <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 font-bold">{item.totalDeposit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
 <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 font-bold">{item.profitCount.toLocaleString()}</td>
 <td className="py-3 px-3 text-right font-mono tabular-nums">
 <SignColoredValue value={item.totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} className="font-mono font-bold" />
 </td>
 <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 font-bold">{item.lossCount.toLocaleString()}</td>
 <td className="py-3 px-3 text-right font-mono tabular-nums">
 <SignColoredValue value={item.totalLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} className="font-mono font-bold" />
 </td>
 <td className="py-3 px-3 text-right font-mono tabular-nums border-r border-slate-100 bg-blue-50/30">
 <SignColoredValue value={item.memberWinLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} className="font-mono font-bold" />
 </td>
 <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 font-bold">{item.totalBonus.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
 <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 font-bold border-r border-slate-100">{item.totalRebate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
 <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 font-bold">{(item.banned + item.adjust + item.both).toLocaleString()}</td>
 <td className="py-3 px-3 text-right font-mono tabular-nums bg-blue-50/30">
 <SignColoredValue value={item.adjustAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} className="font-mono font-bold" />
 </td>
 <td className="py-3 px-4 bg-slate-50/50 border-l border-slate-100">
 <div className="flex items-center justify-end gap-3">
 <span className={`w-14 text-right font-mono tabular-nums font-black text-sm text-slate-950`}>
 {item.rate.toFixed(2)}%
 </span>
 <div className="flex-1 bg-slate-200/75 rounded-full h-1.5 overflow-hidden max-w-[120px] hidden sm:block">
 <div 
 className="h-full rounded-full bg-slate-900"
 style={{ width: `${Math.min((item.rate / (overallRate * 2)) * 100, 100)}%` }}
 />
 </div>
 </div>
 </td>
 </tr>
 ))}
 <tr className="border-t border-slate-200 bg-blue-50/70 font-black text-slate-950">
 <td className="py-3.5 px-4 uppercase tracking-wider border-r border-slate-200 font-black">汇总</td>
 <td className="py-3.5 px-3 text-right font-mono tabular-nums font-black">{totalAccounts.toLocaleString()}</td>
 <td className="py-3.5 px-3 text-right font-mono tabular-nums font-black">{totalDepositAmountSummary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
 <td className="py-3.5 px-3 text-right font-mono tabular-nums font-black">{totalProfitCount.toLocaleString()}</td>
 <td className="py-3.5 px-3 text-right font-mono tabular-nums">
 <SignColoredValue value={totalProfitAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} className="font-mono font-black" />
 </td>
 <td className="py-3.5 px-3 text-right font-mono tabular-nums font-black">{totalLossCount.toLocaleString()}</td>
 <td className="py-3.5 px-3 text-right font-mono tabular-nums">
 <SignColoredValue value={totalLossAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} className="font-mono font-black" />
 </td>
 <td className="py-3.5 px-3 text-right font-mono tabular-nums border-r border-slate-200">
 <SignColoredValue value={totalMemberWinLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} className="font-mono font-black" />
 </td>
 <td className="py-3.5 px-3 text-right font-mono tabular-nums font-black">{totalBonusAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
 <td className="py-3.5 px-3 text-right font-mono tabular-nums font-black border-r border-slate-200">{totalRebateAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
 <td className="py-3.5 px-3 text-right font-mono tabular-nums font-black">{(totalBanned + totalAdjust + totalBoth).toLocaleString()}</td>
 <td className="py-3.5 px-3 text-right font-mono tabular-nums">
 <span className="font-mono font-black text-blue-600">{totalAdjustAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
 </td>
 <td className="py-3.5 px-4 border-l border-slate-200">
 <div className="flex items-center justify-end gap-3">
 <span className="w-14 text-right font-mono tabular-nums font-black text-sm text-blue-600">
 {overallRate.toFixed(2)}%
 </span>
 <div className="flex-1 bg-slate-200 rounded-full h-1.5 overflow-hidden max-w-[120px] hidden sm:block border border-slate-300/20">
 <div 
 className="h-full rounded-full bg-blue-600"
 style={{ width: `${Math.min((overallRate / (overallRate * 2)) * 100, 100)}%` }}
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
export default SiteNewUserRiskControlStats;
