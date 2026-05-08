import React from 'react';
import { Link } from 'react-router';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useBrand } from '../context/BrandContext';

export const Footer: React.FC = () => {
  const { brand, fullBrandName, logoSrc } = useBrand();

  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logoSrc}
                alt={fullBrandName}
                className="h-11 w-11 object-contain shrink-0"
              />
              <h3 className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-elegant text-xl tracking-wide">{brand.primaryName}</span>
                <span className="font-playfair text-sm tracking-widest uppercase opacity-90">
                  {brand.secondaryName}
                </span>
              </h3>
            </div>
            <p className="text-sm opacity-90 mb-4">
              {brand.footerLine1} {brand.footerLine2}
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-accent transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-accent transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-accent transition-colors">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link to="/category/cookies" className="hover:text-accent transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link to="/category/biscuits" className="hover:text-accent transition-colors">
                  Biscuits
                </Link>
              </li>
              <li>
                <Link to="/category/rusk" className="hover:text-accent transition-colors">
                  Rusk & Nanroti
                </Link>
              </li>
              <li>
                <Link to="/category/cakes" className="hover:text-accent transition-colors">
                  Cakes
                </Link>
              </li>
              <li>
                <Link to="/category/breads" className="hover:text-accent transition-colors">
                  Breads
                </Link>
              </li>
              <li>
                <Link to="/category/snacks" className="hover:text-accent transition-colors">
                  Snacks
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm opacity-90 mb-6">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{brand.addressSingleLine}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="whitespace-pre-line">{brand.phoneBlock}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="whitespace-pre-line">{brand.emailBlock}</span>
              </li>
            </ul>
            <div>
              <h4 className="mb-2">Subscribe to Newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button variant="secondary" size="sm" className="bg-accent text-accent-foreground">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm opacity-90">
          <p>
            © {new Date().getFullYear()} {fullBrandName}. All rights reserved.{brand.copyrightExtra}
          </p>
        </div>
      </div>
    </footer>
  );
};
