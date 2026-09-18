interface PageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
          {title}
        </h1>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
