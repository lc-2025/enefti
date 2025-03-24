import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

/**
 * @description Loading placeholder
 * @author Luca Cattide
 * @date 24/03/2025
 * @param {{
 *   icon: boolean;
 * }} {
 *   icon = false,
 * }
 * @returns {*}  {React.ReactNode}
 */
const CustomLoading = ({
  icon = false,
}: {
  icon: boolean;
}): React.ReactNode => {
  return icon ? (
    <ArrowPathIcon className="loading--icon absolute size-6 text-(--text-primary)" />
  ) : (
    <span className="loading subtitle">Loading...</span>
  );
};

export default CustomLoading;
