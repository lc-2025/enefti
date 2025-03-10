import { Router } from 'express';
import { ROUTES } from '../utils/constants';
import { getNfts, getNft, patchNft } from '../controllers/nft';

// Router
const nftRouter = Router();

// Routes - NFT
nftRouter.get(ROUTES.API.NFT.GET_ALL, getNfts);
nftRouter.get(ROUTES.API.NFT.GET, getNft);
nftRouter.patch(ROUTES.API.NFT.GET, patchNft);

export default nftRouter;
