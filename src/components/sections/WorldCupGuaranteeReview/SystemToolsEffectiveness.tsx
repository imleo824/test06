import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity } from "lucide-react";
import { highlightNumbers, SummaryBox } from "./utils";

export const SystemToolsEffectiveness = () => {
  const data = [
    { name: "体育打水", accuracy: 68 },
    { name: "优势赔率", accuracy: 58 },
    { name: "体育对压(跨AB系)", accuracy: 90 },
    { name: "卡进球点", accuracy: 75 },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-none h-full flex flex-col">
      <div className="border-b border-slate-100 pb-3 mb-4 flex-none">
        <h5 className="text-base md:text-lg font-black text-slate-950 flex items-center gap-2 mb-3">
          <Activity className="h-4.5 w-4.5 text-slate-800" strokeWidth={2} />
          <span>系统阶段成效</span>
        </h5>
        <SummaryBox className="mt-2 mb-0 p-3.5">
          {highlightNumbers(
            "系统工具对[[重点风险特征]]的识别效果显著，其中[[体育对压(跨AB系)]]识别准确率达 [[90%]]，[[卡进球点]]达 [[75%]]，[[体育打水]]达 [[68%]]，[[优势赔率]]达 [[58%]]。",
          )}
        </SummaryBox>
        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
          <div className="space-y-1">
            <div className="text-sm font-black text-slate-800 uppercase tracking-wider">
              传统人工审核
            </div>
            <div className="text-lg font-black text-slate-950">
              1-2%{" "}
              <span className="text-sm font-bold text-slate-800">命中率</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-black text-slate-950 uppercase tracking-wider">
              系统工具驱动
            </div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-lg font-black text-slate-950">60%+</span>
              <span className="text-sm font-bold text-slate-800">命中率</span>
              <span className="text-sm font-black text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-sm ml-0.5 border border-emerald-200/40">
                提升 30倍+
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[360px] mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 24, right: 30, left: 10, bottom: 40 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#cbd5e1"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#1e293b", fontSize: 13, fontWeight: 700 }}
              interval={0}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#1e293b",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "monospace",
              }}
              domain={[0, 100]}
              tickFormatter={(val) => `${val}%`}
            />
            {/* Tooltip removed to disable interaction */}
            <Bar
              dataKey="accuracy"
              radius={[4, 4, 0, 0]}
              barSize={40}
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={["#0f172a", "#1e293b", "#334155", "#475569"][index % 4]}
                />
              ))}
              <LabelList
                dataKey="accuracy"
                position="top"
                formatter={(val: number) => `${val}%`}
                style={{
                  fill: "#0f172a",
                  fontSize: 13,
                  fontWeight: 900,
                  fontFamily: "monospace",
                }}
                offset={10}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default SystemToolsEffectiveness;
