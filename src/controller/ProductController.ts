import { Request, Response } from 'express';

class ProductController {
  static allProducts = async (req: Request, res: Response) => {
    res.send({ message: 'Fetching all products' });
  };
}

export default ProductController;
