import React from 'react';
import Catalogue from '@/components/Catalogue/Catalogue';

/**
 * @description Index page
 * @author Luca Cattide
 * @date 13/03/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function Home(): React.ReactNode {
  return (
    // Catalogue
    <section className="catalogue">
      <Catalogue />
    </section>
    // Catalogue End
  );
}
