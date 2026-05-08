import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { BrandConfig } from '../brand/types';
import { getFullBrandName } from '../brand/types';
import { BRAND_STORAGE_KEY, defaultBrandConfig, mergeBrandConfig } from '../brand/defaultBrand';
import { applyBrandDocumentMeta } from '../utils/applyBrandDocumentMeta';
import defaultLogoUrl from '@/assets/alhamdulillah_bakery_logo-removebg-preview.png';

function readStoredBrand(): BrandConfig {
  try {
    const raw = localStorage.getItem(BRAND_STORAGE_KEY);
    if (!raw) return mergeBrandConfig(null);
    const parsed = JSON.parse(raw) as Partial<BrandConfig>;
    return mergeBrandConfig(parsed);
  } catch {
    return mergeBrandConfig(null);
  }
}

type BrandContextValue = {
  brand: BrandConfig;
  fullBrandName: string;
  logoSrc: string;
  setBrand: (next: BrandConfig) => void;
  resetBrand: () => void;
};

const BrandContext = createContext<BrandContextValue | null>(null);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brand, setBrandState] = useState<BrandConfig>(() => readStoredBrand());

  useEffect(() => {
    applyBrandDocumentMeta(brand, defaultLogoUrl);
  }, [brand]);

  const setBrand = useCallback((next: BrandConfig) => {
    setBrandState(next);
    try {
      localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage full or disabled
    }
  }, []);

  const resetBrand = useCallback(() => {
    const fresh = { ...defaultBrandConfig };
    setBrandState(fresh);
    try {
      localStorage.removeItem(BRAND_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const fullBrandName = useMemo(() => getFullBrandName(brand), [brand.primaryName, brand.secondaryName]);

  const logoSrc = brand.logoDataUrl || defaultLogoUrl;

  const value = useMemo(
    () => ({
      brand,
      fullBrandName,
      logoSrc,
      setBrand,
      resetBrand,
    }),
    [brand, fullBrandName, logoSrc, setBrand, resetBrand]
  );

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
};

export function useBrand(): BrandContextValue {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error('useBrand must be used within BrandProvider');
  }
  return ctx;
}
