import React, { useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import TFilter from '@/types/components/Filter';

/**
 * @description Catalogue results filter
 * @author Luca Cattide
 * @date 14/03/2025
 * @param {{
 *   title: string;
 *   filters: Array<TFilter>;
 * }} {
 *   title,
 *   filters,
 * }
 * @returns {*}  {React.ReactNode}
 */
const Filter = ({
  title,
  filters,
}: {
  title: string;
  filters: Array<TFilter>;
}): React.ReactNode => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="filters__container mb-12 w-full">
      <div className="container__filter w-full">
        <h2 className="filter__title subtitle mb-6">{title}</h2>
        <RadioGroup
          by="name"
          value={selected}
          onChange={setSelected}
          aria-label="Server size"
          className="space-y-6"
        >
          {filters.map((filter) => (
            <Radio
              key={filter.name}
              value={filter}
              className="filter__option group relative flex cursor-pointer rounded-lg bg-white/5 p-6 shadow-md transition hover:bg-white/10 focus:outline-none data-[checked]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <div className="option__container flex w-full items-center justify-between">
                <div className="container__label">
                  <p className="label__content mb-6 font-semibold">
                    {filter.name}
                  </p>
                  <div className="label__description flex gap-2">
                    <span className="description__content">
                      {filter.criteria}
                    </span>
                  </div>
                </div>
                <CheckCircleIcon className="container__radio size-6 fill-(--accent-pink) opacity-0 transition group-data-[checked]:opacity-100" />
              </div>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default Filter;
