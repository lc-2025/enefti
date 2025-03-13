import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata, Viewport } from 'next';
import '../scss/global.scss';
import '../css/globals.css';

export const metadata: Metadata = {
  title: 'eNefti',
  description: 'NFTs E-Commerce demo',
};

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
};

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
    <html lang="en">
      {/* Content-Security Policy (vs. XSS) */}
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self' localhost:3000; script-src 'self' 'unsafe-inline'; style-src 'self' fonts.googleapis.com 'unsafe-inline'; img-src 'self'; connect-src 'self' localhost:3000; font-src 'self' fonts.googleapis.com fonts.gstatic.com; form-action 'self';"
      />
      {/* Browser rendering version support (retro-compatibility) */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      {/* TODO: Favicon */}
      <body className={`antialiased`}>
        {/* JS fallback */}
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Header />
        {/* Container Start */}
        <main className="container">
          <div className="wrapper">{children}</div>
        </main>
        {/* Container End */}
        <Footer />
      </body>
    </html>
    // HTML End
  );
}
