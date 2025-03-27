import React from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

/**
 * @description Back to top
 * @author Luca Cattide
 * @date 27/03/2025
 * @returns {*}  {React.ReactNode}
 */
const Back = (): React.ReactNode => {
  // Handlers
  /**
   * @description Back to top handler
   * Scrolls the page to the top
   * @author Luca Cattide
   * @date 27/03/2025
   */
  const handleScroll = (): void => {
    window.scrollTo(0, 0);
  };
  // TODO: Add state to hide
  return (
    /* Back to top Start */
    <aside
      className="back group fixed right-6 bottom-6 z-40 cursor-pointer rounded-full bg-(--accent-cyan) p-6 font-bold text-(--text-primary) transition duration-200 ease-linear hover:bg-(--accent-purple) hover:text-white"
      onClick={handleScroll}
    >
      <h2 className="back__title hidden">Back to top</h2>
      <ChevronUpIcon className="back__icon size-6" />
    </aside>
    /* Back to top End */
  );
};

export default Back;
