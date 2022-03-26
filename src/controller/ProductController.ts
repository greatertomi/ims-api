import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Location } from '../entity/Location';
import { Product } from '../entity/Product';
import {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR
} from '../utils/constants';

class ProductController {
  static allProducts = async (req: Request, res: Response) => {
    try {
      const productRepository = getRepository(Product);
      const locationRepository = getRepository(Location);
      const products = await productRepository.find();
      const productLocations = await locationRepository.find({
        order: {
          id: 'ASC'
        }
      });
      const productsWithQuantity = products.map((product) => {
        const totalQuantity = productLocations
          .filter((e) => e.productId === product.id)
          .reduce((a, b) => a + b.quantity, 0);
        return { ...product, totalQuantity };
      });
      res.send(productsWithQuantity);
    } catch (err) {
      console.error(err);
      return res
        .status(SERVER_ERROR.code)
        .send({ message: SERVER_ERROR.message });
    }
  };

  static oneProduct = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      const productRepository = getRepository(Product);
      const locationRepository = getRepository(Location);
      const product = await productRepository.findOne(productId);
      if (!product) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: 'Product with this id does not exist' });
      }
      const locations = await locationRepository.find({
        productId: product.id
      });
      res.send({ ...product, locations });
    } catch (err) {
      console.error(err);
      return res
        .status(SERVER_ERROR.code)
        .send({ message: SERVER_ERROR.message });
    }
  };

  static updateProductQuantity = async (req: Request, res: Response) => {
    try {
      const productId = +req.params.id;
      const { location, newQuantity, action } = req.body;
      const locationRepository = getRepository(Location);
      const productLocation = await locationRepository.findOne({
        location,
        productId
      });
      if (!productLocation) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: 'This product does not exist for this location' });
      }

      if (action === 'subtract' && newQuantity > productLocation.quantity) {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: 'newQuantity too large' });
      }

      const adjustedQuantity =
        action === 'subtract'
          ? productLocation.quantity - newQuantity
          : productLocation.quantity + newQuantity;
      await locationRepository.update(
        { location, productId },
        { quantity: adjustedQuantity }
      );
      const data = { productId, location, newQuantity: adjustedQuantity };
      res.send({ message: 'Product updated successfully', data });
    } catch (err) {
      console.error(err);
      return res
        .status(SERVER_ERROR.code)
        .send({ message: SERVER_ERROR.message });
    }
  };
}

export default ProductController;
