import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        {/* Top Banner */}
        <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm">
          <p>Free delivery on orders above ₹500 | Cash on Delivery Available</p>
        </div>

        {/* Main Header */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                <img
                  src={logoSrc}
                  alt={fullBrandName}
                  className="h-14 w-14 object-contain shrink-0"
                />
                <div className="hidden md:block">
                  <h1 className="font-elegant text-2xl text-primary leading-tight tracking-wide">
                    {brand.primaryName}
                  </h1>
                  <p className="font-playfair text-xs tracking-widest uppercase text-accent">
                    {brand.secondaryName}
                  </p>
                </div>
              </Link>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for cookies, cakes, breads and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowSearchResults(true)}
                    className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-primary"
                  />
                </div>

                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSearchResultClick(product.id)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
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

              {/* Desktop Icons */}
              <div className="hidden md:flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLoginModal(true)}
                  className="flex flex-col items-center gap-1 h-auto py-2"
                >
                  <User className="w-5 h-5" />
                  <span className="text-xs">Login</span>
                </Button>

                <Link to="/wishlist">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-2 relative"
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
                    variant="ghost"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-2 relative"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="text-xs">Cart</span>
                    {getCartCount() > 0 && (
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
                        {getCartCount()}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden md:block border-b bg-secondary">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-6 py-3">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/category/cookies" className="hover:text-primary transition-colors">
                Cookies
              </Link>
              <Link to="/category/biscuits" className="hover:text-primary transition-colors">
                Biscuits
              </Link>
              <Link to="/category/rusk" className="hover:text-primary transition-colors">
                Rusk & Nanroti
              </Link>
              <Link to="/category/cakes" className="hover:text-primary transition-colors">
                Cakes
              </Link>
              <Link to="/category/breads" className="hover:text-primary transition-colors">
                Breads
              </Link>
              <Link to="/category/snacks" className="hover:text-primary transition-colors">
                Snacks
              </Link>
              <Link to="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="flex flex-col py-4">
              <Link
                to="/"
                className="px-4 py-3 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/category/cookies"
                className="px-4 py-3 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cookies
              </Link>
              <Link
                to="/category/biscuits"
                className="px-4 py-3 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Biscuits
              </Link>
              <Link
                to="/category/rusk"
                className="px-4 py-3 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rusk & Nanroti
              </Link>
              <Link
                to="/category/cakes"
                className="px-4 py-3 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cakes
              </Link>
              <Link
                to="/category/breads"
                className="px-4 py-3 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Breads
              </Link>
              <Link
                to="/category/snacks"
                className="px-4 py-3 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Snacks
              </Link>
              <div className="border-t mt-2 pt-2">
                <Link
                  to="/wishlist"
                  className="px-4 py-3 hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                </Link>
                <Link
                  to="/cart"
                  className="px-4 py-3 hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart {getCartCount() > 0 && `(${getCartCount()})`}
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
            className="bg-white rounded-lg p-6 max-w-md w-full"
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
              <Button className="w-full bg-primary text-primary-foreground">Login</Button>
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
