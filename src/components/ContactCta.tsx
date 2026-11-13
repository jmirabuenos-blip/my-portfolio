import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function ContactCta() {
  return (
    <section id="contact" className="contact-cta">
      <div className="contact-orbit" aria-hidden="true" />
      <div className="availability">
        <span />
        Open to internships & freelance projects
      </div>
      <Link href="/contact">
        Contact me
        <ArrowUpRight aria-hidden="true" />
      </Link>
      <div className="contact-cta-bottom">
        <p>For internship and freelance inquiries.</p>
        <a className="text-link" href="mailto:Jmirabuenos@gbox.ncf.edu.ph">
          Email me <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
