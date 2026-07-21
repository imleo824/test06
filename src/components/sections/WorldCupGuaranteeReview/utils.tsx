import React from "react";

// 辅助函数：统一高亮数字样式（纯静态，不带任何动效）
export function highlightNumbers(
  text: string,
  colorClass: string = "text-blue-600 font-black",
) {
  const pattern =
    /(\[\[(.*?)\]\])|([+\-]?\d+(?:[.,]\d+)*(?:\s*(?:%|人|场|项|倍|E|元|h|ms|min|k|个))?)/g;
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      result.push(text.substring(lastIndex, match.index));
    }

    if (match[1]) {
      // It's a [[core phrase]]
      let phrase = match[2];

      // Manual color forcing
      if (phrase.startsWith("green:")) {
        result.push(
          <span
            key={match.index}
            className="text-emerald-600 font-black mx-0.5"
          >
            {phrase.substring(6)}
          </span>,
        );
        lastIndex = pattern.lastIndex;
        continue;
      }
      if (phrase.startsWith("red:")) {
        result.push(
          <span key={match.index} className="text-rose-600 font-black mx-0.5">
            {phrase.substring(4)}
          </span>,
        );
        lastIndex = pattern.lastIndex;
        continue;
      }

      // 提取纯数字部分进行判断
      const numericValue = phrase.replace(/[^\d.-]/g, "");
      const isNumber =
        /^[+\-]?\d+(?:[.,]\d+)*(?:%|人|项|倍|E|元|h|ms|min|k)?$/.test(phrase);

      if (
        isNumber &&
        (phrase.startsWith("-") || parseFloat(numericValue) < 0)
      ) {
        result.push(
          <span key={match.index} className="text-rose-600 font-black mx-0.5">
            {phrase}
          </span>,
        );
      } else if (
        isNumber &&
        (phrase.startsWith("+") || parseFloat(numericValue) > 0)
      ) {
        // 只有显式包含 + 或者明确是金额/比率正数时才变绿（避免普通日期或人次变绿）
        const shouldBeGreen =
          phrase.startsWith("+") ||
          (phrase.includes(".") && !phrase.includes("人"));

        if (shouldBeGreen) {
          result.push(
            <span
              key={match.index}
              className="text-emerald-600 font-black mx-0.5"
            >
              {phrase.startsWith("+") ? phrase.substring(1) : phrase}
            </span>,
          );
        } else {
          result.push(
            <span
              key={match.index}
              className="relative inline-block mx-0.5 group"
            >
              <span className="text-slate-950 font-black relative z-10">
                {phrase}
              </span>
              <span className="absolute bottom-0.5 left-0 w-full h-[1.5px] bg-blue-500/35 z-0"></span>
            </span>,
          );
        }
      } else {
        result.push(
          <span
            key={match.index}
            className="relative inline-block mx-0.5 group"
          >
            <span className="text-slate-950 font-black relative z-10">
              {phrase}
            </span>
            <span className="absolute bottom-0.5 left-0 w-full h-[1.5px] bg-blue-500/35 z-0"></span>
          </span>,
        );
      }
    } else if (match[3]) {
      // It's a number/unit
      const part = match[3];
      if (part.startsWith("+")) {
        result.push(
          <strong
            key={match.index}
            className="font-mono tracking-tight mx-0.5 text-emerald-600 font-black"
          >
            {part.substring(1)}
          </strong>,
        );
      } else if (part.startsWith("-")) {
        result.push(
          <strong
            key={match.index}
            className="font-mono tracking-tight mx-0.5 text-rose-600 font-black"
          >
            {part}
          </strong>,
        );
      } else if (/([人场项倍个]|ms|min|h)$/.test(part.trim())) {
        // 数量或特定单位，保持默认黑色高亮
        result.push(
          <strong
            key={match.index}
            className="text-slate-950 font-black font-mono tracking-tight mx-0.5"
          >
            {part}
          </strong>,
        );
      } else if (
        part.includes("%") ||
        part.includes(".") ||
        part.includes(",")
      ) {
        // 比例/盈利率，或带小数点的金额/千分位金额，默认为正向绿色高亮
        result.push(
          <strong
            key={match.index}
            className="font-mono tracking-tight mx-0.5 text-emerald-600 font-black"
          >
            {part}
          </strong>,
        );
      } else {
        result.push(
          <strong
            key={match.index}
            className="text-slate-950 font-black font-mono tracking-tight mx-0.5"
          >
            {part}
          </strong>,
        );
      }
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex));
  }

  return result;
}

export const SummaryBox = ({
  children,
  title,
  icon,
  className = "",
  tone = "default",
}: {
  children: React.ReactNode;
  title?: string;
  icon?: string;
  className?: string;
  tone?: "default" | "indigo" | "emerald" | "rose";
}) => {
  const tones = {
    default: {
      bg: "bg-slate-50/60",
      border: "border-slate-200/50",
      title: "text-slate-900",
    },
    indigo: {
      bg: "bg-indigo-50/30",
      border: "border-indigo-200/40",
      title: "text-indigo-950",
    },
    emerald: {
      bg: "bg-emerald-50/30",
      border: "border-emerald-200/40",
      title: "text-emerald-950",
    },
    rose: {
      bg: "bg-rose-50/30",
      border: "border-rose-200/40",
      title: "text-rose-950",
    },
  };

  const style = tones[tone] || tones.default;

  // Use a default margin-bottom of mb-6 unless overridden
  const hasMargin = className.match(/\b(m|m[tby])-\d+/);
  const marginClass = hasMargin ? "" : "mb-6";

  return (
    <div
      className={`rounded-xl ${style.bg} p-4 md:p-5 border ${style.border} ${marginClass} relative ${className}`}
    >
      {title && (
        <div
          className={`flex items-center gap-2 mb-2 ${style.title} font-black text-sm uppercase tracking-widest`}
        >
          {icon && <span>{icon}</span>}
          <span>{title}</span>
        </div>
      )}
      <div className="text-base text-slate-900 font-medium leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export const SignColoredValue = ({
  value,
  className = "font-mono font-black",
}: {
  value: string | number;
  className?: string;
}) => {
  const str = String(value);
  const numValue = parseFloat(str.replace(/[^\d.-]/g, ""));

  const isPositive = str.startsWith("+") || numValue > 0;
  const isNegative = str.startsWith("-") || numValue < 0;

  let colorClass = "text-slate-950";
  if (isPositive) colorClass = "text-emerald-700 font-bold";
  if (isNegative) colorClass = "text-rose-700 font-bold";

  // 去掉正数前面的 + 号展示
  const displayValue =
    isPositive && str.startsWith("+") ? str.substring(1) : str;

  return <span className={`${colorClass} ${className}`}>{displayValue}</span>;
};

export const UnitNumber = ({
  value,
  unit,
  className = "text-3xl",
  unitClassName = "text-lg",
}: {
  value: string;
  unit?: string;
  className?: string;
  unitClassName?: string;
}) => {
  const showUnit = unit && !["E", "万", "亿", "万元", "亿元"].includes(unit);
  return (
    <div className="flex items-baseline gap-1.5">
      <SignColoredValue value={value} className={`${className}`} />
      {showUnit && (
        <span className={`font-semibold text-slate-800 ${unitClassName}`}>
          {unit}
        </span>
      )}
    </div>
  );
};

export const MetricTile = ({
  label,
  value,
  unit,
  detail,
  valueClassName = "text-3xl sm:text-4xl font-mono font-black",
  tone = "default",
}: {
  label: string;
  value: string;
  unit?: string;
  detail?: string;
  valueClassName?: string;
  tone?: "default" | "accent";
}) => {
  const showUnit = unit && !["E", "万", "亿", "万元", "亿元"].includes(unit);
  return (
    <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-none">
      <div className="mb-3 text-sm font-black uppercase tracking-wider text-slate-800">
        {label}
        {showUnit ? ` (${unit})` : ""}
      </div>
      <UnitNumber
        value={value}
        className={`${valueClassName} tracking-tighter`}
        unit={unit}
        unitClassName="text-slate-800 text-lg"
      />
      {detail && (
        <div className="mt-4 text-base font-medium leading-relaxed text-slate-800 border-t border-slate-100 pt-3">
          {detail}
        </div>
      )}
    </div>
  );
};

export const CoreActionHeader = ({
  index,
  title,
  desc,
}: {
  index: string;
  title: string;
  desc?: string;
}) => (
  <div className="flex flex-col gap-2 break-inside-avoid">
    <div className="flex flex-wrap items-center gap-3">
      <span className="rounded-md bg-blue-600/10 px-2 py-0.5 text-sm font-mono font-bold tracking-wide text-blue-800">
        {index}
      </span>
      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h3>
    </div>
    {desc && (
      <p className="max-w-4xl text-base font-medium leading-relaxed text-slate-900">
        {highlightNumbers(desc)}
      </p>
    )}
  </div>
);
