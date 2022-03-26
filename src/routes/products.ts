import { Router } from 'express';
import ProductController from '../controller/ProductController';
import validationChecker from '../middleware/validators';
import {
  validateId,
  validateProduct
} from '../middleware/validators/requestValidators';

const router = Router();

router.get('/', ProductController.allProducts);

router.get(
  '/:id',
  [...validateId, validationChecker],
  ProductController.oneProduct
);

router.put(
  '/:id',
  [...validateProduct, validationChecker],
  ProductController.updateProductQuantity
);

export default router;
