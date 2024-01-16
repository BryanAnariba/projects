import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { ProductByOrder } from "./ProductByOrder";

@Entity()
export class Order {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default: true})
  isActive: boolean;

  @Column({default: 0, type: 'decimal' })
  subTotal: number;

  @Column({default: 0, type: 'decimal'})
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
  
  // MUCHAS ORDENES PERTENECEN A UN USUARIO
  @ManyToOne(() => User, (user) => user.orders)
  user: User

  // ESTA RELACION VA PARA UNA TABLA INTERMEDIA
  @OneToMany(() => ProductByOrder, productsByOrder => productsByOrder.order)
  productsByOrder: ProductByOrder[];
}