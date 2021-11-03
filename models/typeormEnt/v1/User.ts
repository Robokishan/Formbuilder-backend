import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Users extends BaseEntity {
  @Field()
  @PrimaryColumn({ name: "_id", unique: true, nullable: false })
  _id: string;

  @Field()
  @Column({ name: "id", unique: true, nullable: false })
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ unique: true, nullable: false })
  user_name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ nullable: false })
  password: string;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
