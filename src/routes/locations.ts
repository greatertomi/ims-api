import { Router } from 'express';
import LocationController from '../controller/LocationController';

const router = Router();

router.get('/:productId', LocationController.fetchProductForLocation);

export default router;
