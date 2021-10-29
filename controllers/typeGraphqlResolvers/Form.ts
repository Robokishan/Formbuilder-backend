import { Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { Forms } from "../../models/typeormEnt/v1/Forms";

@Resolver()
export class FormResolver {
  @Query(() => [Forms])
  forms() {
    return Forms.find();
  }
}