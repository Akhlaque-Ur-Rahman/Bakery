import React from 'react';
import { Award, Heart, Shield, Clock } from 'lucide-react';
import { Card } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useBrand } from '../context/BrandContext';

export const AboutPage: React.FC = () => {
  const { brand, fullBrandName } = useBrand();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-playfair mb-4">About {fullBrandName}</h1>
          <p className="text-2xl md:text-3xl max-w-2xl mx-auto opacity-90 font-script">
            {brand.taglineAboutHero}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800"
              alt={fullBrandName}
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-playfair mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>{brand.aboutParagraph1}</p>
              <p>{brand.aboutParagraph2}</p>
              <p>{brand.aboutParagraph3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-2">Quality First</h3>
              <p className="text-sm text-muted-foreground">
                We never compromise on the quality of our ingredients and products
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-2">Made with Love</h3>
              <p className="text-sm text-muted-foreground">
                Every product is crafted with care and attention to detail
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-2">Hygiene Standards</h3>
              <p className="text-sm text-muted-foreground">
                Maintaining the highest standards of cleanliness and safety
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-2">Freshness Guaranteed</h3>
              <p className="text-sm text-muted-foreground">
                All products are baked fresh daily for maximum taste
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-playfair mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8">{brand.aboutMission}</p>
        </div>
      </section>

      {/* Location */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair mb-6 text-center">Visit Us</h2>
          <p className="text-center text-muted-foreground mb-8">{brand.addressSingleLine}</p>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Map Location</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
