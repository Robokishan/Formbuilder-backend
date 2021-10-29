import { Field, InputType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { Users } from "../../models/typeormEnt/v1/User";

@InputType
class EmailPasswordInput {
    @Field()
    email: string;

    @Field()
    password: string;

}
@Resolver()
export class UserResolver {
  @Query(() => [Users])
  user() {
    return Users.find();
  }

  @Mutation(() => User)
  async login(@Arg("options")) {      
  }
}
