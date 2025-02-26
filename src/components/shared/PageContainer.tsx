interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <main
      className={`container mx-auto px-4 py-8 md:px-6 md:py-12 ${className}`}
    >
      {children}
    </main>
  );
}
