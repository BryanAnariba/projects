// import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class ProductByOrder {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   extraField: string;

//   @ManyToOne(() => EntityA, (entityA) => entityA.entityBs)
//   @JoinColumn({ name: 'entityAId' })
//   entityA: EntityA;

//   @ManyToOne(() => EntityB, (entityB) => entityB.entityAs)
//   @JoinColumn({ name: 'entityBId' })
//   entityB: EntityB;
// }