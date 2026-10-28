import { CARD_SIZE } from '@/components/projectCardSize'

const bar = 'rounded-full bg-fg/[0.07] animate-pulse motion-reduce:animate-none'

/** Placeholder with the card's exact padding and minimum height, so nothing jumps when data arrives. */
export function ProjectCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-full flex-col rounded-2xl border border-line bg-ink-raised p-6 sm:p-7 ${featured ? CARD_SIZE.featured : CARD_SIZE.regular}`}
    >
      <div className="flex items-start justify-between">
        <span className={`${bar} h-3 w-28`} />
        <span className={`${bar} size-9`} />
      </div>
      <span className={`${bar} mt-6 h-7 ${featured ? 'w-3/4 lg:h-12' : 'w-2/3'}`} />
      <span className={`${bar} mt-4 h-3.5 w-full`} />
      <span className={`${bar} mt-2 h-3.5 w-4/5`} />
      <div className="mt-auto flex gap-1.5 pt-7">
        <span className={`${bar} h-6 w-16`} />
        <span className={`${bar} h-6 w-20`} />
      </div>
    </div>
  )
}
