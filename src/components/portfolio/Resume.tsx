import {
  profile,
  contact,
  experienceYears,
  experiences,
  education,
  stack,
  shortCompany,
} from "./content";

// Print-only A4 layout. Shown instead of the site when printing / saving as PDF.

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-[11pt] font-semibold text-(--accent) border-b border-(--border) pb-[1.2mm] mb-[3mm]">
    {children}
  </h2>
);

export const Resume = () => {
  const years = experienceYears();
  const links = [
    { label: contact.phone, href: contact.phoneHref },
    { label: contact.email, href: `mailto:${contact.email}` },
    { label: profile.website, href: `https://${profile.website}` },
    { label: contact.linkedin.replace("https://", ""), href: contact.linkedin },
    { label: contact.github.replace("https://", ""), href: contact.github },
  ];

  return (
    <article className="resume hidden print:block text-(--text)">
      <div className="h-[5mm] bg-(--accent)" />
      <div className="grid grid-cols-[66mm_1fr] min-h-[292mm]">
        <aside className="bg-(--white) border-r border-(--border-dark) px-[8mm] py-[11mm] space-y-[8mm]">
          <div>
            <h1 className="font-display text-[22pt] font-semibold leading-none tracking-tight">
              {profile.name}
            </h1>
            <p className="font-display text-[11.8pt] font-medium text-(--accent) mt-[2mm]">
              {profile.title}
            </p>
            <p className="text-[9.2pt] text-(--muted) mt-[1mm]">
              {profile.location}
            </p>
          </div>

          <ul className="space-y-[1.2mm] text-[9.2pt]">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-(--text-body)">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <section>
            <Heading>Profile</Heading>
            <p className="text-[9.2pt] leading-[1.5] text-(--text-body)">
              {profile.summary(years)}
            </p>
          </section>

          <section>
            <Heading>Skills</Heading>
            <dl className="space-y-[2.2mm]">
              {stack.map((g) => (
                <div key={g.category}>
                  <dt className="font-display text-[9.2pt] font-semibold">
                    {g.category}
                  </dt>
                  <dd className="text-[9.2pt] leading-[1.45] text-(--text-body)">
                    {g.items.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <Heading>Education</Heading>
            {education.map((ed) => (
              <div key={ed.id} className="text-[9.2pt] leading-[1.45]">
                <p className="font-display font-semibold">{ed.degree}</p>
                <p className="text-(--text-body)">
                  {ed.institution}, {ed.period}
                </p>
              </div>
            ))}
          </section>
        </aside>

        <main className="px-[9mm] py-[11mm]">
          <Heading>Work experience</Heading>
          <div className="space-y-[6.5mm]">
            {experiences.map((job) => (
              <section key={job.id} className="break-inside-avoid-page">
                <div className="flex items-baseline justify-between gap-[3mm]">
                  <h3 className="font-display text-[11.8pt] font-semibold text-(--accent)">
                    {shortCompany(job.company)}
                  </h3>
                  <p className="text-[9.2pt] text-(--muted) whitespace-nowrap">
                    {job.period}
                  </p>
                </div>
                {job.stages.map((stage) => (
                  <div key={stage.title} className="mt-[3mm]">
                    <div className="flex items-baseline justify-between gap-[3mm]">
                      <h4 className="font-display text-[10.2pt] font-semibold">
                        {stage.title}
                      </h4>
                      {stage.period && job.stages.length > 1 && (
                        <p className="text-[8.6pt] text-(--muted) whitespace-nowrap">
                          {stage.period}
                        </p>
                      )}
                    </div>
                    <ul className="mt-[1mm] space-y-[1.2mm] list-disc pl-[4mm] marker:text-(--accent)">
                      {stage.items.map((item) => (
                        <li
                          key={item}
                          className="text-[9.2pt] leading-[1.42] text-(--text-body)"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </main>
      </div>
    </article>
  );
};
