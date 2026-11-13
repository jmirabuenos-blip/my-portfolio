import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource-variable/dm-sans/index.css";

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
    >
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
