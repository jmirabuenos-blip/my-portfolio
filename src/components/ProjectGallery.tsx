"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/portfolio";
export default function ProjectGallery({
  filters = false,
}: {
  filters?: boolean;
}) {
  const [filter, setFilter] = useState("all");
  const projects = PROJECTS.filter(
    (p) => filter === "all" || p.category === filter,
  );
  return (
    <>
      {filters && (
        <div className="project-filters" aria-label="Filter projects">
          {[
            ["all", "All projects"],
            ["web", "Web development"],
            ["ai", "AI & experiments"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              aria-pressed={filter === id}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      <div className="project-gallery" aria-live="polite">
        {projects.map((project, i) => (
          <article
            className={`project project-${project.category}`}
            key={project.name}
          >
            <a
              className="project-stage"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name} (opens in a new tab)`}
            >
              <span className="project-index">
                {String(i + 1).padStart(2, "0")} / SELECTED WORK
              </span>
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={`${project.name} project preview`}
                  fill
                  sizes="(max-width: 700px) 90vw, 65vw"
                />
              </div>
              <span className="project-visit">
                Launch project <ArrowUpRight size={18} />
              </span>
            </a>
            <div className="project-information">
              <div className="project-meta">
                <span>
                  {project.category === "ai"
                    ? "AI & creative tools"
                    : "Full-stack development"}
                </span>
                <span>{project.year}</span>
              </div>
              <h3>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.name}
                  <ArrowUpRight size={24} />
                </a>
              </h3>
              <p>{project.desc}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a
                href={project.url}
                className="text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live project <ArrowUpRight size={17} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
