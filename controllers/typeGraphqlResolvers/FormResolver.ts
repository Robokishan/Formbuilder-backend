import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { getMongoRepository } from "typeorm";
import { Forms } from "../../models/typeormEnt/v1/Forms";
import { Context } from "../../types/Context";
import { ObjectID } from "mongodb";
@Resolver()
export class FormResolver {
  @Authorized()
  @Query(() => [Forms])
  async forms(@Ctx() { req, res }: Context) {
    const userId = req.userId;
    let formRepository = getMongoRepository(Forms);
    let forms = await formRepository.find({ where: { user_id: userId } });
    return forms;
  }

  @Authorized()
  @Query(() => Forms)
  async form(@Arg("formId") assetId: string, @Ctx() { req, res }: Context) {
    const userId = req.userId;
    let assetRepository = getMongoRepository(Forms);
    return assetRepository.findOne({
      where: { user_id: userId, _id: new ObjectID(assetId) },
    });
  }
}
