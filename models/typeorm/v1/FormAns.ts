import { Entity, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Profile {
  @Column({ nullable: true })
  form_id: string;

  @Column()
  answers: object;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
