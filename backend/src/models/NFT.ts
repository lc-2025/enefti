import { Schema, model } from 'mongoose';
import TNFT from '../types/models/NFT';

// Models - NFT
const nftSchema = new Schema<TNFT>({
  name: String,
  image: String,
  description: String,
  // Price in ETH
  price: Number,
  owner: String,
});
const nftModel = model('NFT', nftSchema);

export default nftModel;
