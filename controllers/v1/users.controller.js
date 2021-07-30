var User = require("../../models/mongo/v1/User");
var jwt = require("jsonwebtoken");
const uuidv1 = require("uuid/v1");
var bcrypt = require('bcrypt');

module.exports = {
  createUser: function (req, res) {
    let user = new User();
    user.email = req.body.email;
    user.user_name = req.body.user_name;
    user.id = uuidv1();
    user.password = 
    user.save(function (err, user) {
      if (err)
        return res.status(400).json({
          message: err,
        });
      else
        return res.status(200).json({
          message: `success! created account for new user ${user.user_name}`,
          id: user.id,
        });
    });
  },

  getAllUserDetails: function (req, res) {
    try {
      const userId = req.userId;
      if (userId !== null) {
        User.findAll()
          .then(function (result) {
            return res.status(200).json(result);
          })
          .catch(function (err) {
            return res.status(400).json({
              message: err,
            });
          });
      }
    } catch (err) {
      res.send({
        error: `${err.message}`,
      });
    }
  },

  validateUser: function (req, res) {
    User.loginUser(req.body)
      .then(function (result) {
        console.log("expr", new Date(Date.now() + 123));
        if (result.isAuthorized === true) {
          return res
            .cookie("token", result.accessToken, {
              // expires: new Date(Date.now() + expiration),
              secure: false, // set to true if your using https
              httpOnly: true,
            })
            .status(200)
            .json({
              // "userId": result.userId,
              name: result.name,
              email: result.email,
              address: result.address,
              org: result.owner_details,
              token: {
                access_token: result.accessToken,
                expires_in: jwt.decode(result.accessToken).exp,
                token_type: "bearer",
              },
              updated_on: result.createdOn,
              created_on: result.createdOn,
              avatar: result.avatar,
            });
        } else {
          return res.status(401).json({
            message: "bad credentials",
          });
        }
      })
      .catch(function (err) {
        console.log("error", err);
        return res.status(401).json({
          message: "bad credentials",
        });
      });
  },

  getOwner(req, res) {
    User.getowner(req).then((result) => {
      return res
        .status(200)
        .json(result)
        .catch((error) => {
          return res.status(403).json({
            message:
              process.env.NODE_ENV != "production"
                ? error
                : "Something went wrong",
          });
        });
    });
  },
};
