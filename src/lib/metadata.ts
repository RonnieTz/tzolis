import { Metadata } from 'next';

interface MetadataConfig {
  title: {
    gr: string;
    en: string;
  };
  description: {
    gr: string;
    en: string;
  };
  keywords: {
    gr: string;
    en: string;
  };
  url?: string;
  noIndex?: boolean;
}

export function generateMetadata(config: MetadataConfig): Metadata {
  return {
    title: config.title.gr, // Default to Greek since it's a Greek business
    description: config.description.gr,
    keywords: config.keywords.gr,
    authors: [{ name: 'Tzolis Welding' }],
    openGraph: {
      title: config.title.gr,
      description: config.description.gr,
      type: 'website',
      locale: 'el_GR', // Greek locale
      siteName: 'Tzolis Welding',
      url: config.url,
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title.gr,
      description: config.description.gr,
    },
    robots: config.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
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
      canonical: config.url || '/',
      languages: {
        'el-GR': config.url ? `/gr${config.url}` : '/gr',
        'en-US': config.url ? `/en${config.url}` : '/en',
      },
    },
  };
}
