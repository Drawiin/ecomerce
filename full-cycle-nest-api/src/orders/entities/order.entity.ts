import { Product } from '../../products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'faled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;
  @Column()
  client_id: number;
  @Column()
  status: OrderStatus = OrderStatus.PENDING;
  @CreateDateColumn()
  created_at: Date;
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int' })
  quantity: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
  @Column()
  product_id: string;
  @ManyToOne(() => Order)
  order: Order;
}
