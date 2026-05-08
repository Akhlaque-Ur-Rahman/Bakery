import type { BrandConfig } from './types';

export const BRAND_STORAGE_KEY = 'ecommerce-brand-config-v2';

export const defaultBrandConfig: BrandConfig = {
  primaryName: 'Bismillah',
  secondaryName: 'Bakery',
  logoDataUrl: null,
  taglineAboutHero: 'Freshly Baked with Love Since 1995',
  footerLine1: 'Freshly baked with love, delivering premium quality bakery products since 1995.',
  footerLine2: 'Your trusted bakery in Phulwari Sharif, Patna.',
  addressSingleLine: 'Phulwari Sharif, Patna, Bihar - 801505',
  contactAddressLine2: 'Phulwari Sharif',
  contactAddressLine3: 'Patna, Bihar - 801505',
  contactCountry: 'India',
  phoneBlock: '+91 93049 69534',
  emailBlock: 'info@alhamdulillahbakery.com\norders@alhamdulillahbakery.com',
  workingHoursBlock: 'Monday - Saturday: 7:00 AM - 9:00 PM\nSunday: 7:00 AM - 8:00 PM',
  mapEmbedCaption: 'Google Map Embed - Phulwari Sharif, Patna',
  aboutParagraph1:
    'Established in 1995, Bismillah Bakery has been serving the people of Phulwari Sharif, Patna with premium quality bakery products for over 28 years. What started as a small family business has grown into one of the most trusted bakery brands in the region.',
  aboutParagraph2:
    'Our commitment to quality, freshness, and hygiene has remained unwavering since day one. We use only the finest ingredients and traditional recipes passed down through generations, combined with modern baking techniques to create products that delight our customers.',
  aboutParagraph3:
    'Today, we serve thousands of satisfied customers across Patna through our online platform, making it easier than ever to enjoy our freshly baked products from the comfort of your home.',
  aboutMission:
    'To become the most trusted and loved bakery brand in Bihar by delivering premium quality products that bring joy to every celebration and everyday moments. We strive to maintain our commitment to excellence while expanding our reach to serve more customers across the region.',
  copyrightExtra: ' | Design with love by EDUNEX',
  documentTitle: 'Bismillah Bakery | Freshly Baked with Love',
  metaDescription:
    'Premium bakery products – cookies, cakes, breads, biscuits and more. Freshly baked with love in Patna since 1995. Free delivery on orders above ₹500.',
  ogTitle: 'Bismillah Bakery | Freshly Baked with Love',
  ogDescription:
    'Premium bakery products – cookies, cakes, breads, biscuits and more. Freshly baked with love in Patna since 1995.',
  ogSiteName: 'Bismillah Bakery',
  ogImageUrl: '',
  ogImageAlt: 'Bismillah Bakery',
  ogLocale: 'en_IN',
  twitterCard: 'summary',
};

function toSafeString(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback;
}

export function mergeBrandConfig(stored: Partial<BrandConfig> | null | undefined): BrandConfig {
  if (!stored || typeof stored !== 'object') {
    return { ...defaultBrandConfig };
  }

  const merged: BrandConfig = { ...defaultBrandConfig, ...stored };

  return {
    ...merged,
    primaryName: toSafeString(merged.primaryName, defaultBrandConfig.primaryName),
    secondaryName: toSafeString(merged.secondaryName, defaultBrandConfig.secondaryName),
    logoDataUrl: typeof merged.logoDataUrl === 'string' || merged.logoDataUrl === null ? merged.logoDataUrl : null,
    taglineAboutHero: toSafeString(merged.taglineAboutHero, defaultBrandConfig.taglineAboutHero),
    footerLine1: toSafeString(merged.footerLine1, defaultBrandConfig.footerLine1),
    footerLine2: toSafeString(merged.footerLine2, defaultBrandConfig.footerLine2),
    addressSingleLine: toSafeString(merged.addressSingleLine, defaultBrandConfig.addressSingleLine),
    contactAddressLine2: toSafeString(merged.contactAddressLine2, defaultBrandConfig.contactAddressLine2),
    contactAddressLine3: toSafeString(merged.contactAddressLine3, defaultBrandConfig.contactAddressLine3),
    contactCountry: toSafeString(merged.contactCountry, defaultBrandConfig.contactCountry),
    phoneBlock: toSafeString(merged.phoneBlock, defaultBrandConfig.phoneBlock),
    emailBlock: toSafeString(merged.emailBlock, defaultBrandConfig.emailBlock),
    workingHoursBlock: toSafeString(merged.workingHoursBlock, defaultBrandConfig.workingHoursBlock),
    mapEmbedCaption: toSafeString(merged.mapEmbedCaption, defaultBrandConfig.mapEmbedCaption),
    aboutParagraph1: toSafeString(merged.aboutParagraph1, defaultBrandConfig.aboutParagraph1),
    aboutParagraph2: toSafeString(merged.aboutParagraph2, defaultBrandConfig.aboutParagraph2),
    aboutParagraph3: toSafeString(merged.aboutParagraph3, defaultBrandConfig.aboutParagraph3),
    aboutMission: toSafeString(merged.aboutMission, defaultBrandConfig.aboutMission),
    copyrightExtra: toSafeString(merged.copyrightExtra, defaultBrandConfig.copyrightExtra),
    documentTitle: toSafeString(merged.documentTitle, defaultBrandConfig.documentTitle),
    metaDescription: toSafeString(merged.metaDescription, defaultBrandConfig.metaDescription),
    ogTitle: toSafeString(merged.ogTitle, defaultBrandConfig.ogTitle),
    ogDescription: toSafeString(merged.ogDescription, defaultBrandConfig.ogDescription),
    ogSiteName: toSafeString(merged.ogSiteName, defaultBrandConfig.ogSiteName),
    ogImageUrl: toSafeString(merged.ogImageUrl, defaultBrandConfig.ogImageUrl),
    ogImageAlt: toSafeString(merged.ogImageAlt, defaultBrandConfig.ogImageAlt),
    ogLocale: toSafeString(merged.ogLocale, defaultBrandConfig.ogLocale),
    twitterCard: toSafeString(merged.twitterCard, defaultBrandConfig.twitterCard),
  };
}
