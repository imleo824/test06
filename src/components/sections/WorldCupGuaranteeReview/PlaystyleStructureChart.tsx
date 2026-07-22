import React from "react";
import { highlightNumbers, SummaryBox } from "./utils";
import { killRateBreakdownCards } from "./data";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";

export const PlaystyleStructureChart = () => {
  const data = [
    {
      name: "全场让球",
      users: 6633501,
      usersPct: 8.49,
      volume: 622331,
      volumePct: 25.86,
      color: "bg-slate-900",
      dot: "bg-slate-900",
    },
    {
      name: "全场大小",
      users: 7798092,
      usersPct: 9.98,
      volume: 567145,
      volumePct: 23.56,
      color: "bg-slate-700",
      dot: "bg-slate-700",
    },
    {
      name: "全场波胆",
      users: 34948480,
      usersPct: 44.73,
      volume: 242396,
      volumePct: 10.07,
      color: "bg-slate-500",
      dot: "bg-slate-500",
    },
    {
      name: "全场独赢",
      users: 3608421,
      usersPct: 4.62,
      volume: 135867,
      volumePct: 5.65,
      color: "bg-slate-400",
      dot: "bg-slate-400",
    },
    {
      name: "上半场大小",
      users: 2589174,
      usersPct: 3.31,
      volume: 127749,
      volumePct: 5.31,
      color: "bg-slate-300",
      dot: "bg-slate-300",
    },
    {
      name: "其他",
      users: 22557673,
      usersPct: 28.87,
      volume: 711166,
      volumePct: 29.55,
      color: "bg-slate-200",
      dot: "bg-slate-200",
    },
  ];

  const filteredData = data.filter((item) => item.name !== "其他");

  const sortedVolumeData = [...filteredData].sort(
    (a, b) => b.volumePct - a.volumePct,
  );

  const sortedUsersData = [...filteredData].sort(
    (a, b) => b.usersPct - a.usersPct,
  );

  return (
    <div>
      {/* Integrated Insights & Chart Block */}
      <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-none">
        <div className="space-y-8">
          <div>
            {/* Horizontal Bar Charts - Left and Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column: 1. 投注流水结构 */}
              <div className="space-y-4">
                <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
                  <span className="text-lg font-black text-slate-950 uppercase tracking-tight">
                    1. 按流水结构
                  </span>
                </div>
                <div className="h-[300px] w-full bg-slate-50/50 rounded-xl p-3 border border-slate-200/40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={sortedVolumeData}
                      margin={{ top: 10, right: 100, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                        stroke="#e2e8f0"
                      />
                      <XAxis type="number" hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tickLine={false}
                        axisLine={false}
                        width={85}
                        tick={{
                          fill: "#2563eb",
                          fontSize: 12,
                          fontWeight: "900",
                        }}
                      />
                      <Bar
                        dataKey="volumePct"
                        fill="#1e293b"
                        radius={[0, 4, 4, 0]}
                        barSize={16}
                        isAnimationActive={false}
                      >
                        {sortedVolumeData.map((entry, index) => (
                          <Cell key={`cell-vol-${index}`} fill="#1e293b" />
                        ))}
                        <LabelList
                          dataKey="volumePct"
                          position="right"
                          content={(props: any) => {
                            const { x, y, width, value, index } = props;
                            if (value === undefined) return null;
                            const item = sortedVolumeData[index];
                            if (!item) return null;
                            return (
                              <text
                                x={x + width + 8}
                                y={y + 12}
                                fill="#2563eb"
                                fontSize={11}
                                fontWeight="bold"
                              >
                                {`${Number(value).toFixed(2)}% (${item.volume.toLocaleString()})`}
                              </text>
                            );
                          }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right Column: 2. 投注人数结构 */}
              <div className="space-y-4">
                <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
                  <span className="text-lg font-black text-slate-950 uppercase tracking-tight">
                    2. 按人数结构
                  </span>
                </div>
                <div className="h-[300px] w-full bg-slate-50/50 rounded-xl p-3 border border-slate-200/40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={sortedUsersData}
                      margin={{ top: 10, right: 125, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                        stroke="#e2e8f0"
                      />
                      <XAxis type="number" hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tickLine={false}
                        axisLine={false}
                        width={85}
                        tick={{
                          fill: "#2563eb",
                          fontSize: 12,
                          fontWeight: "900",
                        }}
                      />
                      <Bar
                        dataKey="usersPct"
                        fill="#475569"
                        radius={[0, 4, 4, 0]}
                        barSize={16}
                        isAnimationActive={false}
                      >
                        {sortedUsersData.map((entry, index) => (
                          <Cell key={`cell-user-${index}`} fill="#475569" />
                        ))}
                        <LabelList
                          dataKey="usersPct"
                          position="right"
                          content={(props: any) => {
                            const { x, y, width, value, index } = props;
                            if (value === undefined) return null;
                            const item = sortedUsersData[index];
                            if (!item) return null;
                            return (
                              <text
                                x={x + width + 8}
                                y={y + 12}
                                fill="#2563eb"
                                fontSize={11}
                                fontWeight="bold"
                              >
                                {`${Number(value).toFixed(2)}% (${Math.round(item.users / 104).toLocaleString()} 人/场均)`}
                              </text>
                            );
                          }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Below are sections 3 and 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {killRateBreakdownCards.map((item, index) => {
                const isSizeBall = index === 0;
                const title = isSizeBall ? "3. 按大小球结构" : "4. 按让球结构";
                const subTitle = "";
                const rows = item.rows as any[];
                const totalVolume = rows.reduce(
                  (sum: number, row) =>
                    sum + Number(String(row.volume).replace(/,/g, "")),
                  0,
                );

                const renderBarRow = (row: any, level = 0) => {
                  const volumeVal = Number(
                    String(row.volume).replace(/,/g, ""),
                  );
                  const volumeShare =
                    totalVolume > 0 ? (volumeVal / totalVolume) * 100 : 0;

                  return (
                    <div
                      key={`${item.dimension}-${row.label}-${level}`}
                      className="space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={
                            level === 0
                              ? "text-blue-600 font-black text-sm"
                              : "text-slate-900 font-black text-sm pl-4"
                          }
                        >
                          {level === 0 ? "" : "↳ "}
                          {row.label}
                        </span>
                        <span
                          className={
                            level === 0
                              ? "text-blue-600 font-black text-sm font-mono"
                              : "text-slate-900 font-black text-sm font-mono"
                          }
                        >
                          {`${Number(volumeShare).toFixed(2)}% (${volumeVal.toLocaleString()})`}
                        </span>
                      </div>
                      <div
                        className={`${level === 0 ? "h-4" : "h-3 pl-4"} w-full`}
                      >
                        <div className="h-full bg-slate-200/40 rounded-sm overflow-hidden">
                          <div
                            className={`h-full rounded-sm ${level === 0 ? "bg-slate-800" : "bg-slate-700"}`}
                            style={{ width: `${volumeShare}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                };

                return (
                  <div
                    key={item.dimension}
                    className="space-y-4 flex flex-col justify-between h-full"
                  >
                    <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
                      <span className="text-lg font-black text-slate-950 uppercase tracking-tight">
                        {title}
                      </span>
                      <span className="text-sm text-slate-900 font-black">
                        {subTitle}
                      </span>
                    </div>

                    {item.desc && (
                      <SummaryBox className="mb-2 p-4">
                        <p className="text-base text-slate-950 font-bold leading-relaxed">
                          {typeof item.desc === "string"
                            ? highlightNumbers(item.desc)
                            : item.desc}
                        </p>
                      </SummaryBox>
                    )}

                    <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-200/40 space-y-4 flex-1 flex flex-col justify-center">
                      <div className="flex items-baseline justify-between border-b border-slate-100 pb-2 mb-2">
                        <span className="text-base font-black text-slate-950 uppercase tracking-tight">
                          {item.dimension}比例分析
                        </span>
                        <span className="text-sm text-slate-900 font-bold">
                          流水占比
                        </span>
                      </div>
                      <div className="space-y-4">
                        {item.rows.map((row) => (
                          <React.Fragment key={row.label}>
                            {renderBarRow(row)}
                            {row.children?.map((child) =>
                              renderBarRow(child, 1),
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaystyleStructureChart;
