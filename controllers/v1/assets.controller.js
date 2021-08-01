/* asset Controllers */
var Asset = require("../../models/mongo/v1/Form");
var Answer = require("../../models/mongo/v1/FormAns");


module.exports = {
  addAsset: function (req, res) {
    var newAsset = new Asset();
    newAsset.user_id = req.userId;
    newAsset.title = req.body.title;
    newAsset.description = req.body.description ? req.body.description : "";
    newAsset.form = req.body.form;
    newAsset.save((err, asset) => {
      if (err) {
        console.log(err)
        return res.status(400).json({
          message: err,
        });
      } else {
        return res.status(200).json(asset);
      }
    });
  },

  listAssets: function (req, res) {
    const userId = req.userId;
    Asset.find({ user_id: userId }, ["title", "description", "_id", "form", "created_at", "updated_at"] ).lean().exec(async function (err, assets) {
      if (err) {
        res.status(400).json({
          message: err,
        });
      } else {
        for (let asset of assets) {
          const count = await Answer.countDocuments({form_id: asset._id }).exec()
          asset["responsecount"] = count;
        }
        return res.status(200).json(assets);
      }
    });
  },

  getAsset: function (req, res) {
    const userId = req.userId;
    const assetId = req.params.assetId;
    Asset.findOne({ user_id: userId, _id: assetId }).exec(function (err, assets) {
      if (err) {
        res.status(400).json({
          message: err,
        });
      } else {
        return res.status(200).json(assets);
      }
    });
  },
  
  getPublic: function (req, res) {
    const assetId = req.params.assetId;
    Asset.findOne({_id: assetId }).lean().exec(function (err, assets) {
      if (err) {
        res.status(400).json({
          message: err,
        });
      } else {
        return res.status(200).json(assets);
      }
    });
  },
  
  editAsset: function (req, res) {
    const userId = req.userId;
    const assetId = req.params.assetId;
    const form = req.body.form;
    Asset.findOneAndUpdate(
      {
        user_id: userId,
        _id: assetId,
      },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          form: form
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
  deleteAsset: function(req, res) {
    const userId = req.userId;
    const assetId = req.params.assetId;
    Asset.findByIdAndRemove({
      user_id: userId,
      _id: assetId
  },async function(err, asset){
      if(err) {
        res.status(400).json({
          message: err,
        });
      } else {
          await Answer.deleteMany({ form_id: assetId }).exec()
          console.log(asset);
          return res.status(200).json(asset);
      }
  });
  }

};
