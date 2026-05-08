import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Search, ShoppingCart, Heart, User, Menu, X, ShieldCheck, Clock3 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useBrand } from '../context/BrandContext';
import { products } from '../data/products';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const Header: React.FC = () => {
  const { brand, fullBrandName, logoSrc } = useBrand();
  const { getCartCount, wishlist } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const cartCount = getCartCount();

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Cookies', to: '/category/cookies' },
    { label: 'Biscuits', to: '/category/biscuits' },
    { label: 'Rusk & Nanroti', to: '/category/rusk' },
    { label: 'Cakes', to: '/category/cakes' },
    { label: 'Breads', to: '/category/breads' },
    { label: 'Snacks', to: '/category/snacks' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = products.filter(
        p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.slice(0, 6));
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleSearchResultClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? 'shadow-lg shadow-black/10' : 'shadow-sm'
        }`}
      >
        <div className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-2.5">
            <p className="text-center text-xs sm:text-sm tracking-wide">
              Freshly baked daily | Free delivery above Rs 500 | Trusted by 10,000+ happy families
            </p>
          </div>
        </div>

        <div className="border-b border-border/70">
          <div className="container mx-auto px-4 py-3.5">
            <div className="flex items-center justify-between gap-4">
              <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                <img
                  src={logoSrc}
                  alt={fullBrandName}
                  className="h-14 w-14 object-contain shrink-0 drop-shadow-sm"
                />
                <div className="hidden md:block">
                  <h1 className="font-elegant text-2xl text-primary leading-tight tracking-wider">
                    {brand.primaryName}
                  </h1>
                  <p className="font-playfair text-xs tracking-[0.24em] uppercase text-accent">
                    {brand.secondaryName}
                  </p>
                </div>
              </Link>

              <div className="flex-1 max-w-2xl relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search premium cookies, cakes, breads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowSearchResults(true)}
                    className="pl-10 pr-4 py-2.5 w-full border border-border/80 bg-white rounded-full focus-visible:ring-primary/20 focus-visible:ring-4"
                  />
                </div>

                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-96 overflow-y-auto z-50">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSearchResultClick(product.id)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-secondary transition-colors text-left"
                      >
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm">{product.name}</p>
                          <p className="text-sm text-muted-foreground">₹{product.price}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLoginModal(true)}
                  className="flex flex-col items-center gap-1 h-auto py-2 rounded-xl hover:bg-secondary"
                >
                  <User className="w-5 h-5" />
                  <span className="text-xs">Login</span>
                </Button>

                <Link to="/wishlist">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-2 relative rounded-xl hover:bg-secondary"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-xs">Wishlist</span>
                    {wishlist.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
                        {wishlist.length}
                      </Badge>
                    )}
                  </Button>
                </Link>

                <Link to="/cart">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-2 relative rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="text-xs">Cart</span>
                    {cartCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center px-1 bg-accent text-accent-foreground">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>

              <button
                className="md:hidden p-2 rounded-lg border border-border/70"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block border-b bg-secondary/70">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between gap-4 py-2.5">
              <div className="flex items-center gap-5">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`text-sm tracking-wide transition-colors ${
                        isActive ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 text-xs text-foreground/70">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  100% Fresh Guarantee
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="w-3.5 h-3.5 text-accent" />
                  Same Day Delivery
                </span>
              </div>
            </nav>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white shadow-lg">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="px-4 py-3 hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t mt-2 pt-2">
                <Link
                  to="/wishlist"
                  className="px-4 py-3 hover:bg-secondary flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                </Link>
                <Link
                  to="/cart"
                  className="px-4 py-3 hover:bg-secondary flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Login / Sign Up</h2>
              <button onClick={() => setShowLoginModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <Input type="email" placeholder="Email or Phone Number" />
              <Input type="password" placeholder="Password" />
              <Button className="w-full bg-primary text-primary-foreground">Continue Securely</Button>
              <p className="text-sm text-center text-muted-foreground">
                New customer?{' '}
                <button className="text-primary hover:underline">Create an account</button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
