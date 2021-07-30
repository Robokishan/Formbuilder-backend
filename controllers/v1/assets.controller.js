/* asset Controllers */
var Asset = require("../../models/mongo/v1/Form");

module.exports = {
  addAsset: function (req, res) {
    var newAsset = new Asset();
    newAsset.user_id = req.userId;
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
        console.log(assets);
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
  },function(err, asset){
      if(err) {
        res.status(400).json({
          message: err,
        });
      } else {
          console.log(asset);
          return res.status(200).json(asset);
      }
  });
  }

};
