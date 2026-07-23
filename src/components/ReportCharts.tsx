import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

const interceptData = [
  { name: "TY打水", amount: 5136.22, pct: "69.15%" },
  { name: "出货", amount: 1359.90, pct: "18.31%" },
  { name: "批量打水", amount: 637.60, pct: "8.58%" },
  { name: "其他", amount: 264.93, pct: "3.57%" },
  { name: "打负/租卖", amount: 28.62, pct: "0.39%" },
  { name: "夹盘/卡球", amount: 0.50, pct: "0.01%" },
  { name: "野鸡/协议", amount: 0.00, pct: "0.00%" },
];

const colors = [
  "#0f172a",
  "#1e293b",
  "#334155",
  "#475569",
  "#64748b",
  "#94a3b8",
  "#cbd5e1",
];

const sportsInterceptionTableData = [
  {
    site: "1",
    ty: { amount: "362.34", pct: "7.05%" },
    piliang: { amount: "33.57", pct: "5.26%" },
    dafu: { amount: "2.66", pct: "9.29%" },
    chuhuo: { amount: "0.00", pct: "0.00%" },
    yeji: { amount: "0.00", pct: "0.00%" },
    jiapan: { amount: "0.50", pct: "100.00%" },
    qita: { amount: "7.14", pct: "2.70%" },
  },
  {
    site: "2",
    ty: { amount: "256.33", pct: "4.99%" },
    piliang: { amount: "148.19", pct: "23.24%" },
    dafu: { amount: "3.41", pct: "11.91%" },
    chuhuo: { amount: "0.00", pct: "0.00%" },
    yeji: { amount: "0.00", pct: "0.00%" },
    jiapan: { amount: "0.00", pct: "0.00%" },
    qita: { amount: "33.73", pct: "12.73%" },
  },
  {
    site: "3",
    ty: { amount: "354.88", pct: "6.91%" },
    piliang: { amount: "32.70", pct: "5.13%" },
    dafu: { amount: "0.00", pct: "0.00%" },
    chuhuo: { amount: "0.00", pct: "0.00%" },
    yeji: { amount: "0.00", pct: "0.00%" },
    jiapan: { amount: "0.00", pct: "0.00%" },
    qita: { amount: "8.94", pct: "3.37%" },
  },
  {
    site: "4",
    ty: { amount: "1837.13", pct: "35.77%" },
    piliang: { amount: "97.84", pct: "15.35%" },
    dafu: { amount: "12.56", pct: "43.89%" },
    chuhuo: { amount: "0.00", pct: "0%" },
    yeji: { amount: "0.00", pct: "0.00%" },
    jiapan: { amount: "0.00", pct: "0.00%" },
    qita: { amount: "134.03", pct: "50.59%" },
  },
  {
    site: "5",
    ty: { amount: "24.30", pct: "0.47%" },
    piliang: { amount: "8.34", pct: "1.31%" },
    dafu: { amount: "0.00", pct: "0.00%" },
    chuhuo: { amount: "0.00", pct: "0.00%" },
    yeji: { amount: "0.00", pct: "0.00%" },
    jiapan: { amount: "0.00", pct: "0.00%" },
    qita: { amount: "1.46", pct: "0.55%" },
  },
  {
    site: "7",
    ty: { amount: "310.58", pct: "6.05%" },
    piliang: { amount: "33.56", pct: "5.26%" },
    dafu: { amount: "3.37", pct: "11.79%" },
    chuhuo: { amount: "0.00", pct: "0.00%" },
    yeji: { amount: "0.00", pct: "0.00%" },
    jiapan: { amount: "0.00", pct: "0.00%" },
    qita: { amount: "12.69", pct: "4.79%" },
  },
  {
    site: "8",
    ty: { amount: "490.14", pct: "9.54%" },
    piliang: { amount: "43.26", pct: "6.79%" },
    dafu: { amount: "0.27", pct: "0.94%" },
    chuhuo: { amount: "1359.90", pct: "100.00%" },
    yeji: { amount: "0.00", pct: "0.00%" },
    jiapan: { amount: "0.00", pct: "0.00%" },
    qita: { amount: "5.10", pct: "1.92%" },
  },
  {
    site: "Y6+Y9",
    ty: { amount: "486.42", pct: "9.47%" },
    piliang: { amount: "86.31", pct: "13.54%" },
    dafu: { amount: "2.48", pct: "8.66%" },
    chuhuo: { amount: "0.00", pct: "0.00%" },
    yeji: { amount: "0.00", pct: "0.00%" },
    jiapan: { amount: "0.00", pct: "0.00%" },
    qita: { amount: "26.75", pct: "10.10%" },
  },
  {
    site: "BD+XK",
    ty: { amount: "613.90", pct: "11.95%" },
    piliang: { amount: "86.98", pct: "13.64%" },
    dafu: { amount: "2.72", pct: "9.51%" },
    chuhuo: { amount: "0.00", pct: "0.00%" },
    yeji: { amount: "0.00", pct: "0.00%" },
    jiapan: { amount: "0.00", pct: "0.00%" },
    qita: { amount: "14.38", pct: "5.43%" },
  },
  {
    site: "综合",
    ty: { amount: "400.21", pct: "7.79%" },
    piliang: { amount: "66.83", pct: "10.48%" },
    dafu: { amount: "1.15", pct: "4.01%" },
    chuhuo: { amount: "0.00", pct: "0.00%" },
    yeji: { amount: "0.00", pct: "0.00%" },
    jiapan: { amount: "0.00", pct: "0.00%" },
    qita: { amount: "20.71", pct: "7.82%" },
  },
];

const sportsInterceptionSubtotal = {
  site: "小计|占比",
  ty: { amount: "5136.22", pct: "100%" },
  piliang: { amount: "637.60", pct: "100%" },
  dafu: { amount: "28.62", pct: "100%" },
  chuhuo: { amount: "1359.90", pct: "100%" },
  yeji: { amount: "0.00", pct: "0%" },
  jiapan: { amount: "0.50", pct: "100%" },
  qita: { amount: "264.93", pct: "100%" },
};

const sportsInterceptionTotalPct = {
  site: "总计|占比",
  ty: "69.15%",
  piliang: "8.58%",
  dafu: "0.39%",
  chuhuo: "18.31%",
  yeji: "0.00%",
  jiapan: "0.01%",
  qita: "3.57%",
};

export const InterceptTypeBarChart: React.FC = () => {
  const [viewMode, setViewMode] = React.useState<"chart" | "table">("chart");

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-end mb-2">
        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setViewMode("chart")}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              viewMode === "chart"
                ? "bg-white text-slate-900 shadow-xs font-black"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            图表概览
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              viewMode === "table"
                ? "bg-white text-slate-900 shadow-xs font-black"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            站点明细表
          </button>
        </div>
      </div>

      {viewMode === "chart" ? (
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={interceptData}
              margin={{ top: 24, right: 30, left: 10, bottom: 40 }}
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
                tick={{ fontSize: 13, fill: "#475569", fontWeight: 900 }}
                interval={0}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "#475569",
                  fontWeight: 700,
                  fontFamily: "monospace",
                }}
                tickFormatter={(val) => val.toLocaleString()}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  padding: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ fontWeight: 800, fontSize: "13px" }}
                labelStyle={{
                  fontWeight: 900,
                  marginBottom: "4px",
                  color: "#0f172a",
                }}
                cursor={{ fill: "transparent" }}
                formatter={(value: any, name: any) => {
                  if (name === "amount")
                    return [`${Number(value).toLocaleString()}`, "拦截金额"];
                  return [value, name];
                }}
              />
              <Bar
                dataKey="amount"
                radius={[4, 4, 0, 0]}
                barSize={48}
                isAnimationActive={false}
              >
                {interceptData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
                <LabelList
                  dataKey="amount"
                  position="top"
                  formatter={(val: number) => `${val.toLocaleString()}`}
                  style={{
                    fill: "#0f172a",
                    fontSize: 12,
                    fontWeight: 900,
                    fontFamily: "monospace",
                  }}
                  offset={10}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-none max-h-[320px]">
          <table className="w-full text-left text-xs font-bold border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-950 font-black text-xs uppercase tracking-wider">
                <th
                  rowSpan={3}
                  className="py-2 px-2 text-center border-r border-slate-300 text-slate-950 font-black whitespace-nowrap bg-slate-200/60"
                >
                  站点
                </th>
                <th
                  colSpan={6}
                  className="py-1.5 px-2 text-center border-r border-b border-slate-300 text-slate-950 font-black bg-blue-50/80"
                >
                  TY打水
                </th>
                <th
                  colSpan={4}
                  className="py-1.5 px-2 text-center border-r border-b border-slate-300 text-slate-950 font-black bg-amber-50/80"
                >
                  出货
                </th>
                <th
                  colSpan={2}
                  className="py-1.5 px-2 text-center border-r border-b border-slate-300 text-slate-950 font-black bg-emerald-50/80"
                >
                  快咨询
                </th>
                <th
                  colSpan={2}
                  className="py-1.5 px-2 text-center border-b border-slate-300 text-slate-950 font-black bg-slate-100"
                >
                  其他
                </th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-black text-xs">
                <th colSpan={2} className="py-1 px-1 text-center border-r border-slate-200">
                  TY打水
                </th>
                <th colSpan={2} className="py-1 px-1 text-center border-r border-slate-200">
                  批量打水
                </th>
                <th colSpan={2} className="py-1 px-1 text-center border-r border-slate-300">
                  打负、租卖号<br />其他打水
                </th>
                <th colSpan={2} className="py-1 px-1 text-center border-r border-slate-200">
                  出货
                </th>
                <th colSpan={2} className="py-1 px-1 text-center border-r border-slate-300">
                  野鸡、协议球<br />其他出货
                </th>
                <th colSpan={2} className="py-1 px-1 text-center border-r border-slate-300">
                  夹盘、卡进球
                </th>
                <th colSpan={2} className="py-1 px-1 text-center">
                  其他
                </th>
              </tr>
              <tr className="bg-slate-100/70 border-b border-slate-300 text-slate-800 font-bold text-[11px] text-center">
                <th className="py-1 px-1 border-r border-slate-200">金额</th>
                <th className="py-1 px-1 border-r border-slate-200">占比</th>
                <th className="py-1 px-1 border-r border-slate-200">金额</th>
                <th className="py-1 px-1 border-r border-slate-200">占比</th>
                <th className="py-1 px-1 border-r border-slate-200">金额</th>
                <th className="py-1 px-1 border-r border-slate-300">占比</th>
                <th className="py-1 px-1 border-r border-slate-200">金额</th>
                <th className="py-1 px-1 border-r border-slate-200">占比</th>
                <th className="py-1 px-1 border-r border-slate-200">金额</th>
                <th className="py-1 px-1 border-r border-slate-300">占比</th>
                <th className="py-1 px-1 border-r border-slate-200">金额</th>
                <th className="py-1 px-1 border-r border-slate-300">占比</th>
                <th className="py-1 px-1 border-r border-slate-200">金额</th>
                <th className="py-1 px-1">占比</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px] font-mono">
              {sportsInterceptionTableData.map((row, idx) => (
                <tr
                  key={row.site}
                  className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                >
                  <td className="py-1.5 px-2 text-center font-sans font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap bg-slate-50/80">
                    {row.site}
                  </td>
                  <td className="py-1 px-1 text-right border-r border-slate-100">{row.ty.amount}</td>
                  <td className="py-1 px-1 text-right border-r border-slate-200 text-slate-500">{row.ty.pct}</td>
                  <td className="py-1 px-1 text-right border-r border-slate-100">{row.piliang.amount}</td>
                  <td className="py-1 px-1 text-right border-r border-slate-200 text-slate-500">{row.piliang.pct}</td>
                  <td className="py-1 px-1 text-right border-r border-slate-100">{row.dafu.amount}</td>
                  <td className="py-1 px-1 text-right border-r border-slate-300 text-slate-500">{row.dafu.pct}</td>
                  <td className="py-1 px-1 text-right border-r border-slate-100">{row.chuhuo.amount}</td>
                  <td className="py-1 px-1 text-right border-r border-slate-200 text-slate-500">{row.chuhuo.pct}</td>
                  <td className="py-1 px-1 text-right border-r border-slate-100">{row.yeji.amount}</td>
                  <td className="py-1 px-1 text-right border-r border-slate-300 text-slate-500">{row.yeji.pct}</td>
                  <td className="py-1 px-1 text-right border-r border-slate-100">{row.jiapan.amount}</td>
                  <td className="py-1 px-1 text-right border-r border-slate-300 text-slate-500">{row.jiapan.pct}</td>
                  <td className="py-1 px-1 text-right border-r border-slate-100">{row.qita.amount}</td>
                  <td className="py-1 px-1 text-right text-slate-500">{row.qita.pct}</td>
                </tr>
              ))}
              {/* 小计|占比 */}
              <tr className="bg-slate-100 font-bold border-t-2 border-slate-300 text-slate-950">
                <td className="py-1.5 px-2 text-center font-sans font-black border-r border-slate-300 whitespace-nowrap bg-slate-200/80">
                  {sportsInterceptionSubtotal.site}
                </td>
                <td className="py-1 px-1 text-right border-r border-slate-200">{sportsInterceptionSubtotal.ty.amount}</td>
                <td className="py-1 px-1 text-right border-r border-slate-200 text-blue-700">{sportsInterceptionSubtotal.ty.pct}</td>
                <td className="py-1 px-1 text-right border-r border-slate-200">{sportsInterceptionSubtotal.piliang.amount}</td>
                <td className="py-1 px-1 text-right border-r border-slate-200 text-blue-700">{sportsInterceptionSubtotal.piliang.pct}</td>
                <td className="py-1 px-1 text-right border-r border-slate-200">{sportsInterceptionSubtotal.dafu.amount}</td>
                <td className="py-1 px-1 text-right border-r border-slate-300 text-blue-700">{sportsInterceptionSubtotal.dafu.pct}</td>
                <td className="py-1 px-1 text-right border-r border-slate-200">{sportsInterceptionSubtotal.chuhuo.amount}</td>
                <td className="py-1 px-1 text-right border-r border-slate-200 text-blue-700">{sportsInterceptionSubtotal.chuhuo.pct}</td>
                <td className="py-1 px-1 text-right border-r border-slate-200">{sportsInterceptionSubtotal.yeji.amount}</td>
                <td className="py-1 px-1 text-right border-r border-slate-300 text-blue-700">{sportsInterceptionSubtotal.yeji.pct}</td>
                <td className="py-1 px-1 text-right border-r border-slate-200">{sportsInterceptionSubtotal.jiapan.amount}</td>
                <td className="py-1 px-1 text-right border-r border-slate-300 text-blue-700">{sportsInterceptionSubtotal.jiapan.pct}</td>
                <td className="py-1 px-1 text-right border-r border-slate-200">{sportsInterceptionSubtotal.qita.amount}</td>
                <td className="py-1 px-1 text-right text-blue-700">{sportsInterceptionSubtotal.qita.pct}</td>
              </tr>
              {/* 总计|占比 */}
              <tr className="bg-slate-200/90 font-black border-t border-slate-300 text-slate-950">
                <td className="py-1.5 px-2 text-center font-sans font-black border-r border-slate-300 whitespace-nowrap bg-slate-300/80">
                  {sportsInterceptionTotalPct.site}
                </td>
                <td colSpan={2} className="py-1 px-2 text-center border-r border-slate-300 text-blue-900 font-black">
                  {sportsInterceptionTotalPct.ty}
                </td>
                <td colSpan={2} className="py-1 px-2 text-center border-r border-slate-300 text-blue-900 font-black">
                  {sportsInterceptionTotalPct.piliang}
                </td>
                <td colSpan={2} className="py-1 px-2 text-center border-r border-slate-300 text-blue-900 font-black">
                  {sportsInterceptionTotalPct.dafu}
                </td>
                <td colSpan={2} className="py-1 px-2 text-center border-r border-slate-300 text-blue-900 font-black">
                  {sportsInterceptionTotalPct.chuhuo}
                </td>
                <td colSpan={2} className="py-1 px-2 text-center border-r border-slate-300 text-blue-900 font-black">
                  {sportsInterceptionTotalPct.yeji}
                </td>
                <td colSpan={2} className="py-1 px-2 text-center border-r border-slate-300 text-blue-900 font-black">
                  {sportsInterceptionTotalPct.jiapan}
                </td>
                <td colSpan={2} className="py-1 px-2 text-center text-blue-900 font-black">
                  {sportsInterceptionTotalPct.qita}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
