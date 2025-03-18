// Types - State Management - Reducer (Filters)
enum Price {
  Ascendant = 'Ascendant',
  Descendant = 'Descendant',
}

type TFilterProps = {
  name: string;
  criteria: string;
};

type TFilterPrice = {
  value: TFilterProps | null;
  order: Price | null;
};

type TFilter = {
  price: TFilterPrice;
  owner: boolean;
};

export { Price };
export type { TFilterProps, TFilter };
