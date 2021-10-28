import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Any,
  PrimaryColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Forms extends BaseEntity {
  @PrimaryColumn({ name: "_id" })
  id: string;

  @Field()
  @Column({ nullable: false })
  user_id: string;

  @Field()
  @Column({ nullable: false })
  title: string;

  @Field()
  @Column({ nullable: false })
  description: string;

  @Field(() => String)
  @Column()
  form: object;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
