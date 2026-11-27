interface SlideAtmosphereProps {
  index: string
  tone?: 'light' | 'dark'
}

/**
 * Shared, non-interactive spatial frame for the content slides. The rings and
 * grid use the ambient pointer variables set on the deck viewport; they never
 * sit above content or capture pointer events.
 */
export function SlideAtmosphere({ index, tone = 'light' }: SlideAtmosphereProps) {
  return (
    <div
      className={`slide-atmosphere slide-atmosphere--${tone}`}
      aria-hidden="true"
      data-scene-index={index}
    >
      <span className="slide-atmosphere__glow slide-atmosphere__glow--blue" />
      <span className="slide-atmosphere__glow slide-atmosphere__glow--blush" />
      <span className="slide-atmosphere__grid" />
      <span className="slide-atmosphere__ring slide-atmosphere__ring--outer" />
      <span className="slide-atmosphere__ring slide-atmosphere__ring--inner" />
      <span className="slide-atmosphere__axis slide-atmosphere__axis--x" />
      <span className="slide-atmosphere__axis slide-atmosphere__axis--y" />
      <span className="slide-atmosphere__crosshair slide-atmosphere__crosshair--one" />
      <span className="slide-atmosphere__crosshair slide-atmosphere__crosshair--two" />
      <span className="slide-atmosphere__code">EB · {index}</span>
      <span className="slide-atmosphere__coord">X 04 / Y 08</span>
      <span className="slide-atmosphere__corner slide-atmosphere__corner--tl" />
      <span className="slide-atmosphere__corner slide-atmosphere__corner--tr" />
      <span className="slide-atmosphere__corner slide-atmosphere__corner--bl" />
      <span className="slide-atmosphere__corner slide-atmosphere__corner--br" />
    </div>
  )
}
