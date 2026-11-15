"use client";

import { useEffect, useState } from "react";

export const SectionNav = ({
  sections,
}: {
  sections: { id: string; label: string }[];
}) => {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    // Short sections at the end never reach the 30% line, so the bottom of the page counts as the last one.
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.3;
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <nav aria-label="Sections" className="hidden lg:block mt-10">
      <ul className="space-y-1">
        {sections.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "true" : undefined}
                className={`group flex items-center gap-3 py-1 font-display text-sm font-medium transition-colors ${
                  on ? "text-(--text)" : "text-(--muted) hover:text-(--text)"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-px transition-[width,background-color] duration-300 ease-(--ease-out) ${
                    on
                      ? "w-12 bg-(--accent)"
                      : "w-6 bg-(--border-dark) group-hover:w-12 group-hover:bg-(--text)"
                  }`}
                />
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
