'use client';

import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ThemeSwitch = (): React.ReactNode => {
  const [theme, setTheme] = useState(true);
  const themeName = {
    light: 'light',
    dark: 'dark',
  };
  const themeLabel = 'theme';
  let isDark = false;

  const enableTheme = (isDark: boolean): void => {
    // Dark Theme check
    if (isDark) {
      document.documentElement.classList.add(themeName.dark);
    } else {
      document.documentElement.classList.remove(themeName.dark);
    }
  };

  // Handlers
  const handleTheme = (): void => {
    setTheme((theme) => {
      const newTheme = !theme;

      enableTheme(newTheme);

      // LocalStorage check
      if (window.localStorage) {
        // Theme check
        if (newTheme) {
          localStorage.setItem(themeLabel, themeName.dark);
        } else {
          localStorage.setItem(themeLabel, themeName.light);
        }
      }

      return newTheme;
    });
  };

  // Hooks
  useEffect(() => {
    // LocalStorage check
    if (window.localStorage) {
      const themeSaved = localStorage.getItem(themeLabel);

      isDark = themeSaved === themeName.dark;

      setTheme(isDark);
      enableTheme(isDark);
    }
  }, []);

  return (
    // Theme Switch Start
    <div className="theme-switcher flex">
      <SunIcon className="theme-switcher__icon white mr-6 size-12" />
      <Switch
        checked={theme}
        onChange={handleTheme}
        className="theme-switcher__field group relative flex h-12 w-24 cursor-pointer rounded-full bg-(--accent-pink)/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-(--accent-purple)/10 data-[focus]:outline-1 data-[focus]:outline-(--accent-purple)"
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
