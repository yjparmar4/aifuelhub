export function ContentSection({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`px-4 ${className}`}>
      <div className="container mx-auto max-w-7xl">{children}</div>
    </section>
  )
}
