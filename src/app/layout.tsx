import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "../components/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TICKETSHUB - Modern Event Ticketing Platform",
  description:
    "Your premier destination for entertainment experiences. From blockbuster movies to live concerts, sports events to theater shows.",
  icons: {
    icon: "/ticketshub_logo.png",
  },
  openGraph: {
    title: "TICKETSHUB - Modern Event Ticketing Platform",
    description:
      "Your premier destination for entertainment experiences. From blockbuster movies to live concerts, sports events to theater shows.",
    url: "https://your-domain.com",
    siteName: "TICKETSHUB",
    images: [
      {
        url: "https://your-domain.com/concert-background.png",
        alt: "TICKETSHUB - Events",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TICKETSHUB - Modern Event Ticketing Platform",
    description:
      "Your premier destination for entertainment experiences. From blockbuster movies to live concerts, sports events to theater shows.",
    images: ["https://your-domain.com/concert-background.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TICKETSHUB",
    url: "https://your-domain.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://your-domain.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <html lang="en">
      <head>
        <script
          key="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
