import React from "react";
import { FA } from "../types";

export const ReportCover: React.FC = () => {
  const sections = [
    {
      id: "1.",
      title: "数据概览",
      paths: [],
    },
    {
      id: "2.",
      title: "投注表现",
      paths: [],
    },
    {
      id: "3.",
      title: "操盘表现",
      paths: [],
    },
    {
      id: "4.",
      title: "业务复盘",
      paths: [
        {
          title: "4.1 赛事保障",
          items: [
            { title: "4.1.1 B端操盘监控" },
            { title: "4.1.2 C端体育拦截" },
          ],
        },
        {
          title: "4.2 关联保障",
          items: [{ title: "4.2.1 新人风控" }, { title: "4.2.2 活动风控" }],
        },
      ],
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-8 md:p-16 space-y-12 w-full mx-auto min-h-fit flex flex-col shadow-none">
      {/* 封面标题区 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
          {FA.reportTitle}
        </h1>
        <div className="flex gap-10 text-sm text-slate-500 mb-2">
          <div className="flex items-center gap-2">
            <span>数据周期:</span>
            <span className="font-semibold text-slate-800">{FA.navTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>报告日期:</span>
            <span className="font-semibold text-slate-800">
              {FA.reportDate}
            </span>
          </div>
        </div>
      </div>

      {/* 极简目录罗列 - 从上到下 */}
      <div className="space-y-8 max-w-4xl">
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="space-y-4">
              {/* 大章节 */}
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-slate-900">
                  {section.id}
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {section.title}
                </span>
              </div>

              {/* 子目录从上到下罗列 */}
              <div className="pl-6 space-y-4">
                {section.paths.map((path) => (
                  <div key={path.title} className="space-y-2">
                    <div className="text-sm font-medium text-slate-700">
                      {path.title}
                    </div>
                    <div className="pl-6 flex flex-col space-y-1.5 border-l border-slate-100">
                      {path.items.map((item) => (
                        <div
                          key={item.title}
                          className="text-xs text-slate-500"
                        >
                          {item.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
