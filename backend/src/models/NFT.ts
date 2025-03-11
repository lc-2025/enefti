import { Schema, model } from 'mongoose';
import TNFT from '../types/models/NFT';

// Models - NFT
const nftSchema = new Schema<TNFT>({
  name: { type: String, required: true },
  image: String,
  description: String,
  price: Number,
  owner: String,
});
const nftModel = model('NFT', nftSchema);

export default nftModel;
