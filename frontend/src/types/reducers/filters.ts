// Types - State Management - Reducer (Filters)
enum TPrice {
  Ascendant = 'ASCENDANT',
  Descendant = 'DESCENDANT',
}

type TFilter = {
  price: TPrice | null;
  owner: boolean;
};

export { TPrice };
export type { TFilter };
