import TCoin from 'src/types/api/Coin';
import TNFT from 'src/types/models/NFT';

// Utilities
/**
 * @description NFT setter
 * Creates a mocked NFT
 * @author Luca Cattide
 * @date 10/03/2025
 * @param {TCoin} coin
 * @param {number} index
 * @returns {*}  {TNFT}
 */
const setNft = (coin: TCoin, index: number): TNFT => ({
  name: `NFT #${index + 1} - ${coin.name}`,
  image: coin.image || `https://via.placeholder.com/150?text=NFT${index + 1}`,
  description: `A unique NFT inspired by ${coin.name}.`,
  // Price in ETH
  price: coin.current_price,
  // Wallet address
  owner: `0x${Math.random().toString(16).slice(2, 10)}`,
});

export default setNft;
