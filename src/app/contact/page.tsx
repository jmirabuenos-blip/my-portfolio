"use client";
import { useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
const email = "Jmirabuenos@gbox.ncf.edu.ph";
const links = [
  {
    name: "GitHub",
    handle: "jmirabuenos-blip",
    url: "https://github.com/jmirabuenos-blip",
  },
  {
    name: "Facebook",
    handle: "jaymer.mirabuenos",
    url: "https://www.facebook.com/jaymer.mirabuenos.2025",
  },
  {
    name: "Instagram",
    handle: "@yoho0_0o",
    url: "https://www.instagram.com/yoho0_0o/",
  },
];
export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setStatus("Email address copied.");
    } catch {
      setStatus(
        "Could not copy. Select the email address above or open the email link.",
      );
    }
  }
  return (
    <section className="inner-page section-wrap contact-page">
      <header className="page-heading">
        <h1>Contact</h1>
        <p>
          Available for freelance projects, internships, and professional
          collaborations. Tell me what you have in mind.
        </p>
      </header>
      <div className="contact-grid">
        <div>
          <h2>Say hello.</h2>
          <a className="email-link" href={`mailto:${email}`}>
            {email}
            <ArrowUpRight size={20} />
          </a>
          <button className="copy-button" onClick={copyEmail}>
            {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
            {copied ? "Copied" : "Copy email address"}
          </button>
          <div className="social-list">
            {links.map((x) => (
              <a
                href={x.url}
                key={x.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {x.name}
                  <small>{x.handle}</small>
                </span>
                <ArrowUpRight size={20} />
              </a>
            ))}
          </div>
          <p className="contact-location">
            Based in Naga City, Philippines.
            <br />
            Usually replies within a day.
          </p>
        </div>
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const subject = encodeURIComponent(
              `Portfolio inquiry from ${data.get("name")}`,
            );
            const body = encodeURIComponent(
              `${data.get("message")}\n\nFrom: ${data.get("name")}\nEmail: ${data.get("email")}`,
            );
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
            setStatus(
              "Your email app was requested. Please send the draft there, or copy my address if no app opened.",
            );
          }}
        >
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            required
            maxLength={120}
          />
          <label htmlFor="email">Your email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Describe your project or inquiry"
            required
            maxLength={3000}
          />
          <button className="submit-button" type="submit">
            Open email draft <ArrowUpRight size={19} />
          </button>
          <p className="form-note">
            Opens your email app with a draft. Nothing is sent automatically.
          </p>
        </form>
      </div>
      <p className="form-status" role="status">
        {status}
      </p>
    </section>
  );
}
