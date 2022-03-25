import { Router } from 'express';
import ProductController from '../controller/ProductController';
import { validateProduct } from '../middleware/validators/requestValidators';
import validationChecker from '../middleware/validators';

const router = Router();

router.get('/', ProductController.allProducts);

router.get('/:id', ProductController.oneProduct);

router.put(
  '/:id',
  [...validateProduct, validationChecker],
  ProductController.updateProductQuantity
);

export default router;
