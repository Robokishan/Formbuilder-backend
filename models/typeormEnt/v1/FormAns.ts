import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class FormAns {
  @PrimaryColumn({ name: "_id" })
  id: string;

  @Column({ nullable: true })
  form_id: string;

  @Column()
  answers: object;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
