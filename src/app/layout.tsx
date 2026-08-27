import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Center Street I.T. - Managed IT Support & Cybersecurity in Deer Park, TX",
    template: "%s | Center Street I.T."
  },
  description: "Managed IT support and cybersecurity for industrial, trades and professional businesses in Deer Park, Pasadena and La Porte, Texas. 24/7 support, cloud solutions and security.",
  keywords: [
    "IT support Deer Park TX",
    "managed IT services",
    "IT support Pasadena TX",
    "IT support La Porte TX",
    "cloud infrastructure",
    "cybersecurity services",
    "network management",
    "IT consulting",
    "business technology solutions",
    "24/7 IT support"
  ],
  authors: [{ name: "Center Street I.T." }],
  creator: "Center Street I.T.",
  publisher: "Center Street I.T.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://centerstreetit.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Center Street I.T. - Managed IT Support & Cybersecurity in Deer Park, TX",
    description: "Managed IT support and cybersecurity for businesses in Deer Park, Pasadena and La Porte, Texas. 24/7 support, cloud solutions and security.",
    url: 'https://centerstreetit.com',
    siteName: 'Center Street I.T.',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        // Purpose-built social card: solid ground, no transparency, and the
        // declared dimensions match the file exactly.
        url: '/assets/og-card.png',
        width: 1200,
        height: 630,
        alt: 'Center Street I.T. - managed IT support and cybersecurity in Deer Park, Texas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Center Street I.T. - Managed IT Support in Deer Park, TX",
    description: "Managed IT support and cybersecurity for businesses in Deer Park, Pasadena and La Porte, Texas.",
    images: ['/assets/og-card.png'],
    creator: '@centerstreetit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Icons are deliberately NOT declared here. They come from the App Router file
  // conventions instead: src/app/favicon.ico, src/app/icon.png (512x512) and
  // src/app/apple-icon.png (180x180).
  //
  // This block used to point all three at /assets/favicon.ico, which produced four
  // competing <link rel="icon"> tags across two different files. Google needs one
  // unambiguous square icon of at least 48px, so it fell back to a generic
  // placeholder in search results instead of the logo.
  // Google Search Console verification intentionally omitted. The previous value
  // was an unreplaced placeholder string that was being published on every page.
  // Add it back here only with a real token from Search Console:
  //   verification: { google: '<token>' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: 'light' }}>
      <head>
        <meta name="color-scheme" content="light" />
        {/* Business-level JSON-LD is emitted on the homepage only (see src/app/page.tsx).
            It used to be repeated in this layout, i.e. on every page of the site. */}
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
