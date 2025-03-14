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
): any => {
  // Slicing to preserve cache immutability
  const merged = fieldExisting ? fieldExisting.slice(0) : [];

  for (let i = 0; i < fieldIncoming.length; ++i) {
    merged[offset + i] = fieldIncoming[i];
  }

  return merged;
};

export default updateCache;
