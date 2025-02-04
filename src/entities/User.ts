import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"users2"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

