import React from 'react';

/**
 * @description Custom Loading placeholder
 * @author Luca Cattide
 * @date 13/03/2025
 * @returns {*}  {React.ReactNode}
 */
const CustomLoading = (): React.ReactNode => {
  return (
    // Loading Start
    <aside className="loading flex flex-1 flex-col items-center justify-start">
      <hgroup className="loading__titles text-center">
        <h1 className="titles__title title mb-6">Loading...</h1>
        <h2 className="titles__subtitle">Cold start. Please wait</h2>
      </hgroup>
    </aside>
    // Loading End
  );
};

export default CustomLoading;
