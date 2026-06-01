import type { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://fahath-s-digital-marketer.vercel.app'),
  title: 'S. Fahad | Performance Marketing & SEO Analyst / Website Developer',
  description: 'Performance Marketer, SEO Analyst, and Web Developer specializing in high-converting ad channels (Meta, Google Ads) and high-performance web solutions.',
  applicationName: 'S. Fahad Portfolio',
  keywords: [
    'S Fahad',
    'Fahad S',
    'digital marketer',
    'SEO analyst',
    'Web Developer',
    'Google Ads',
    'Meta Ads',
    'Next.js developer',
    'SEO strategy',
    'editorial marketing portfolio'
  ],
  authors: [{ name: 'S. Fahad', url: 'https://fahath-s-digital-marketer.vercel.app' }],
  creator: 'S. Fahad',
  publisher: 'S. Fahad',
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://fahath-s-digital-marketer.vercel.app/',
    title: 'S. Fahad | Editorial Digital Portfolio',
    description: 'Explore the performance marketing, SEO, and web development craftsmanship of S. Fahad. High-performance, data-driven systems wrapped in an eye-comfort vintage editorial style.',
    siteName: 'S. Fahad Portfolio',
    locale: 'en_IN',
    images: [
      {
        url: '/logo-v2.webp',
        width: 1200,
        height: 630,
        alt: 'S. Fahad | Performance Marketing & SEO Analyst',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S. Fahad | Editorial Digital Portfolio',
    description: 'Performance Marketer, SEO Analyst, and Web Developer specializing in high-converting ad channels (Meta, Google Ads) and high-performance web solutions.',
    images: ['/logo-v2.webp'],
  },
  icons: {
    icon: [
      { url: '/logo-v2.webp', type: 'image/webp' },
      { url: '/logo-v2.webp', sizes: '32x32', type: 'image/webp' },
    ],
    apple: [
      { url: '/logo-v2.webp', type: 'image/webp' },
    ],
  },
  verification: {
    google: 'bsLH8HhtqZcn4ITFXtQ2dE-mIgSiCgLVM8iWB7HT3-4',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://fahath-s-digital-marketer.vercel.app/#website',
        'url': 'https://fahath-s-digital-marketer.vercel.app/',
        'name': 'S. Fahad Portfolio',
        'alternateName': ['S. Fahad', 'Fahad Portfolio', 'Fahad S'],
        'description': 'SEO Analyst, Performance Marketer, and Web Developer specializing in Google Ads, Meta Ads, and bespoke web solutions.',
        'publisher': {
          '@id': 'https://fahath-s-digital-marketer.vercel.app/#person',
        },
      },
      {
        '@type': 'Person',
        '@id': 'https://fahath-s-digital-marketer.vercel.app/#person',
        'name': 'S. Fahad',
        'jobTitle': 'Performance Marketing & SEO Analyst / Website Developer',
        'url': 'https://fahath-s-digital-marketer.vercel.app/',
        'sameAs': [
          'https://www.linkedin.com/in/fahath-s-digital-marketer',
          'https://github.com/Fahaths',
          'https://fahath-s.blogspot.com/',
        ],
        'description': 'SEO Analyst, Performance Marketer, and Web Developer specializing in Google Ads, Meta Ads, and bespoke web solutions.',
        'knowsAbout': [
          'Search Engine Optimization',
          'Digital Marketing',
          'Google Ads',
          'Meta Ads',
          'Web Development',
          'Next.js',
          'React',
          'Performance Marketing',
        ],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Inter:ital,wght@0,300..900;1,300..900&display=swap" />
        {/* Render JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
