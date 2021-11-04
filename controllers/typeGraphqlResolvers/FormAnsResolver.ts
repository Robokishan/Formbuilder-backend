import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { getMongoRepository } from "typeorm";
import { formanswers } from "../../models/typeormEnt/v1/FormAns";
import { Forms } from "../../models/typeormEnt/v1/Forms";
import { Context } from "../../types/Context";

@Resolver()
export class FormAnsResolver {
  @Authorized()
  @Query(() => [formanswers])
  async answers(@Ctx() { req, res }: Context) {
    const userId = req.userId;

    // #1 : mongoose method
    // try {
    //   const assets = await Asset.find({ user_id: userId }).lean().exec();
    //   const ids = assets.map((asset) => asset._id);
    //   let answers = await Answer.find({ form_id: { $in: ids } })
    //     .lean()
    //     .exec();
    //   for (let answer of answers) {
    //     let asset = await Asset.findOne({
    //       user_id: userId,
    //       _id: answer.form_id,
    //     }).exec();
    //     answer["title"] = asset["title"];
    //     answer["description"] = asset["description"];
    //   }
    //   console.log(answers);
    //   return answers;
    // } catch (err) {
    //   console.error("Form Answer error", err);
    // }

    // #2 using mongorepository
    // found getMongomanager vs getMongoRepository

    try {
      let assetManager = getMongoRepository(Forms);
      let answerManager = getMongoRepository(formanswers);

      const assets = await assetManager
        .aggregate([
          {
            $match: { user_id: userId },
          },
          {
            $addFields: {
              id: { $toString: "$_id" },
            },
          },
        ])
        .toArray();

      const ids = assets.map((asset) => asset.id);
      let answers = await answerManager.find({
        where: { form_id: { $in: ids } },
      });

      return answers;
    } catch (error) {
      console.log("Error", error);
    }
  }
}
