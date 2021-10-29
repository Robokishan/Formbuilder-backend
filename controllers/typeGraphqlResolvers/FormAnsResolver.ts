import { Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { formanswers } from "../../models/typeormEnt/v1/FormAns";

@Resolver()
export class FormAnsResolver {
  @Query(() => [formanswers])
  async answers() {
    console.log(await formanswers.find());
    return formanswers.find();
  }
}
