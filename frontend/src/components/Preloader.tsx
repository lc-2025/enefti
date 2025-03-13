import React, { Suspense } from 'react';
import { PreloadQuery } from '@/apollo';

/**
 * @description Query preloader
 * @author Luca Cattide
 * @date 13/03/2025
 * @param {{
 *   query: any;
 *   children: React.ReactNode;
 * }} {
 *   query,
 *   children,
 * }
 * @returns {*}  {React.ReactNode}
 */
const Preloader = ({
  query,
  children,
}: {
  query: any;
  children: React.ReactNode;
}): React.ReactNode => {
  return (
    <PreloadQuery query={query}>
      <Suspense fallback={<>Loading...</>}>{children}</Suspense>
    </PreloadQuery>
  );
};

export default Preloader;
