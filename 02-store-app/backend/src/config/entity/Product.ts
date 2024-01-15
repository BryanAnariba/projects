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

  @Column({type: 'decimal', default: 0})
  price: number;

  @Column({type: 'int'})
  stock: number;

  @Column({default: true})
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({type: 'varchar', nullable: true, length: 255})
  image: string;

  // MUCHOS PRODUCTOS PERTENECEN A UNA CATEGORIA
  @ManyToOne(() => Category, (category) => category.products)
  category: Category

}