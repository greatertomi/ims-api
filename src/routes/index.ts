import { Router } from 'express';
import products from './products';
import locations from './locations';

const routes = Router();

routes.use('/products', products);

routes.use('/locations', locations);

export default routes;
