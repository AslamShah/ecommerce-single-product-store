"use client";

interface SpecBarProps {
  label: string;
  value: string;
  percentage: number;
}

export function SpecBar({ label, value, percentage }: SpecBarProps) {
  return (
    <div className="technical-border p-4 lg:p-6 bg-[#1A1A1A]">
      <div className="flex justify-between items-center mb-2">
        <span className="font-technical-data text-white text-sm lg:text-base">
          {label}
        </span>
        <span className="font-label-caps text-[#FF5722] text-[10px] lg:text-xs">
          {value}
        </span>
      </div>
      <div className="w-full h-1 bg-[#2E2E2E]">
        <div className="h-full bg-[#FF5722]" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

interface ProgressBarProps {
  label: string;
  value: string;
}

export function ProgressBar({ label, value }: ProgressBarProps) {
  return (
    <div className="flex justify-between items-center mb-2">
      <span className="font-technical-data text-white text-sm">{label}</span>
      <span className="font-label-caps text-[#FF5722] text-[10px]">{value}</span>
    </div>
  );
}