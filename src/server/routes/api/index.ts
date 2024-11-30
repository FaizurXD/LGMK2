import { Router } from 'express';
import stocksRouter from './stocks.js';
import generatorRouter from './generator.js';
import balanceRouter from './balance.js';
import earnRouter from './earn.js';

const router = Router();

router.use('/stocks', stocksRouter);
router.use('/generator', generatorRouter);
router.use('/balance', balanceRouter);
router.use('/earn', earnRouter);

export default router;