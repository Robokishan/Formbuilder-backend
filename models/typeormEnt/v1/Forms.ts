import { GraphQLObjectType } from "graphql";
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
import GraphQLJSON from "graphql-type-json";

// @ObjectType()
// class FormData {
//   @Field()
//   task_data: any;
// }

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

  @Field(() => GraphQLJSON)
  @Column()
  form: object;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
