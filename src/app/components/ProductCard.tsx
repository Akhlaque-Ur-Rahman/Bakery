import React, { useState } from 'react';
import { Link } from 'react-router';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const [isQuickView, setIsQuickView] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        className="group relative"
      >
        <Link to={`/product/${product.id}`}>
          <div className="bg-white border border-border/70 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.discount && (
                  <Badge className="bg-accent text-accent-foreground shadow-sm">
                    {product.discount}% OFF
                  </Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-primary text-primary-foreground shadow-sm">NEW</Badge>
                )}
                {product.isBestSeller && (
                  <Badge variant="secondary" className="shadow-sm">BESTSELLER</Badge>
                )}
              </div>

              <button
                onClick={handleWishlistToggle}
                className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent hover:text-white"
              >
                <Heart
                  className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`}
                />
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsQuickView(true);
                }}
                className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-white"
              >
                <Eye className="w-4 h-4" />
              </button>

              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white px-4 py-2 bg-destructive rounded">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  {product.rating}
                </div>
                <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <h3 className="text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xl text-primary font-semibold">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-3">Freshly baked | Fast delivery available</p>

              {product.inStock && (
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart Now
                </Button>
              )}
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Quick View Modal */}
      {isQuickView && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsQuickView(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div>
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-lg aspect-square object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl mb-2">{product.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center bg-primary text-primary-foreground px-2 py-1 rounded">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {product.rating}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.reviews} reviews
                  </span>
                </div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl text-primary">₹{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{product.originalPrice}
                      </span>
                      <Badge className="bg-accent text-accent-foreground">
                        {product.discount}% OFF
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-6">{product.description}</p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-primary-foreground"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Link to={`/product/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};
