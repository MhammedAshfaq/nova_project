import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "message" })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column()
  message: string;
}
