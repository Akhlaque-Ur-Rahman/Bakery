export interface BrandConfig {
  primaryName: string;
  secondaryName: string;
  logoDataUrl: string | null;
  taglineAboutHero: string;
  footerLine1: string;
  footerLine2: string;
  addressSingleLine: string;
  contactAddressLine2: string;
  contactAddressLine3: string;
  contactCountry: string;
  phoneBlock: string;
  emailBlock: string;
  workingHoursBlock: string;
  mapEmbedCaption: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutParagraph3: string;
  aboutMission: string;
  copyrightExtra: string;
  documentTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogSiteName: string;
  ogImageUrl: string;
  ogImageAlt: string;
  ogLocale: string;
  twitterCard: string;
}

export function getFullBrandName(config: Pick<BrandConfig, 'primaryName' | 'secondaryName'>): string {
  return [config.primaryName, config.secondaryName].filter(Boolean).join(' ').trim();
}
