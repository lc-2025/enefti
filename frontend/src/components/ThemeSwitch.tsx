'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '@/hooks/state';
import { selectTheme, setTheme } from '@/slices/theme';
import { WINDOW, THEME } from '@/utilities/constants';

/**
 * @description Theme switch
 * @author Luca Cattide
 * @date 18/03/2025
 * @returns {*}  {React.ReactNode}
 */
const ThemeSwitch = (): React.ReactNode => {
  // Hooks
  const theme = useSelector(selectTheme);
  const dispatch = useAppDispatch();
  const { LABEL } = THEME;
  const { LIGHT, DARK } = THEME.NAME;
  let isDark = false;

  // Helpers
  /**
   * @description Theme enabler
   * Activates the selected theme
   * @author Luca Cattide
   * @date 18/03/2025
   * @param {boolean} isDark
   */
  const enableTheme = (isDark: boolean): void => {
    // Dark Theme check
    if (isDark) {
      document.documentElement.classList.add(DARK);
    } else {
      document.documentElement.classList.remove(DARK);
    }
  };

  // Handlers
  const handleTheme = (value: boolean): void => {
    enableTheme(value);

    // LocalStorage check
    if (window.localStorage) {
      // Theme check
      if (value) {
        localStorage.setItem(LABEL, DARK);
      } else {
        localStorage.setItem(LABEL, LIGHT);
      }
    }

    dispatch(setTheme(value ? DARK : LIGHT));
  };

  useEffect(() => {
    // LocalStorage check
    if (window.localStorage) {
      const themeSaved = localStorage.getItem(LABEL) ?? '';

      // User preference + system-aware detection
      isDark = themeSaved === DARK || window.matchMedia(WINDOW.MEDIA.THEME).matches;

      dispatch(setTheme(isDark ? DARK : LIGHT));
      enableTheme(isDark);
    }
  }, []);

  return (
    // Theme Switch Start
    <div className="theme-switcher flex">
      <SunIcon className="theme-switcher__icon white mr-6 size-12" />
      <Switch
        checked={theme === DARK}
        onChange={handleTheme}
        className="theme-switcher__field group relative flex h-12 w-24 cursor-pointer rounded-full bg-(--accent-pink)/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-(--accent-purple)/10 data-[focus]:outline-1 data-[focus]:outline-(--accent-purple)"
        tabIndex={3}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-10 translate-x-0 rounded-full bg-(--accent-pink) shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-12 group-data-[checked]:bg-(--accent-purple)"
        />
      </Switch>
      <MoonIcon className="theme-switcher__icon white ml-6 size-12" />
    </div>
    // Theme Switch End
  );
};

export default ThemeSwitch;
