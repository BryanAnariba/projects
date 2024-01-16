import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity()
export class ProductByOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'int'})
  quantityProduct: number;

  @Column({type: 'decimal'})
  productValue: number;


  // ESTA ES LA TABLA INTERMEDIA
  // Order
  @ManyToOne(() => Order, (order) => order.productsByOrder)
  order: Order;

  // Product
  @ManyToOne(() => Product, (product) => product.productsByOrder)
  product: Product;
}