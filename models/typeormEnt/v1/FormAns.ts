import { GraphQLJSON } from "graphql-type-json";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Forms } from "./Forms";

@ObjectType()
@Entity()
export class formanswers extends BaseEntity {
  @Field()
  @PrimaryColumn({ name: "_id" })
  id: string;

  @Field(() => String)
  @Column({ nullable: true })
  form_id: string;

  @OneToOne((type) => Forms)
  @JoinColumn({
    name: "form_id",
    referencedColumnName: "id",
  })
  @Field()
  @Column()
  form_answers: Forms;

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
