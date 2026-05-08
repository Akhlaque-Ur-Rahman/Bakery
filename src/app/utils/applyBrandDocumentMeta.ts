import type { BrandConfig } from '../brand/types';
import { getFullBrandName } from '../brand/types';

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLinkRel(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function resolveOgImage(config: BrandConfig, fallbackImageHref: string): string {
  const url = config.ogImageUrl?.trim();
  if (url) return url;
  if (config.logoDataUrl) return config.logoDataUrl;
  return fallbackImageHref;
}

export function applyBrandDocumentMeta(config: BrandConfig, fallbackImageHref: string): void {
  const full = getFullBrandName(config);
  document.title = config.documentTitle || full;

  setMetaName('description', config.metaDescription);

  setMetaProperty('og:type', 'website');
  setMetaProperty('og:site_name', config.ogSiteName || full);
  setMetaProperty('og:title', config.ogTitle || config.documentTitle);
  setMetaProperty('og:description', config.ogDescription || config.metaDescription);
  const ogImage = resolveOgImage(config, fallbackImageHref);
  setMetaProperty('og:image', ogImage);
  setMetaProperty('og:image:width', '512');
  setMetaProperty('og:image:height', '512');
  setMetaProperty('og:image:alt', config.ogImageAlt || full);
  setMetaProperty('og:locale', config.ogLocale || 'en_IN');

  const twitterCard = config.twitterCard || 'summary';
  setMetaName('twitter:card', twitterCard);
  setMetaName('twitter:title', config.ogTitle || config.documentTitle);
  setMetaName('twitter:description', config.ogDescription || config.metaDescription);
  setMetaName('twitter:image', ogImage);

  setLinkRel('icon', ogImage);
}
