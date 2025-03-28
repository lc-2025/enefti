import TQueryFilter from 'src/types/api/Query';

/**
 * @description Query filter setter
 * Sets the query search element to match
 * @author Luca Cattide
 * @date 28/03/2025
 * @param {*} data
 * @param {boolean} [parse]
 * @returns {*}  {TQueryFilter}
 */
const setFilter = (data: any, parse?: boolean): TQueryFilter => ({
  _id: {
    $in: parse ? JSON.parse(data as string) : data,
  },
});

export default setFilter;
