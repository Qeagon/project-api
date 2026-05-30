import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';ort { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm/index.js';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @CreateDateColumn()
  createdAt: Date;
}