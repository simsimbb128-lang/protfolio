interface StaticSculptureProps {
  compact?: boolean
}

export function StaticSculpture({ compact = false }: StaticSculptureProps) {
  return (
    <div
      className={`static-sculpture${compact ? ' static-sculpture--compact' : ''}`}
      aria-hidden="true"
    >
      <span className="static-sculpture__glow" />
      <span className="static-sculpture__ring static-sculpture__ring--a" />
      <span className="static-sculpture__ring static-sculpture__ring--b" />
      <span className="static-sculpture__ring static-sculpture__ring--c" />
      <span className="static-sculpture__crystal">
        <span className="static-sculpture__facet static-sculpture__facet--one" />
        <span className="static-sculpture__facet static-sculpture__facet--two" />
      </span>
      <span className="static-sculpture__shard static-sculpture__shard--a" />
      <span className="static-sculpture__shard static-sculpture__shard--b" />
      <span className="static-sculpture__shard static-sculpture__shard--c" />
      <span className="static-sculpture__dot static-sculpture__dot--a" />
      <span className="static-sculpture__dot static-sculpture__dot--b" />
    </div>
  )
}
