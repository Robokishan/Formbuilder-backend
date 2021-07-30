/* asset Controllers */

var User = require("../../models/mongo/v1/User");
var Asset = require("../../models/mongo/v1/Form");

module.exports = {
  addAsset: function (req, res) {
    var newAsset = new Asset();
    newAsset.user_id = req.body.user_id;
    newAsset.title = req.body.title;
    newAsset.description = req.body.description ? req.body.description : "";
    newAsset.form = req.body.form;
    newAsset.save((err, asset) => {
      if (err) {
        return res.status(400).json({
          message: error,
        });
      } else {
        return res.status(200).json(asset);
      }
    });
  },

  listAssets: function (req, res) {
    const userId = req.userId;
    Asset.find({ user_id: userId }).exec(function (err, assets) {
      if (err) {
        res.status(400).json({
          message: err,
        });
      } else {
        console.log(assets);
        res.json(assets);
      }
    });
  },

  editAsset: function (req, res) {
    const userId = req.userId;
    const assetId = req.body.assetId;
    const form = req.body.form;
    Asset.findOneAndUpdate(
      {
        user_id: userId,
        _id: assetId,
      },
      {
        $set: {
          form: form,
        },
      },
      function (err, asset) {
        if (err) {
          res.status(400).json({
            message: err,
          });
        } else {
          console.log(asset);
          res.json(asset);
        }
      }
    );
  },
};
