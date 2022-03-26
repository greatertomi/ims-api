import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Product } from './Product';

@Entity({ name: 'locations' })
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  warehouse: string;

  @Column()
  location: string;

  @Column()
  quantity: number;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn()
  product: number;
}
