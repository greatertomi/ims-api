import { Router } from 'express';
import ProductController from '../controller/ProductController';

const router = Router();

router.get('/', ProductController.allProducts);

export default router;
