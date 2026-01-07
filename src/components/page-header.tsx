import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  right,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: { name: string; href: string }[]
  right?: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("pt-20 pb-8 px-4", className)}>
      <div className="container mx-auto max-w-7xl">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="mb-4 text-sm text-muted-foreground flex flex-wrap gap-2 items-center">
            {breadcrumbs.map((b, idx) => (
              <span key={b.href} className="flex items-center gap-2">
                {idx > 0 ? <span className="text-muted-foreground/60">/</span> : null}
                <Link href={b.href} className="hover:text-foreground">
                  {b.name}
                </Link>
              </span>
            ))}
          </nav>
        ) : null}

        <div className="glass rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-60">
            <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-primary/20 blur-[120px] rounded-full" />
            <div className="absolute -bottom-40 -right-40 w-[620px] h-[620px] bg-secondary/10 blur-[130px] rounded-full" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-3xl">
              {eyebrow ? (
                <Badge variant="secondary" className="bg-white/5 border border-white/10 mb-3">
                  {eyebrow}
                </Badge>
              ) : null}
              <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{title}</h1>
              {description ? (
                <p className="text-muted-foreground text-base leading-relaxed">{description}</p>
              ) : null}
            </div>
            {right ? <div className="shrink-0 w-full md:w-auto">{right}</div> : null}
          </div>
        </div>
      </div>
    </section>
  )
}
