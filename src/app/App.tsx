import { RouterProvider } from 'react-router';
import { CartProvider } from './context/CartContext';
import { BrandProvider } from './context/BrandContext';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <CartProvider>
      <BrandProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </BrandProvider>
    </CartProvider>
  );
}
