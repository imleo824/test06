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
            className="text-emerald-700 font-black font-mono mx-0.5"
          >
            {phrase.substring(6)}
          </span>,
        );
        lastIndex = pattern.lastIndex;
        continue;
      }
      if (phrase.startsWith("red:")) {
        result.push(
          <span key={match.index} className="text-rose-700 font-black font-mono mx-0.5">
            {phrase.substring(4)}
          </span>,
        );
        lastIndex = pattern.lastIndex;
        continue;
      }
      if (phrase.startsWith("blue:")) {
        result.push(
          <span key={match.index} className="text-blue-700 font-black font-mono mx-0.5">
            {phrase.substring(5)}
          </span>,
        );
        lastIndex = pattern.lastIndex;
        continue;
      }
      if (phrase.startsWith("amber:")) {
        result.push(
          <span key={match.index} className="text-amber-700 font-black font-mono mx-0.5">
            {phrase.substring(6)}
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
          <span key={match.index} className="text-rose-700 font-black font-mono mx-0.5">
            {phrase}
          </span>,
        );
      } else if (
        isNumber &&
        phrase.startsWith("+")
      ) {
        result.push(
          <span
            key={match.index}
            className="text-emerald-700 font-black font-mono mx-0.5"
          >
            {phrase.substring(1)}
          </span>,
        );
      } else if (isNumber) {
        result.push(
          <span
            key={match.index}
            className={`${colorClass} font-mono mx-0.5`}
          >
            {phrase}
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
            <span className="absolute bottom-0.5 left-0 w-full h-[2px] bg-blue-500/25 z-0"></span>
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
            className="font-mono tracking-tight mx-0.5 text-emerald-700 font-black"
          >
            {part.substring(1)}
          </strong>,
        );
      } else if (part.startsWith("-")) {
        result.push(
          <strong
            key={match.index}
            className="font-mono tracking-tight mx-0.5 text-rose-700 font-black"
          >
            {part}
          </strong>,
        );
      } else {
        result.push(
          <strong
            key={match.index}
            className={`${colorClass} font-mono tracking-tight mx-0.5`}
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
  hideIcon = false,
}: {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  tone?: "default" | "indigo" | "emerald" | "rose";
  hideIcon?: boolean;
}) => {
  const tones = {
    default: {
      bg: "bg-blue-50/30",
      border: "border-blue-200/80",
      title: "text-slate-950",
      iconBg: "bg-blue-100/80",
      iconBorder: "border-blue-200",
      iconColor: "text-blue-700",
    },
    indigo: {
      bg: "bg-indigo-50/40",
      border: "border-indigo-200/80",
      title: "text-indigo-950",
      iconBg: "bg-indigo-100/80",
      iconBorder: "border-indigo-200",
      iconColor: "text-indigo-700",
    },
    emerald: {
      bg: "bg-emerald-50/40",
      border: "border-emerald-200/80",
      title: "text-emerald-950",
      iconBg: "bg-emerald-100/80",
      iconBorder: "border-emerald-200",
      iconColor: "text-emerald-700",
    },
    rose: {
      bg: "bg-rose-50/40",
      border: "border-rose-200/80",
      title: "text-rose-950",
      iconBg: "bg-rose-100/80",
      iconBorder: "border-rose-200",
      iconColor: "text-rose-700",
    },
  };

  const style = tones[tone] || tones.default;

  const hasMargin = className.match(/\b(m|m[tby])-\d+/);
  const marginClass = hasMargin ? "" : "mb-5";

  const defaultIcon = (
    <div className={`shrink-0 w-7 h-7 rounded-lg ${style.iconBg} border ${style.iconBorder} flex items-center justify-center ${style.iconColor} shadow-2xs mt-0.5`}>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  );

  return (
    <div
      className={`rounded-xl ${style.bg} p-4 md:p-5 border ${style.border} ${marginClass} relative ${className}`}
    >
      {title && (
        <div
          className={`flex items-center gap-2 mb-2 ${style.title} font-black text-xs uppercase tracking-widest`}
        >
          {icon && <span>{icon}</span>}
          <span>{title}</span>
        </div>
      )}
      <div className="flex items-start gap-3">
        {!hideIcon && (
          <div className="shrink-0">
            {icon || defaultIcon}
          </div>
        )}
        <div className="text-base text-slate-950 font-bold leading-relaxed flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export const SignColoredValue = ({
  value,
  className = "font-mono font-black tabular-nums",
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

  return <span className={`font-mono tabular-nums ${colorClass} ${className}`}>{displayValue}</span>;
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
    <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
      <SignColoredValue value={value} className={`${className}`} />
      {showUnit && (
        <span className={`font-sans font-semibold text-slate-800 ${unitClassName}`}>
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
  valueClassName = "text-3xl sm:text-4xl font-mono font-black tabular-nums",
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
    <div className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm">
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
