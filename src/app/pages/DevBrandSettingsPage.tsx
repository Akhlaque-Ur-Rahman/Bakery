import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { useBrand } from '../context/BrandContext';
import type { BrandConfig } from '../brand/types';
import { resizeImageFileToDataUrl } from '../utils/resizeImageToDataUrl';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import defaultLogoUrl from '@/assets/alhamdulillah_bakery_logo-removebg-preview.png';

function cloneBrand(b: BrandConfig): BrandConfig {
  return { ...b };
}

function sanitizeBrandConfig(input: BrandConfig): BrandConfig {
  return {
    ...input,
    primaryName: input.primaryName.trim(),
    secondaryName: input.secondaryName.trim(),
    taglineAboutHero: input.taglineAboutHero.trim(),
    footerLine1: input.footerLine1.trim(),
    footerLine2: input.footerLine2.trim(),
    addressSingleLine: input.addressSingleLine.trim(),
    contactAddressLine2: input.contactAddressLine2.trim(),
    contactAddressLine3: input.contactAddressLine3.trim(),
    contactCountry: input.contactCountry.trim(),
    phoneBlock: input.phoneBlock.trim(),
    emailBlock: input.emailBlock.trim(),
    workingHoursBlock: input.workingHoursBlock.trim(),
    mapEmbedCaption: input.mapEmbedCaption.trim(),
    aboutParagraph1: input.aboutParagraph1.trim(),
    aboutParagraph2: input.aboutParagraph2.trim(),
    aboutParagraph3: input.aboutParagraph3.trim(),
    aboutMission: input.aboutMission.trim(),
    copyrightExtra: input.copyrightExtra,
    documentTitle: input.documentTitle.trim(),
    metaDescription: input.metaDescription.trim(),
    ogTitle: input.ogTitle.trim(),
    ogDescription: input.ogDescription.trim(),
    ogSiteName: input.ogSiteName.trim(),
    ogImageUrl: input.ogImageUrl.trim(),
    ogImageAlt: input.ogImageAlt.trim(),
    ogLocale: input.ogLocale.trim(),
    twitterCard: input.twitterCard.trim(),
  };
}

export const DevBrandSettingsPage: React.FC = () => {
  const { brand, setBrand, resetBrand } = useBrand();
  const [draft, setDraft] = useState(() => cloneBrand(brand));
  const [uploadBusy, setUploadBusy] = useState(false);

  useEffect(() => {
    setDraft(cloneBrand(brand));
  }, [brand]);

  const ogImageWarning = useMemo(() => {
    const hasHosted = Boolean(draft.ogImageUrl?.trim());
    const hasDataLogo = Boolean(draft.logoDataUrl);
    return !hasHosted && hasDataLogo;
  }, [draft.ogImageUrl, draft.logoDataUrl]);

  const update = <K extends keyof BrandConfig>(key: K, value: BrandConfig[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
  };

  const handleLogoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please choose an image file.');
      return;
    }
    setUploadBusy(true);
    try {
      const dataUrl = await resizeImageFileToDataUrl(file, 512);
      update('logoDataUrl', dataUrl);
      toast.success('Logo processed. Save to persist.');
    } catch {
      toast.error('Could not read that image.');
    } finally {
      setUploadBusy(false);
    }
  };

  const handleSave = () => {
    const next = sanitizeBrandConfig(cloneBrand(draft));
    if (!next.primaryName && !next.secondaryName) {
      toast.error('At least one brand name line is required.');
      return;
    }
    setDraft(next);
    setBrand(next);
    toast.success('Brand settings saved.');
  };

  const handleReset = () => {
    resetBrand();
    toast.info('Reset to defaults.');
  };

  const handleClearLogo = () => {
    update('logoDataUrl', null);
  };

  return (
    <div className="min-h-screen bg-muted/40 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-playfair font-semibold">Brand settings (developer)</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Hidden route — not linked from the storefront. Changes are stored in{' '}
              <code className="text-xs bg-muted px-1 rounded">localStorage</code>.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/">Back to site</Link>
          </Button>
        </div>

        {ogImageWarning && (
          <Alert>
            <AlertTitle>Open Graph image</AlertTitle>
            <AlertDescription>
              Uploaded logos use a data URL. Many social crawlers need a public HTTPS URL for{' '}
              <code className="text-xs">og:image</code>. Set “OG image URL” below for production sharing.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Identity</CardTitle>
            <CardDescription>Header, footer, and alt text use these names.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="primaryName">Primary name</Label>
              <Input
                id="primaryName"
                value={draft.primaryName}
                onChange={(e) => update('primaryName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryName">Secondary line (e.g. category)</Label>
              <Input
                id="secondaryName"
                value={draft.secondaryName}
                onChange={(e) => update('secondaryName', e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="taglineAboutHero">About page hero tagline</Label>
              <Input
                id="taglineAboutHero"
                value={draft.taglineAboutHero}
                onChange={(e) => update('taglineAboutHero', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logo</CardTitle>
            <CardDescription>PNG/JPEG recommended. Resized to max width 512px before storing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={draft.logoDataUrl || defaultLogoUrl}
                alt="Preview"
                className="h-16 w-16 object-contain border rounded bg-white"
              />
              <div className="flex flex-wrap gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  className="max-w-xs cursor-pointer"
                  disabled={uploadBusy}
                  onChange={handleLogoFile}
                />
                <Button type="button" variant="outline" size="sm" onClick={handleClearLogo}>
                  Clear uploaded logo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Footer &amp; contact</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="footerLine1">Footer paragraph line 1</Label>
              <Textarea
                id="footerLine1"
                rows={2}
                value={draft.footerLine1}
                onChange={(e) => update('footerLine1', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="footerLine2">Footer paragraph line 2</Label>
              <Textarea
                id="footerLine2"
                rows={2}
                value={draft.footerLine2}
                onChange={(e) => update('footerLine2', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressSingleLine">Address (single line — footer / visit us)</Label>
              <Input
                id="addressSingleLine"
                value={draft.addressSingleLine}
                onChange={(e) => update('addressSingleLine', e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contactAddressLine2">Contact card — line 2</Label>
                <Input
                  id="contactAddressLine2"
                  value={draft.contactAddressLine2}
                  onChange={(e) => update('contactAddressLine2', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactAddressLine3">Contact card — line 3</Label>
                <Input
                  id="contactAddressLine3"
                  value={draft.contactAddressLine3}
                  onChange={(e) => update('contactAddressLine3', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactCountry">Contact card — country</Label>
              <Input
                id="contactCountry"
                value={draft.contactCountry}
                onChange={(e) => update('contactCountry', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneBlock">Phone numbers (one per line)</Label>
              <Textarea
                id="phoneBlock"
                rows={2}
                value={draft.phoneBlock}
                onChange={(e) => update('phoneBlock', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailBlock">Emails (one per line)</Label>
              <Textarea
                id="emailBlock"
                rows={2}
                value={draft.emailBlock}
                onChange={(e) => update('emailBlock', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workingHoursBlock">Working hours (one per line)</Label>
              <Textarea
                id="workingHoursBlock"
                rows={3}
                value={draft.workingHoursBlock}
                onChange={(e) => update('workingHoursBlock', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mapEmbedCaption">Map section caption</Label>
              <Input
                id="mapEmbedCaption"
                value={draft.mapEmbedCaption}
                onChange={(e) => update('mapEmbedCaption', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="copyrightExtra">Copyright suffix (after year &amp; name)</Label>
              <Input
                id="copyrightExtra"
                value={draft.copyrightExtra}
                onChange={(e) => update('copyrightExtra', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About page copy</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="aboutParagraph1">Story paragraph 1</Label>
              <Textarea
                id="aboutParagraph1"
                rows={4}
                value={draft.aboutParagraph1}
                onChange={(e) => update('aboutParagraph1', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutParagraph2">Story paragraph 2</Label>
              <Textarea
                id="aboutParagraph2"
                rows={4}
                value={draft.aboutParagraph2}
                onChange={(e) => update('aboutParagraph2', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutParagraph3">Story paragraph 3</Label>
              <Textarea
                id="aboutParagraph3"
                rows={3}
                value={draft.aboutParagraph3}
                onChange={(e) => update('aboutParagraph3', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutMission">Mission</Label>
              <Textarea
                id="aboutMission"
                rows={4}
                value={draft.aboutMission}
                onChange={(e) => update('aboutMission', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO &amp; Open Graph</CardTitle>
            <CardDescription>Applied to the document at runtime (SPA caveat for crawlers).</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="documentTitle">{'<title>'}</Label>
              <Input
                id="documentTitle"
                value={draft.documentTitle}
                onChange={(e) => update('documentTitle', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta description</Label>
              <Textarea
                id="metaDescription"
                rows={3}
                value={draft.metaDescription}
                onChange={(e) => update('metaDescription', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogSiteName">og:site_name</Label>
              <Input
                id="ogSiteName"
                value={draft.ogSiteName}
                onChange={(e) => update('ogSiteName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogTitle">og:title / twitter:title</Label>
              <Input id="ogTitle" value={draft.ogTitle} onChange={(e) => update('ogTitle', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogDescription">og:description / twitter:description</Label>
              <Textarea
                id="ogDescription"
                rows={3}
                value={draft.ogDescription}
                onChange={(e) => update('ogDescription', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogImageUrl">OG image URL (absolute HTTPS for sharing)</Label>
              <Input
                id="ogImageUrl"
                placeholder="https://example.com/og.png"
                value={draft.ogImageUrl}
                onChange={(e) => update('ogImageUrl', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogImageAlt">og:image:alt</Label>
              <Input
                id="ogImageAlt"
                value={draft.ogImageAlt}
                onChange={(e) => update('ogImageAlt', e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ogLocale">og:locale</Label>
                <Input
                  id="ogLocale"
                  value={draft.ogLocale}
                  onChange={(e) => update('ogLocale', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitterCard">twitter:card</Label>
                <Input
                  id="twitterCard"
                  value={draft.twitterCard}
                  onChange={(e) => update('twitterCard', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3 pb-10">
          <Button type="button" onClick={handleSave}>
            Save
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset to defaults
          </Button>
        </div>
      </div>
    </div>
  );
};
