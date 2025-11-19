
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Github } from "lucide-react";

export default function SocialIcons() {
  return (
    <div className="flex space-x-6 justify-center mt-6">
      <Link
        href="https://www.instagram.com/jajajaymerrr/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-red-500 transition-colors"
      >
        <Instagram size={28} />
      </Link>

      <Link
        href="https://www.facebook.com/jaymer.mirabuenos.2025"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-600 transition-colors"
      >
        <Facebook size={28} />
      </Link>

      <Link
        href="https://www.linkedin.com/in/your-linkedin-profile/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-500 transition-colors"
      >
        <Linkedin size={28} />
      </Link>

      <Link
        href="https://github.com/your-github-username"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-400 transition-colors"
      >
        <Github size={28} />
      </Link>
    </div>
  );
}
