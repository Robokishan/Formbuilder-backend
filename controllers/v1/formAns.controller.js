var Answer = require("../../models/mongo/v1/FormAns");
var Asset = require("../../models/mongo/v1/Form");

module.exports = {
  addAnswer: function (req, res) {
    var newAnswer = new Answer();
    newAnswer.form_id = req.params.assetId;
    newAnswer.answers = req.body.answers;
    newAnswer.save((err, answer) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          message: err,
        });
      } else {
        return res.status(200).json(answer);
      }
    });
  },

  listAnswers: async function (req, res) {
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
      return res.status(200).json(answers);
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },

  getAnswer: async function (req, res) {
    try {
      const userId = req.userId;
      const answerId = req.params.answerId;
      let answer = await Answer.findOne({ _id: answerId }).lean().exec();
      let asset  = await Asset.findOne({ user_id: userId, _id: answer.form_id },["title", "description", "form"]).lean().exec();
      asset.answers  = answer.answers;
      return res.status(200).json(asset);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  deleteAnswer: function (req, res) {
    const userId = req.userId;
    const formId = req.params.answerId;
    Answer.findByIdAndRemove(
      {
        _id: formId,
      },
      function (err, answer) {
        if (err) {
          res.status(400).json({
            message: err,
          });
        } else {
          console.log(answer);
          return res.status(200).json(answer);
        }
      }
    );
  },
};
