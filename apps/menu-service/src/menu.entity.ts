import { Entity, ObjectIdColumn, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm"

@Entity()
export class Menu {
  @Column({ primary: true, generated: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;
}