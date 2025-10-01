import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/structured-data";

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
    default: "Center Street IT - Premier IT Support & Managed Services Houston",
    template: "%s | Center Street IT"
  },
  description: "Premier IT support and managed services in Houston, TX. Expert technology solutions, cloud infrastructure, cybersecurity, and 24/7 IT support for businesses. Contract-free services.",
  keywords: [
    "IT support Houston", 
    "managed IT services", 
    "Houston IT company", 
    "cloud infrastructure", 
    "cybersecurity services", 
    "network management", 
    "IT consulting", 
    "business technology solutions",
    "24/7 IT support",
    "contract-free IT services"
  ],
  authors: [{ name: "Center Street IT" }],
  creator: "Center Street IT",
  publisher: "Center Street IT",
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
    title: "Center Street IT - Premier IT Support & Managed Services Houston",
    description: "Expert IT support and managed services in Houston, TX. 24/7 support, cloud solutions, cybersecurity, and contract-free services for businesses.",
    url: 'https://centerstreetit.com',
    siteName: 'Center Street IT',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/Logo-WhiteText.png',
        width: 1200,
        height: 630,
        alt: 'Center Street IT - Houston IT Support Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Center Street IT - Premier IT Support Houston",
    description: "Expert IT support and managed services in Houston, TX. 24/7 support, cloud solutions, and cybersecurity.",
    images: ['/assets/Logo-WhiteText.png'],
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
  icons: {
    icon: "/assets/favicon.ico",
    shortcut: "/assets/favicon.ico",
    apple: "/assets/favicon.ico",
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="organization" />
        <StructuredData type="localBusiness" />
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
