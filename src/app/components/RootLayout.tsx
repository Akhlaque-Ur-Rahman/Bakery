import React from 'react';
import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingCart } from './FloatingCart';
import { ScrollToTop } from './ScrollToTop';
export const RootLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <FloatingCart />
      <ScrollToTop />
    </>
  );
};