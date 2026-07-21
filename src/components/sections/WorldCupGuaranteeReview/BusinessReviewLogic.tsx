import React from "react";
import { highlightNumbers } from "./utils";
import { Target, Server, ShieldCheck } from "lucide-react";

export const BusinessReviewLogic: React.FC = () => {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200/60 bg-white p-5">
      <div className="flex flex-col gap-6">
        {/* Main Goal */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white mb-3">
            <Target className="h-5 w-5" />
          </div>
          <div className="text-sm font-black text-slate-800 uppercase tracking-widest mb-1">
            核心目标
          </div>
          <div className="text-xl font-black text-slate-950">
            {highlightNumbers(
              "保障[[正常用户]]购买[[合理赔率]]以及[[平台合理盈利率]]",
            )}
          </div>
        </div>

        {/* Connector Line */}
        <div className="relative h-px bg-slate-100 flex justify-center">
          <div className="absolute -top-3 h-6 w-px bg-slate-200" />
        </div>

        {/* Nodes Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-950">
                <Server className="h-4 w-4" />
              </div>
              <div>
                <div className="text-base font-black text-slate-950 mb-1">
                  B端
                </div>
                <p className="text-base text-slate-800 font-bold leading-relaxed">
                  {highlightNumbers(
                    "目标是[[赔率的合理性]]，保障[[正常用户]]购买[[合理赔率]]以及[[平台合理盈利率]]",
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-950">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <div className="text-base font-black text-slate-950 mb-1">
                  C端
                </div>
                <p className="text-base text-slate-800 font-bold leading-relaxed">
                  {highlightNumbers(
                    "作为[[兜底]]，结合[[C端用户行为数据]]，进行[[兜底核查]]，进一步[[提升盈利率]]",
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
