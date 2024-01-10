import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 100})
  name: string;

  @Column({length: 255})
  description: string;

  @Column({default: 0, precision: 2})
  price: number;

  @Column({default: 0, precision: 2})
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  // Muchos productos pertenecen a una categoria
  @ManyToOne(() => Category, (category) => category.products)
  category: Category
}