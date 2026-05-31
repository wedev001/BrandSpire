import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard.jsx';

export default function ProjectCarousel({ projects }) {
  const scrollerRef = useRef(null);

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('article');
    const step = (card?.offsetWidth ?? 280) + 20;
    el.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {projects.map((p, i) => (
          <div key={p.title} className="snap-start w-[260px] sm:w-[280px] md:w-[300px] shrink-0">
            <ProjectCard project={p} index={i} />
          </div>
        ))}
      </div>
      <div className="absolute -bottom-14 left-0 flex gap-2">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Previous projects"
          className="h-10 w-10 grid place-items-center rounded-full border border-white/10 bg-surface-card hover:bg-violet-gradient hover:border-transparent transition-all"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Next projects"
          className="h-10 w-10 grid place-items-center rounded-full border border-white/10 bg-surface-card hover:bg-violet-gradient hover:border-transparent transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
