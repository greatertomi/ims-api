import { body, check } from 'express-validator';

export const validateProduct = [
  body('location', 'Location is required').notEmpty(),
  body('newQuantity').isNumeric().withMessage('newQuantity must be a number'),
  body('action', 'Action must be add or subtract').isIn(['add', 'subtract'])
];

export const validateProductId = [
  check('productId', 'ProductId must be numeric').isNumeric()
];

export const validateId = [check('id', 'id must be numeric').isNumeric()];
