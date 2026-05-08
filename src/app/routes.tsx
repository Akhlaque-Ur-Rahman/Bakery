import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ProfilePage } from './pages/ProfilePage';
import { DevBrandSettingsPage } from './pages/DevBrandSettingsPage';
import { RootLayout } from './components/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/dev/brand-settings',
    Component: DevBrandSettingsPage,
  },
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'category/:categoryId', Component: CategoryPage },
      { path: 'product/:productId', Component: ProductDetailPage },
      { path: 'cart', Component: CartPage },
      { path: 'checkout', Component: CheckoutPage },
      { path: 'wishlist', Component: WishlistPage },
      { path: 'about', Component: AboutPage },
      { path: 'contact', Component: ContactPage },
      { path: 'profile', Component: ProfilePage },
    ],
  },
]);
