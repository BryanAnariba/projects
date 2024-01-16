import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

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

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[]
}