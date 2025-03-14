'use client';

import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ThemeSwitch = (): React.ReactNode => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="theme-switcher flex">
      <SunIcon className="theme-switcher__icon white mr-6 size-12" />
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="theme-switcher__field group relative flex h-12 w-24 cursor-pointer rounded-full bg-(--accent-pink)/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-(--accent-purple)/10 data-[focus]:outline-1 data-[focus]:outline-(--accent-purple)"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-10 translate-x-0 rounded-full bg-(--accent-pink) shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-12 group-data-[checked]:bg-(--accent-purple)"
        />
      </Switch>
      <MoonIcon className="theme-switcher__icon white ml-6 size-12" />
    </div>
  );
};

export default ThemeSwitch;
