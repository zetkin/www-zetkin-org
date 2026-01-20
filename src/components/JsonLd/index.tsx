import { getServerSideURL } from '@/utilities/getURL';

export function OrganizationJsonLd() {
  const siteUrl = getServerSideURL();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zetkin Foundation',
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    sameAs: [
      'https://github.com/zetkin',
      'https://www.facebook.com/zetaborgen',
    ],
    description:
      'Zetkin is a platform for organizing activism, built by the Zetkin Foundation.',
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
}
