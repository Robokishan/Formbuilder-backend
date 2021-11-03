import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { formanswers } from "../../models/typeormEnt/v1/FormAns";
var Answer = require("../../models/mongo/v1/FormAns");
var Asset = require("../../models/mongo/v1/Form");

import { Context } from "../../types/Context";
@Resolver()
export class FormAnsResolver {
  @Authorized()
  @Query(() => [formanswers])
  async answers(@Ctx() { req, res }: Context) {
    const userId = req.userId;

    try {
      const assets = await Asset.find({ user_id: userId }).lean().exec();
      const ids = assets.map((asset) => asset._id);
      let answers = await Answer.find({ form_id: { $in: ids } })
        .lean()
        .exec();
      for (let answer of answers) {
        let asset = await Asset.findOne({
          user_id: userId,
          _id: answer.form_id,
        }).exec();
        answer["title"] = asset["title"];
        answer["description"] = asset["description"];
      }
      console.log(answers);
      return answers;
    } catch (err) {
      console.error("Form Answer error", err);
    }
  }
}
