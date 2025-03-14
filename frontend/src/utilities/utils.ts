// Utilities
/**
 * @description NFT price formatter
 * @author Luca Cattide
 * @date 14/03/2025
 * @param {number} price
 * @returns {*}  {string}
 */
const setPrice = (price: number): string => `${price.toString().slice(0, 6)}`;

export default setPrice;
