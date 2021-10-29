import { Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { Users } from "../../models/typeormEnt/v1/User";

@Resolver()
export class UserResolver {
  @Query(() => [Users])
  user() {
    return Users.find();
  }
}
