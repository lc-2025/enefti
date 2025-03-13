import React, { Suspense } from 'react';

/**
 * @description Skeleton placeholder
 * @author Luca Cattide
 * @date 13/03/2025
 * @param {{
 *   skeleton: React.ReactNode;
 *   children: React.ReactNode;
 * }} {
 *   skeleton,
 *   children,
 * }
 * @returns {*}  {React.ReactNode}
 */
const Skeleton = ({
  placeholder,
  children,
}: {
  placeholder: React.ReactNode;
  children: React.ReactNode;
}): React.ReactNode => {
  return <Suspense fallback={placeholder}>{children}</Suspense>;
};

export default Skeleton;
