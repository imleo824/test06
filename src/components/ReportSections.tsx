import React from "react";

// Helper component for subsection titles (consulting-deck style)
export const SubsectionTitle: React.FC<{
  title: string;
  icon?: React.ReactNode;
  rightContent?: React.ReactNode;
}> = ({ title, icon, rightContent }) => {
  return (
    <div className="mb-5 mt-8 border-b border-slate-200/90 pb-3 flex items-baseline justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full shrink-0" />
          {icon && <span className="text-slate-950">{icon}</span>}
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-950">
            {title}
          </h3>
        </div>
      </div>
      {rightContent && (
        <div className="hidden md:flex gap-4 text-sm font-bold text-slate-800 whitespace-nowrap flex-nowrap items-baseline">
          {rightContent}
        </div>
      )}
    </div>
  );
};

// Helper card with clean styling
export const Card: React.FC<{
  children: React.ReactNode;
  title?: string;
  className?: string;
  padding?: "none" | "xs" | "sm" | "md" | "lg";
  tone?: "default" | "soft" | "dark" | "flat";
  id?: string;
  headerRight?: React.ReactNode;
}> = ({
  children,
  title,
  className = "",
  padding = "md",
  tone = "default",
  id,
  headerRight,
}) => {
  const pStyle = {
    none: "p-0",
    xs: "p-3 md:p-4",
    sm: "p-4 md:p-5",
    md: "p-5 md:p-6",
    lg: "p-6 md:p-8",
  }[padding];

  const tStyle = {
    default: "bg-white border border-slate-200/90 shadow-sm",
    soft: "bg-slate-50/70 border border-slate-200/90 shadow-none",
    dark: "bg-slate-900 border border-slate-800 text-white shadow-sm",
    flat: "bg-white border-0 shadow-none",
  }[tone];

  return (
    <div id={id} className={`rounded-2xl ${pStyle} ${tStyle} ${className}`}>
      {title && (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
          <h4
            className={`text-base font-black tracking-tight ${tone === "dark" ? "text-white" : "text-slate-950"}`}
          >
            {title}
          </h4>
          {headerRight && (
            <div className="flex items-center gap-4 text-sm font-bold text-slate-800">
              {headerRight}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
