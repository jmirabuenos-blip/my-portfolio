import { EDUCATION, CERTIFICATIONS } from "@/lib/portfolio";
import ContactCta from "@/components/ContactCta";
export default function EducationPage() {
  return (
    <>
      <section className="inner-page section-wrap">
        <header className="page-heading">
          <h1>Education</h1>
          <p>Schools, qualifications, and certifications.</p>
        </header>
        <div className="education-list">
          {EDUCATION.map((item) => (
            <article key={item.school} className="education-entry">
              <span className="education-date">{item.period}</span>
              <div>
                <h2>{item.school}</h2>
                <h3>{item.degree}</h3>
                {item.note && <p>{item.note}</p>}
                <ul>
                  {item.highlights.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="certifications">
          <h2>Certifications</h2>
          {CERTIFICATIONS.map((cert) => (
            <article key={cert.title}>
              <span>{cert.year}</span>
              <div>
                <h3>{cert.title}</h3>
                <p>{cert.issuer}</p>
                {cert.note && <p>{cert.note}</p>}
              </div>
            </article>
          ))}
        </div>
        <p className="education-note">
          Currently enrolled · Naga College Foundation · Expected graduation
          2026
        </p>
      </section>
      <ContactCta />
    </>
  );
}
