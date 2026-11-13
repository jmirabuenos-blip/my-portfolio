import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Hero from "./Hero";
import ProjectGallery from "./ProjectGallery";
import ContactCta from "./ContactCta";
import { SkillExplorer } from "./PersonalSections";
import { EDUCATION } from "@/lib/portfolio";

export default function HomePortfolio() {
  return (
    <>
      {/* Hero — cinematic full viewport */}
      <Hero />

      {/* Chapter bar */}
      <div className="chapter-bar" aria-hidden="true">
        <span>Projects · Skills · Education</span>
        <span>Jaymer Mirabuenos</span>
        <span className="chapter-bar-year">© 2026</span>
      </div>

      {/* Projects */}
      <section id="work" className="work-section section-wrap" aria-labelledby="work-heading">
        <div className="section-heading">
          <h2 id="work-heading">
            Selected <span>work</span>
          </h2>
          <p>
            Frontend and full-stack applications
            <br />
            built for real users.
          </p>
        </div>
        <ProjectGallery />
        <Link href="/projects" className="text-link">
          Explore all projects <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </section>

      {/* About */}
      <section id="about" className="home-about section-wrap" aria-labelledby="about-heading">
        <div className="portrait-frame">
          <Image
            src="/personal/jaymer.jpg"
            alt="Jaymer Mirabuenos"
            fill
            sizes="(max-width:700px) 90vw, 40vw"
            priority={false}
          />
          <span>
            Jaymer Mirabuenos
            <br />
            Frontend developer · IT student
          </span>
        </div>
        <div className="about-story">
          <h2 id="about-heading">About me</h2>
          <p>
            I am a frontend developer and IT student focused on building clean,
            performant web experiences. I work primarily with React and Next.js,
            and I care about both the code and the design.
          </p>
          <p>
            Currently in my 3rd year of Information Technology at Naga College
            Foundation, where I develop projects through coursework and
            independent practice.
          </p>
          <Link href="/about" className="text-link">
            More about me <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Skills */}
      <section className="section-wrap home-skills" aria-labelledby="skills-heading">
        <div className="section-heading">
          <h2 id="skills-heading">
            Technical <span>skills</span>
          </h2>
          <p>
            Languages, frameworks, and tools
            <br />
            used across my projects.
          </p>
        </div>
        <SkillExplorer />
      </section>

      {/* Education */}
      <section id="education" className="section-wrap home-education" aria-labelledby="education-heading">
        <div className="section-heading">
          <h2 id="education-heading">Education</h2>
          <Link href="/education" className="text-link">
            Full history <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="journey">
          {[...EDUCATION].reverse().map((item) => (
            <article key={item.school}>
              <span className="journey-point" />
              <span className="journey-period">{item.period}</span>
              <h3>{item.school}</h3>
              <p>{item.degree}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCta />
    </>
  );
}
