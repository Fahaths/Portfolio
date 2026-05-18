import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://fahath-s-digital-marketer.vercel.app'),
  title: 'S. Fahath | Digital Marketer & SEO Analyst',
  description: 'SEO Analyst and Digital Marketer specializing in SEO strategy, Meta Ads, Google Ads, YouTube Ads, and content marketing.',
  applicationName: 'S. Fahath Portfolio',
  keywords: [
    'S Fahath',
    'digital marketer',
    'SEO analyst',
    'Google Ads',
    'Meta Ads',
    'YouTube Ads',
    'social media marketing',
    'SEO strategy',
    'digital marketing portfolio'
  ],
  authors: [{ name: 'S. Fahath', url: 'https://fahath-s-digital-marketer.vercel.app' }],
  creator: 'S. Fahath',
  publisher: 'S. Fahath',
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
    title: 'S. Fahath | Digital Marketer & SEO Analyst',
    description: 'SEO Analyst and Digital Marketer specializing in SEO strategy, Meta Ads, Google Ads, YouTube Ads, and content marketing.',
    siteName: 'S. Fahath Portfolio',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'S. Fahath | Digital Marketer & SEO Analyst',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S. Fahath | Digital Marketer & SEO Analyst',
    description: 'SEO Analyst and Digital Marketer specializing in SEO strategy, Meta Ads, Google Ads, YouTube Ads, and content marketing.',
    images: ['/og-image.jpg'],
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
        'name': 'S. Fahath Portfolio',
        'alternateName': ['S. Fahath', 'Fahath Portfolio', 'Fahath S'],
        'description': 'SEO Analyst and Digital Marketer specializing in SEO strategy, Meta Ads, Google Ads, YouTube Ads, and content marketing.',
        'publisher': {
          '@id': 'https://fahath-s-digital-marketer.vercel.app/#person',
        },
      },
      {
        '@type': 'Person',
        '@id': 'https://fahath-s-digital-marketer.vercel.app/#person',
        'name': 'S. Fahath',
        'jobTitle': 'Digital Marketer & SEO Analyst',
        'url': 'https://fahath-s-digital-marketer.vercel.app/',
        'sameAs': [
          'https://www.linkedin.com/in/fahath-s-digital-marketer',
          'https://github.com/Fahaths',
          'https://fahath-s.blogspot.com/',
        ],
        'description': 'SEO Analyst and Digital Marketer specializing in SEO strategy, Meta Ads, Google Ads, YouTube Ads, and content marketing.',
        'knowsAbout': [
          'Search Engine Optimization',
          'Digital Marketing',
          'Google Ads',
          'Meta Ads',
          'YouTube Ads',
          'Content Marketing',
          'Performance Marketing',
        ],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Preconnect to high-priority origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
