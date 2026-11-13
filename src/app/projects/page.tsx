import ProjectGallery from "@/components/ProjectGallery";
import ContactCta from "@/components/ContactCta";
export default function ProjectsPage() {
  return (
    <>
      <section className="inner-page section-wrap">
        <header className="page-heading">
          <h1>Projects</h1>
          <p>
            A collection of projects demonstrating technical experience across
            frontend and full-stack development.
          </p>
        </header>
        <ProjectGallery filters />
      </section>
      <ContactCta />
    </>
  );
}
