/**
 * @description Apollo Client cache updater
 * Merges existing cache with new field values
 * @author Luca Cattide
 * @date 14/03/2025
 * @param {*} fieldExisting
 * @param {*} fieldIncoming
 * @param {number} offset
 * @returns {*}  {*}
 */
const updateCache = (
  fieldExisting: any,
  fieldIncoming: any,
  offset: number,
  limit: number,
): any => {
  // Slicing to preserve cache immutability
  const merged = fieldExisting ? fieldExisting.slice(0) : [];
  const end = offset + Math.min(limit, fieldIncoming.length);

  for (let i = offset; i < end; ++i) {
    merged[i] = fieldIncoming[i - offset];
  }

  return merged;
};

export default updateCache;
