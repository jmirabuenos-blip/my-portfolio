import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jaymer Mirabuenos | Frontend Developer",
    template: "%s | Jaymer Mirabuenos",
  },
  description:
    "IT student and frontend developer from the Philippines. Building modern, responsive web experiences with React and Next.js.",
  keywords: [
    "frontend developer",
    "Next.js",
    "React",
    "Philippines",
    "IT student",
    "web developer",
  ],
  authors: [{ name: "Jaymer Mirabuenos" }],
  openGraph: {
    title: "Jaymer Mirabuenos | Frontend Developer",
    description: "IT student and frontend developer from the Philippines.",
    url: "https://your-site.vercel.app",
    siteName: "Jaymer Mirabuenos",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${dmSans.variable}`}
    >
      <body className="scanlines">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
