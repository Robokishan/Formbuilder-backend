import { Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { formanswers } from "../../models/typeormEnt/v1/FormAns";

@Resolver()
export class FormAnsResolver {
  @Query(() => [formanswers])
  answers() {
    return formanswers.find();
  }
}
