"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowUpRight, Menu, X, Orbit } from "lucide-react";
import { MotionConfig } from "framer-motion";
const navigation = [
  ["Work", "/projects"],
  ["About", "/about"],
  ["Education", "/education"],
];
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link
          className="wordmark"
          href="/"
          aria-label="Jaymer Mirabuenos home"
          onClick={() => setOpen(false)}
        >
          <Orbit size={28} strokeWidth={1.3} />
          <span>
            Jaymer<span className="wordmark-dot">.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([name, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="contact-link"
            aria-current={path === "/contact" ? "page" : undefined}
          >
            Let’s talk <ArrowUpRight size={17} />
          </Link>
        </nav>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          {[...navigation, ["Let’s talk", "/contact"]].map(([name, href]) => (
            <Link href={href} key={href} onClick={() => setOpen(false)}>
              {name}
              <ArrowUpRight />
            </Link>
          ))}
        </nav>
      )}
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <Link href="/" className="footer-name">
          Jaymer Mirabuenos<span>Frontend developer</span>
        </Link>
        <span>Naga City, Philippines</span>
        <a
          href="https://github.com/jmirabuenos-blip"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <ArrowUpRight size={15} />
        </a>
        <span>© {new Date().getFullYear()}</span>
        <a href="#main" aria-label="Back to top">
          Back to top <ArrowUpRight size={15} />
        </a>
      </footer>
    </MotionConfig>
  );
}
