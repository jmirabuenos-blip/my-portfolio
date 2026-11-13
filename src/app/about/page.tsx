import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SKILLS, CALLOUTS } from "@/lib/portfolio";
import ContactCta from "@/components/ContactCta";
export default function AboutPage() {
  return (
    <>
      <section className="inner-page section-wrap">
        <header className="page-heading">
          <h1>About me</h1>
          <p>
            Frontend developer and IT student with a focus on building
            performant, accessible web applications. Experienced with React,
            Next.js, and full-stack workflows.
          </p>
        </header>
        <div className="editorial-row">
          <h2>Background</h2>
          <div className="prose">
            <p>
              Started with web development through self-directed learning and
              academic coursework. Progressed from basic HTML/CSS to building
              full-stack applications with modern frameworks.
            </p>
            <p>
              Currently completing a BS in Information Technology at Naga
              College Foundation, with coursework in software development,
              database systems, and network administration.
            </p>
            <p>
              Open to internships, freelance projects, and collaborative
              opportunities where I can apply technical skills and continue
              developing professionally.
            </p>
            <Link href="/education" className="text-link">
              My education <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="editorial-row">
          <h2>In progress.</h2>
          <ul className="statement-list">
            {[
              "Pursuing BS in Information Technology at Naga College Foundation",
              "Developing full-stack applications with React and Next.js",
              "Seeking internship and freelance opportunities",
              "Expanding expertise in backend systems and DevOps",
            ].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="editorial-row">
          <h2>How I work.</h2>
          <ul className="statement-list">
            {CALLOUTS.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="skills-section">
          <h2>Technical skills</h2>
          {Object.entries(SKILLS).map(([category, items]) => (
            <div className="skill-row" key={category}>
              <h3>{category}</h3>
              <div>
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
