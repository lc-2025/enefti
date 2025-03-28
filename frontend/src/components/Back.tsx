import React, { useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '@/hooks/state';
import { setBack, selectTools } from '@/slices/tools';
import { TOOLS } from '@/utilities/constants';

/**
 * @description Back to top
 * @author Luca Cattide
 * @date 27/03/2025
 * @returns {*}  {React.ReactNode}
 */
const Back = (): React.ReactNode => {
  // Hooks
  const back = useAppSelector(selectTools);
  const dispatch = useAppDispatch();
  const { ACTION } = TOOLS.BACK;

  // Handlers
  /**
   * @description Back to top handler
   * Scrolls the page to the top
   * @author Luca Cattide
   * @date 27/03/2025
   */
  const handleScroll = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    dispatch(setBack(false));
  };

  /**
   * @description Back to top visibility handler
   * Sets button visibility based on page scroll
   * @author Luca Cattide
   * @date 28/03/2025
   */
  const handleBack = (): void => {
    dispatch(setBack(window.scrollY == 0 ? false : true));
  };

  useEffect(() => {
    window.addEventListener(ACTION, handleBack);

    return () => window.removeEventListener(ACTION, handleBack);
  }, []);

  return (
    /* Back to top Start */
    <aside
      className={`back btn btn-secondary fixed right-6 bottom-6 z-40 cursor-pointer p-6 ${!back && 'pointer-events-none opacity-0'}`}
      onClick={handleScroll}
    >
      <h2 className="back__title hidden">Back to top</h2>
      <ChevronUpIcon className="back__icon size-6" />
    </aside>
    /* Back to top End */
  );
};

export default Back;
