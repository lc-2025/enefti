import { Router } from 'express';
import { ROUTES } from '../utils/constants';
import { getNfts, getNft, patchNfts } from '../controllers/nft';

// Router
const routerNft = Router();

// Routes - NFT
routerNft.get(ROUTES.API.NFT.GET_ALL, getNfts);
routerNft.get(ROUTES.API.NFT.GET, getNft);
routerNft.patch(ROUTES.API.NFT.GET_ALL, patchNfts);

export default routerNft;
