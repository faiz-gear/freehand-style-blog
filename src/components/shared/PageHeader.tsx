interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className="pencil-line-animation mb-3">{title}</h1>
      {description && (
        <p className="text-ink-secondary opacity-hand-medium rotate-hand-slight-right max-w-2xl">
          {description}
        </p>
      )}
      <div className="divider-hand mt-4"></div>
    </div>
  );
}
