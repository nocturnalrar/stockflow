import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
}

export function SummaryCard({ title, value, description }: SummaryCardProps) {
  return (
    <div className="border-t-2 border-[#25231f] py-4">
      <p className="text-3xl font-semibold tracking-tight text-[#25231f]">
        {value.toLocaleString("id-ID")}
      </p>

      <p className="mt-2 text-sm font-medium text-[#25231f]">{title}</p>

      <p className="mt-1 text-xs leading-5 text-[#777269]">{description}</p>
    </div>
  );
}
