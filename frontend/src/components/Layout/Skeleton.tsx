import React from 'react';

/**
 * @description Skeleton placeholder
 * @author Luca Cattide
 * @date 13/03/2025
 * @returns {*}  {React.ReactNode}
 */
const Skeleton = (): React.ReactNode => {
  return (
    // Skeleton Start
    <aside className="skeleton flex h-dvh w-full flex-col items-center justify-center">
      <hgroup className="skeleton__titles">
        <h1 className="titles__title title mb-6">Loading...</h1>
        <h2 className="titles__subtitle">Please wait</h2>
      </hgroup>
    </aside>
    // Skeleton End
  );
};

export default Skeleton;
