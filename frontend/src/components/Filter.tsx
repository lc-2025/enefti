'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import {
  Radio,
  RadioGroup,
  Checkbox,
  Field,
  Label,
  Description,
} from '@headlessui/react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '@/hooks/state';
import {
  selectFilterOwner,
  selectFilterPrice,
  setFilterOwner,
  setFilterPrice,
  setFilterPriceReset,
} from '@/slices/filters';
import { FILTER } from '@/utilities/constants';
import TFilter from '@/types/components/Filter';
import { TFilterProps } from '@/types/reducers/filters';

/**
 * @description Catalogue results filter
 * @author Luca Cattide
 * @date 14/03/2025
 * @param {{
 *   title: string;
 *   filters: Array<TFilter>;
 *   type: string;
 * }} {
 *   title,
 *   filters,
 *   type
 * }
 * @returns {*}  {React.ReactNode}
 */
const Filter = ({
  title,
  filters,
  type,
}: {
  title: string;
  filters: Array<TFilter>;
  type: string;
}): React.ReactNode => {
  // Hooks
  const filterPrice = useSelector(selectFilterPrice);
  const filterOwner = useSelector(selectFilterOwner);
  const dispatch = useAppDispatch();

  // Handlers
  /**
   * @description Filter handler
   * Sets the current selected filter
   * @author Luca Cattide
   * @date 18/03/2025
   * @param {(TFilterProps | boolean)} value
   */
  const handleFilter = (value: TFilterProps | boolean): void => {
    dispatch(
      type === FILTER.TYPE.RADIO
        ? setFilterPrice(value as TFilterProps)
        : setFilterOwner(!filterOwner),
    );
  };

  /**
   * @description Filter reset handler
   * Resets the current selected filters
   * @author Luca Cattide
   * @date 18/03/2025
   */
  const handleFilterReset = (): void => {
    dispatch(setFilterPriceReset());
  };

  return (
    // Filter Start
    <div className="filters__container mb-12 w-full">
      <div className="container__filter w-full">
        <h2 className="filter__title subtitle mb-6">{title}</h2>
        {type === FILTER.TYPE.RADIO ? (
          <>
            <RadioGroup
              by="name"
              value={filterPrice}
              onChange={handleFilter}
              aria-label={title}
              className="filter__field space-y-6"
              tabIndex={4}
            >
              {filters.map((filter) => (
                <Radio
                  key={filter.name}
                  value={filter}
                  className="filter__option group relative flex cursor-pointer rounded-lg bg-white/5 p-6 shadow-md transition hover:opacity-75 focus:outline-none data-[checked]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
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
            {filterPrice && (
              // Clear Start
              <div
                className="filter__reset mt-6 flex cursor-pointer items-center transition-opacity duration-200 ease-linear hover:opacity-75"
                onClick={handleFilterReset}
              >
                <XMarkIcon className="reset__icon mr-6 inline-block size-6" />
                <span className="reset__label">Clear Filter</span>
              </div>
              // Clear End
            )}
          </>
        ) : (
          filters.map(({ name, criteria }) => (
            <Field key={name} className="filter__container">
              <Label className="container__label group relative flex cursor-pointer items-center justify-between bg-white/5 p-6 shadow-md transition hover:opacity-75 data-[checked]:bg-white/10">
                <div className="label__container flex flex-col">
                  <span className="container__text mb-6 font-semibold">{name}</span>
                  <Description className="container__description">
                    {criteria}
                  </Description>
                </div>
                <Checkbox
                  checked={filterOwner}
                  onChange={handleFilter}
                  className="container__field group size-6 rounded-md p-1 ring-inset focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  <CheckCircleIcon className="field__icon size-6 fill-(--accent-pink) opacity-0 transition group-data-[checked]:opacity-100" />
                </Checkbox>
              </Label>
            </Field>
          ))
        )}
      </div>
    </div>
    // Filter End
  );
};

export default Filter;
