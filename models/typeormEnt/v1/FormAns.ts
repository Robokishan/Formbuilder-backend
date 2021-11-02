import { GraphQLJSON } from "graphql-type-json";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class formanswers extends BaseEntity {
  @Field()
  @PrimaryColumn({ name: "_id" })
  id: string;

  @Field(() => String)
  @Column({ nullable: true })
  form_id: string;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => GraphQLJSON)
  @Column()
  answers: object;
}
