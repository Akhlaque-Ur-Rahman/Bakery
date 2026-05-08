import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Search, ShoppingCart, Heart, User, Menu, X, ShieldCheck, Clock3 } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
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
  const prefersReducedMotion = useReducedMotion();
  const scrollLockStylesRef = useRef<{
    bodyOverflow: string;
    bodyPaddingRight: string;
    htmlOverflow: string;
  } | null>(null);
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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (mobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - html.clientWidth;
      scrollLockStylesRef.current = {
        bodyOverflow: body.style.overflow,
        bodyPaddingRight: body.style.paddingRight,
        htmlOverflow: html.style.overflow,
      };

      body.style.overflow = 'hidden';
      body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : body.style.paddingRight;
      html.style.overflow = 'hidden';
      return;
    }

    if (scrollLockStylesRef.current) {
      body.style.overflow = scrollLockStylesRef.current.bodyOverflow;
      body.style.paddingRight = scrollLockStylesRef.current.bodyPaddingRight;
      html.style.overflow = scrollLockStylesRef.current.htmlOverflow;
      scrollLockStylesRef.current = null;
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    return () => {
      const body = document.body;
      const html = document.documentElement;
      if (scrollLockStylesRef.current) {
        body.style.overflow = scrollLockStylesRef.current.bodyOverflow;
        body.style.paddingRight = scrollLockStylesRef.current.bodyPaddingRight;
        html.style.overflow = scrollLockStylesRef.current.htmlOverflow;
      }
    };
  }, []);

  const handleSearchResultClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const overlayTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.26, ease: [0.22, 1, 0.36, 1] as const };

  const drawerTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: 'spring' as const, stiffness: 250, damping: 32, mass: 0.95 };

  const overlayVariants = {
    closed: prefersReducedMotion ? { opacity: 1 } : { opacity: 0 },
    open: { opacity: 1 },
  };

  const drawerVariants = {
    closed: prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.96, y: 16, scale: 0.985 },
    open: { opacity: 1, y: 0, scale: 1 },
  };

  const listContainerVariants = {
    closed: {},
    open: prefersReducedMotion
      ? {}
      : {
          transition: {
            staggerChildren: 0.045,
            delayChildren: 0.05,
          },
        },
  };

  const listItemVariants = {
    closed: prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 },
    open: { opacity: 1, x: 0, transition: { duration: prefersReducedMotion ? 0.01 : 0.24 } },
  };

  const footerVariants = {
    closed: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.26,
        delay: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  const mobileControlButtonClass =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white/95 shadow-sm transition-all duration-300 active:scale-95';
  const mobileControlIconClass = 'h-6 w-6';

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
                className={`md:hidden ${mobileControlButtonClass}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              >
                <motion.span
                  className="block"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileMenuOpen ? <X className={mobileControlIconClass} /> : <Menu className={mobileControlIconClass} />}
                </motion.span>
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

      </header>

      <AnimatePresence mode="sync">
        {mobileMenuOpen && (
          <div className="md:hidden">
            <motion.button
              type="button"
              aria-label="Close mobile menu overlay"
              onClick={() => setMobileMenuOpen(false)}
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={overlayTransition}
              className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[1px] will-change-[opacity]"
            />

            <motion.aside
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={drawerTransition}
              className="fixed inset-0 z-50 h-dvh w-screen overflow-hidden bg-[#0f1a18] shadow-2xl will-change-transform"
            >
              <div className="flex h-full flex-col">
                <div className="relative border-b border-white/10 bg-[#162522] px-4 py-3.5">
                  <div className="pr-14">
                    <p className="font-playfair text-lg text-[#f3efe8]">{brand.primaryName}</p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#d4af37]/80">
                      Signature Menu
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close mobile menu"
                    className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#223632] text-[#f6f2ea] shadow-sm transition-all duration-300 active:scale-95"
                  >
                    <motion.span
                      className="block"
                      initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
                      transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
                    >
                      <X className={mobileControlIconClass} />
                    </motion.span>
                  </button>
                </div>

                <motion.nav
                  className="flex-1 overflow-y-auto px-3 py-4"
                  variants={listContainerVariants}
                  initial="closed"
                  animate="open"
                >
                  <motion.ul className="space-y-1.5" variants={listContainerVariants}>
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.to;
                      return (
                        <motion.li
                          key={item.to}
                          variants={listItemVariants}
                        >
                          <motion.div
                            whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Link
                            to={item.to}
                            className={`block rounded-xl px-4 py-3.5 text-[15px] transition-all ${
                              isActive
                                ? 'bg-[#1f3732] text-[#f6f2ea] shadow-md shadow-black/30 ring-1 ring-[#d4af37]/40'
                                : 'text-[#e7dfd1] hover:bg-[#182b27] hover:text-[#f6f2ea]'
                            }`}
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </motion.nav>

                <motion.div
                  className="border-t border-white/10 bg-[#162522] px-3 py-3"
                  variants={footerVariants}
                  initial="closed"
                  animate="open"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <motion.div whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}>
                      <Link
                        to="/wishlist"
                        className="rounded-xl border border-white/20 bg-[#223632] px-3 py-3 text-sm text-[#e8dfd1] flex items-center justify-center gap-2 hover:border-[#d4af37]/60 hover:bg-[#29423d] transition-all duration-200"
                      >
                        <Heart className="w-4 h-4" />
                        Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                      </Link>
                    </motion.div>
                    <motion.div whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}>
                      <Link
                        to="/cart"
                        className="rounded-xl border border-[#d4af37]/35 bg-[#35574f] text-[#f6f2ea] px-3 py-3 text-sm flex items-center justify-center gap-2 hover:bg-[#40675e] transition-all duration-200"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Cart {cartCount > 0 && `(${cartCount})`}
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

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
