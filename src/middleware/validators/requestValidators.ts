import { body } from 'express-validator';

export const validateProduct = [
  body('location', 'Location is required').notEmpty(),
  body('newQuantity').isNumeric().withMessage('newQuantity must be a number'),
  body('action', 'Action must be add or subtract').isIn(['add', 'subtract'])
];
