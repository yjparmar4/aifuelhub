export function SectionHeader({
  title,
  description,
  right,
}: {
  title: string
  description?: string
  right?: React.ReactNode
}) {
  return (
    <div className="flex items-end justify-between gap-6 flex-wrap">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        {description ? <p className="text-muted-foreground mt-2">{description}</p> : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  )
}
