import React from 'react';
import StoreProvider from '@/components/StoreProvider';
import { Poppins } from 'next/font/google';
import Header from '@/components/Header';
import { ApolloWrapper } from '@/apolloSsr';
import Footer from '@/components/Footer';
import type { Metadata, Viewport } from 'next';
import '../scss/global.scss';
import '../css/globals.css';

export const metadata: Metadata = {
  title: 'eNeFTi',
  description: 'NFTs E-Commerce demo',
};

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
};

export const poppins = Poppins({
  display: 'swap',
  variable: '--font-poppins',
  weight: '400',
});

/**
 * @description Main Layout
 * @author Luca Cattide
 * @date 13/03/2025
 * @export
 * @param {Readonly<{
 *   children: React.ReactNode;
 * }>} {
 *   children,
 * }
 * @returns {*}  {React.ReactNode}
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    // HTML Start
    // Localization
    <html lang="en">
      {/* Content-Security Policy (vs. XSS) */}
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self' localhost:4000 enefti-sha256.onrender.com; script-src 'self' 'unsafe-inline'; style-src 'self' fonts.googleapis.com 'unsafe-inline'; img-src 'self' coin-images.coingecko.com; connect-src 'self' localhost:4000 enefti-sha256.onrender.com; font-src 'self' fonts.googleapis.com fonts.gstatic.com; form-action 'self';"
      />
      {/* Browser rendering version support (retro-compatibility) */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      {/* Icons */}
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <link
        rel="apple-touch-icon"
        href="/apple-icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body className={`antialiased`}>
        {/* JS fallback */}
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <StoreProvider>
          <ApolloWrapper>
            <Header />
            {/* Container Start */}
            <main className="container max-w-full">
              <div className="container__wrapper">{children}</div>
            </main>
            {/* Container End */}
          </ApolloWrapper>
        </StoreProvider>
        <Footer />
      </body>
    </html>
    // HTML End
  );
}
