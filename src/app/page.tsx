import {
  shortCompany,
  profile,
  contact,
  experienceYears,
  experiences,
  education,
  projects,
  stack,
} from "@/components/portfolio/content";
import { SectionNav } from "@/components/portfolio/SectionNav";
import { LogoField } from "@/components/portfolio/LogoField";
import { Resume } from "@/components/portfolio/Resume";
import { PrintButton } from "@/components/portfolio/PrintButton";
import {
  siOpenjdk,
  siSpringboot,
  siNestjs,
  siFirebase,
  siReact,
  siNextdotjs,
  siGo,
} from "simple-icons";

const logos = [
  siOpenjdk,
  siSpringboot,
  siNestjs,
  siFirebase,
  siReact,
  siNextdotjs,
  siGo,
].map(({ title, path }) => ({
  title: title === "OpenJDK" ? "Java" : title,
  path,
}));

const sections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
];

// "October 2022 – Present" -> "Oct 2022 – Present"
const shortPeriod = (period: string) =>
  period.replace(/([A-Z][a-z]{2})[a-z]* (\d{4})/g, "$1 $2");

const SectionHead = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-sm font-medium text-(--accent) pb-3 mb-8 sm:mb-10 border-b border-(--border)">
    {children}
  </h2>
);

export default function Home() {
  const years = experienceYears();

  return (
    <>
      <Resume />
      <div className="print:hidden">
        <a
          href="#experience"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 key px-4 text-sm"
        >
          Skip to content
        </a>

        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <header className="relative lg:sticky lg:top-0 lg:h-dvh lg:flex lg:flex-col lg:justify-between pt-16 pb-12 lg:py-12">
            <LogoField logos={logos} />
            <div className="relative">
              <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-tight">
                Thavirak Svay
              </h1>
              <p className="font-display text-xl font-medium text-(--text-body) mt-3">
                Backend Developer
              </p>
              <p className="text-base text-(--text-body) leading-relaxed mt-5 max-w-[40ch]">
                {profile.summary(years)}
              </p>

              <dl
                data-field-above
                className="grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-y-3 mt-6 max-w-[24rem]"
              >
                {[
                  { label: "Experience", value: `${years}+ years` },
                  { label: "Based in", value: "Phnom Penh, Cambodia" },
                  { label: "Core stack", value: "Java, Spring Boot, WSO2" },
                  { label: "Domains", value: "Banking, commerce" },
                ].map((f) => (
                  <div key={f.label}>
                    <dt className="font-display text-sm font-medium text-(--muted)">
                      {f.label}
                    </dt>
                    <dd className="mt-0.5 text-[0.9375rem] tabular-nums">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <SectionNav sections={sections} />
              {/* mobile: space for the logo animation */}
              <div aria-hidden className="h-56 lg:hidden" />
            </div>

            <div data-field-below className="relative mt-6">
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="key key-primary px-6 text-sm"
                >
                  Get in touch
                </a>
                <PrintButton className="key px-6 text-sm" />
              </div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-5 max-w-[24rem] text-sm">
                {[
                  { label: contact.email, href: `mailto:${contact.email}` },
                  { label: contact.phone, href: contact.phoneHref },
                  { label: "LinkedIn", href: contact.linkedin, external: true },
                  { label: "GitHub", href: contact.github, external: true },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      {...(l.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="text-(--text-body) underline decoration-(--border-dark) underline-offset-4 hover:decoration-(--accent)"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </header>

          <main className="pt-6 pb-24 lg:pt-14 space-y-20 sm:space-y-28">
            <section id="experience">
              <SectionHead>Experience</SectionHead>
              <ol className="space-y-12 sm:space-y-16">
                {experiences.map((job) => (
                  <li
                    key={job.id}
                    className="grid sm:grid-cols-[10rem_minmax(0,1fr)] gap-x-8 gap-y-5"
                  >
                    <div className="sm:sticky sm:top-8 sm:self-start">
                      <h3 className="font-display text-xl font-semibold tracking-tight text-(--accent)">
                        {shortCompany(job.company)}
                      </h3>
                      <p className="text-sm text-(--muted) tabular-nums mt-1">
                        {shortPeriod(job.period)}
                      </p>
                      <ul
                        className="flex flex-wrap gap-1.5 mt-4"
                        aria-label="Stack"
                      >
                        {job.stack.map((s) => (
                          <li key={s} className="tech-tag">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-7">
                      {job.stages.map((stage) => (
                        <div key={stage.title}>
                          <h4 className="font-display text-base font-semibold">
                            {stage.title}
                          </h4>
                          {job.stages.length > 1 && stage.period && (
                            <p className="text-sm text-(--muted) tabular-nums mt-0.5">
                              {shortPeriod(stage.period)}
                            </p>
                          )}
                          <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-(--accent)">
                            {stage.items.map((r) => (
                              <li
                                key={r}
                                className="text-sm text-(--text-body) leading-relaxed"
                              >
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="projects">
              <SectionHead>Selected projects</SectionHead>

              <ul className="-mt-6 divide-y divide-(--border)">
                {projects.map((p) => (
                  <li key={p.title} className="py-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {p.title}
                      </h3>
                      <span className="text-sm text-(--muted)">
                        {p.company}
                      </span>
                    </div>
                    <p className="text-sm text-(--text-body) leading-relaxed mt-1.5">
                      {p.summary}
                    </p>
                    <p className="text-sm text-(--muted) mt-2">
                      {p.tags.join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section id="skills">
              <SectionHead>Skills</SectionHead>
              <dl className="space-y-5">
                {stack.map((g) => (
                  <div
                    key={g.category}
                    className="grid sm:grid-cols-[8.5rem_minmax(0,1fr)] gap-x-6"
                  >
                    <dt className="font-display text-sm font-medium text-(--muted) pt-0.5">
                      {g.category}
                    </dt>
                    <dd className="leading-relaxed">{g.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="education">
              <SectionHead>Education</SectionHead>
              {education.map((ed) => (
                <div
                  key={ed.id}
                  className="grid sm:grid-cols-[10rem_minmax(0,1fr)] gap-x-8 gap-y-2"
                >
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-(--accent)">
                      {ed.institution}
                    </h3>
                    <p className="text-sm text-(--muted) tabular-nums mt-1">
                      {ed.period}
                    </p>
                  </div>
                  <p className="text-(--text-body) sm:pt-1">{ed.degree}</p>
                </div>
              ))}
            </section>

            <footer className="pt-10 border-t border-(--border) text-sm text-(--muted)">
              © {new Date().getFullYear()} Thavirak Svay
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
