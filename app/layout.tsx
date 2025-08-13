import type React from "react"
import type { Metadata } from "next"
import { Roboto, Roboto_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import {Header} from "@/components/Header";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "StrandX  | Premium Haircuts & Grooming Services",
  description:
      "Professional barber services in the heart of the city. Expert haircuts, beard grooming, hot towel shaves, and premium styling. Book your appointment today.",
  keywords:
      "barber, haircut, beard grooming, hot towel shave, men's styling, premium barber, professional haircut, beard trim, hair styling, grooming services",
  authors: [{ name: "StrandX Barber Shop" }],
  creator: "StrandX Barber Shop",
  publisher: "StrandX Barber Shop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://StrandX.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Elite Barber Shop | Premium Haircuts & Grooming Services",
    description:
        "Professional barber services in the heart of the city. Expert haircuts, beard grooming, hot towel shaves, and premium styling.",
    url: "https://StrandX.com",
    siteName: "StrandX Shop",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StrandX Barber Shop - Premium Grooming Services",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StrandX Barber Shop | Premium Haircuts & Grooming Services",
    description:
        "Professional barber services in the heart of the city. Expert haircuts, beard grooming, hot towel shaves, and premium styling.",
    images: ["/og-image.jpg"],
    creator: "@StrandXbarber",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "StrandX Barber Shop",
    description: "Professional barber services offering premium haircuts, beard grooming, and styling services.",
    url: "https://StrandXbarber.com",
    telephone: "+44 20 1234 5678",
    email: "info@StrandXbarber.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 High Street",
      addressLocality: "London",
      postalCode: "SW1A 1AA",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "51.5074",
      longitude: "-0.1278",
    },
    openingHours: ["Mo-Fr 09:00-19:00", "Sa 09:00-18:00", "Su 10:00-16:00"],
    priceRange: "££",
    image: "https://StrandX.com/og-image.jpg",
    sameAs: [
      "https://www.facebook.com/StrandX",
      "https://www.instagram.com/StrandX",
      "https://twitter.com/StrandX",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Barber Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Classic Cut",
            description: "Traditional haircut with precision and style",
          },
          price: "20",
          priceCurrency: "GBP",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Premium Style",
            description: "Modern styling with wash and finish",
          },
          price: "35",
          priceCurrency: "GBP",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Executive Package",
            description: "Complete grooming experience with premium products",
          },
          price: "60",
          priceCurrency: "GBP",
        },
      ],
    },
  }

  return (
      <html lang="en-GB" className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="msapplication-TileColor" content="#f59e0b" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

        <style>{`
          html {
            font-family: ${roboto.style.fontFamily};
            --font-sans: ${roboto.variable};
            --font-mono: ${robotoMono.variable};
          }
        `}</style>
      </head>
      <body className="font-sans">
      <Header/>
      {children}
      <Toaster />
      </body>
      </html>
  )
}
