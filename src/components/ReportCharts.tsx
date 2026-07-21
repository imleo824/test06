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
  { name: "TY打水", amount: 13868.02, pct: "81.24%" },
  { name: "批量打水", amount: 1366.5, pct: "8.01%" },
  { name: "打负/租卖", amount: 875.02, pct: "5.13%" },
  { name: "出货", amount: 235.79, pct: "1.38%" },
  { name: "野鸡/协议", amount: 388.71, pct: "2.28%" },
  { name: "夹盘/卡球", amount: 10.05, pct: "0.06%" },
  { name: "其他", amount: 325.98, pct: "1.91%" },
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

export const InterceptTypeBarChart: React.FC = () => {
  return (
    <div className="h-full w-full">
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
                return [`${Number(value).toLocaleString()} 万`, "拦截金额"];
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
              formatter={(val: number) => val.toLocaleString()}
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
  );
};
