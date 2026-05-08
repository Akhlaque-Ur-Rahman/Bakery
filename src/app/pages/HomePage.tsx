import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { categories, getBestSellers, getTodaysDeals, getNewArrivals } from '../data/products';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const heroSlides = [
  {
    title: 'Fresh Luxury Bakes Delivered Daily',
    subtitle: 'Bismah Bakery Signature Collection',
    description: 'Handcrafted with premium ingredients and trusted by thousands of families.',
    cta: 'Shop Best Sellers',
    ctaLink: '/category/cookies',
    secondaryCta: 'View Fresh Collection',
    secondaryCtaLink: '/category/breads',
    urgencyBadge: 'Freshly Baked Today',
    bgColor: 'from-primary to-primary/80',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200',
  },
  {
    title: 'Up to 30% Off on Daily Favorites',
    subtitle: "Today's Limited-Time Offers",
    description: 'Save more on customer-loved cookies, cakes, breads and snacks.',
    cta: 'Grab Deals',
    ctaLink: '/category/cookies',
    secondaryCta: 'View Fresh Collection',
    secondaryCtaLink: '/category/snacks',
    urgencyBadge: 'Offer Ends Tonight',
    bgColor: 'from-accent to-accent/80',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200',
  },
  {
    title: 'Order Early, Enjoy Same-Day Delivery',
    subtitle: 'Fresh Breads & Tea-Time Essentials',
    description: 'Place your order early and get your favorites baked and delivered the same day.',
    cta: 'Order Fresh Now',
    ctaLink: '/category/breads',
    secondaryCta: 'View Fresh Collection',
    secondaryCtaLink: '/category/rusk',
    urgencyBadge: 'Delivery Slots Filling Fast',
    bgColor: 'from-primary to-primary/80',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=1200',
  },
];

const testimonials = [
  {
    name: 'Ayesha Khan',
    rating: 5,
    comment: 'Best bakery in Patna! Their cookies are absolutely delicious.',
    avatar: 'https://ui-avatars.com/api/?name=Ayesha+Khan&size=150&background=0B3D2E&color=fff',
  },
  {
    name: 'Rahul Sharma',
    rating: 5,
    comment: 'Fresh products delivered on time. Highly recommended!',
    avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&size=150&background=0B3D2E&color=fff',
  },
  {
    name: 'Fatima Ahmed',
    rating: 5,
    comment: 'The cakes are amazing! Perfect for every celebration.',
    avatar: 'https://ui-avatars.com/api/?name=Fatima+Ahmed&size=150&background=0B3D2E&color=fff',
  },
  {
    name: 'Amit Kumar',
    rating: 5,
    comment: 'Quality products at reasonable prices. Very satisfied!',
    avatar: 'https://ui-avatars.com/api/?name=Amit+Kumar&size=150&background=0B3D2E&color=fff',
  },
];

export const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bestSellers = getBestSellers();
  const todaysDeals = getTodaysDeals();
  const newArrivals = getNewArrivals();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[620px] md:h-[680px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].bgColor}`}
          >
            <div className="absolute inset-0">
              <ImageWithFallback
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover opacity-35"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/45 to-transparent" />
            <div className="relative container mx-auto h-full px-5 sm:px-6 md:px-8 py-10 flex items-center">
              <div className="max-w-3xl text-white pt-2 sm:pt-3 md:pt-4 lg:pt-5 mx-auto text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="inline-flex items-center rounded-full border border-white/35 bg-black/25 backdrop-blur-sm px-4 py-1.5 mb-4 text-xs uppercase tracking-[0.18em] text-white/95"
                >
                  {heroSlides[currentSlide].urgencyBadge}
                </motion.div>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl mb-3 font-script text-accent/95"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl font-playfair mb-5 leading-tight"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
                >
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 h-12">
                    <Link to={heroSlides[currentSlide].ctaLink}>{heroSlides[currentSlide].cta}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-12 border-white/70 text-white bg-white/10 hover:bg-white/20 hover:text-white">
                    <Link to={heroSlides[currentSlide].secondaryCtaLink}>
                      {heroSlides[currentSlide].secondaryCta}
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-7 flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs sm:text-sm md:text-base text-white/95"
                >
                  <span className="rounded-full border border-white/25 bg-black/20 px-3 py-1">
                    4.8/5 Rated by 5,000+ Customers
                  </span>
                  <span className="rounded-full border border-white/25 bg-black/20 px-3 py-1">
                    100% Freshness Guarantee
                  </span>
                  <span className="rounded-full border border-white/25 bg-black/20 px-3 py-1">
                    Secure COD & Online Payments
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          aria-label="Previous hero slide"
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/85 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next hero slide"
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/85 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/20 border border-white/20 rounded-full px-3 py-2 backdrop-blur-sm">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to hero slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === currentSlide ? 'bg-accent w-10' : 'bg-white/55 w-2.5'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <p className="uppercase tracking-[0.2em] text-xs text-primary/70 mb-2">Explore Luxury Range</p>
          <h2 className="text-3xl font-playfair">Shop by Category</h2>
          <p className="text-muted-foreground mt-2">
            Pick your favorite, add to cart in seconds, and enjoy fresh delivery.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border border-border/70 rounded-xl p-6 text-center hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <h3 className="mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} items</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-playfair mb-2">Today's Best Deals</h2>
              <p className="text-muted-foreground">
                Limited-time offers ending soon - order now before stocks run out.
              </p>
            </div>
            <Link to="/category/cookies">
              <Button variant="outline" className="rounded-full px-6">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {todaysDeals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-playfair mb-2">Best Sellers</h2>
            <p className="text-muted-foreground">
              Most loved by our customers for taste, freshness and quality.
            </p>
          </div>
          <Link to="/category/cookies">
            <Button variant="outline" className="rounded-full px-6">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-playfair mb-2">New Arrivals</h2>
                <p className="text-muted-foreground">Check out our latest products</p>
              </div>
              <Link to="/category/cookies">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-playfair mb-8 text-center">Why Choose Us</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">🎂</div>
            <h3 className="mb-2">Premium Quality</h3>
            <p className="text-sm text-muted-foreground">
              Only the finest ingredients used in all our products
            </p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="mb-2">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Same-day delivery available across Patna
            </p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">💯</div>
            <h3 className="mb-2">100% Fresh</h3>
            <p className="text-sm text-muted-foreground">
              Baked daily with love and care
            </p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="mb-2">Best Prices</h3>
            <p className="text-sm text-muted-foreground">
              Competitive prices without compromising quality
            </p>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair mb-8 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm opacity-90">{testimonial.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-secondary rounded-lg p-8 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-playfair mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for exclusive deals and new product launches
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-primary text-primary-foreground">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
