import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Product, (product) => product.id)
  product: number;
}
