import { SERVER_ERROR } from '../utils/constants';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Location } from '../entity/Location';

class LocationController {
  static fetchProductForLocation = async (req: Request, res: Response) => {
    const productId: number = +req.params.productId;
    try {
      const locationRepository = getRepository(Location);
      const productLocations = await locationRepository.find({
        product: productId
      });
      res.send(productLocations);
    } catch (err) {
      console.error(err);
      return res
        .status(SERVER_ERROR.code)
        .send({ message: SERVER_ERROR.message });
    }
  };
}

export default LocationController;