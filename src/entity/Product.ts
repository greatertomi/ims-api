import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coreNumber: string;

  @Column()
  internalTitle: string;

  @Column()
  vendor: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  vendorTitle: string;

  @Column()
  vendorSku: string;

  @Column()
  backupVendor: string;

  @Column()
  backupVendorSKU: string;

  @Column({ nullable: true })
  restockable: string;

  @Column()
  vendorOrderUnit: string;

  @Column({ nullable: true })
  vendorCasePack: number;

  @Column({ nullable: true })
  moq: number;

  @Column()
  bufferDays: number;

  @Column({ nullable: true })
  minimumLevel: number;

  @Column({ nullable: true })
  productUrl: string;

  @Column({ nullable: true })
  noteForNextOrder: string;

  @Column({ nullable: true })
  casePack: string;

  @Column({ nullable: true })
  piecesPerInternalBox: string;

  @Column({ nullable: true })
  tag1: string;

  @Column({ nullable: true })
  tag2: string;

  @Column({ nullable: true })
  tag3: string;

  @Column({ nullable: true })
  tag4: string;

  @Column({ nullable: true })
  hamzat: string;

  @Column({ default: false })
  active: boolean;

  @Column({ nullable: true })
  ignoreUntil: string;

  @Column({ nullable: true })
  notes: string;
}
