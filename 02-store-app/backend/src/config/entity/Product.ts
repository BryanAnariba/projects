import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({length: 100})
  name: string;

  @Column({length: 255})
  description: string;

  @Column({default: 0})
  price: number;

  @Column()
  stock: number;

  @Column({default: true})
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  // MUCHOS PRODUCTOS PERTENECEN A UNA CATEGORIA
  @ManyToOne(() => Category, (category) => category.products)
  category: Category

}