import { Router } from 'express';
import LocationController from '../controller/LocationController';
import validationChecker from '../middleware/validators';
import { validateProductId } from '../middleware/validators/requestValidators';

const router = Router();

router.get(
  '/:productId',
  [...validateProductId, validationChecker],
  LocationController.fetchProductForLocation
);

export default router;
