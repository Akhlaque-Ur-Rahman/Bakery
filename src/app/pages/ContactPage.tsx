import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useBrand } from '../context/BrandContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';

export const ContactPage: React.FC = () => {
  const { brand, fullBrandName } = useBrand();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-playfair mb-4">Contact Us</h1>
          <p className="text-2xl md:text-3xl max-w-2xl mx-auto opacity-90 font-script">
            We'd love to hear from you
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-playfair mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" required />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" />
              </div>
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" required />
              </div>
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea id="message" rows={5} required />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-playfair mb-6">Contact Information</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2">Address</h3>
                    <p className="text-muted-foreground">
                      {fullBrandName}
                      <br />
                      {brand.contactAddressLine2}
                      <br />
                      {brand.contactAddressLine3}
                      <br />
                      {brand.contactCountry}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2">Phone</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{brand.phoneBlock}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2">Email</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{brand.emailBlock}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2">Working Hours</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{brand.workingHoursBlock}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <h2 className="text-3xl font-playfair mb-6 text-center">Find Us on Map</h2>
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">{brand.mapEmbedCaption}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
