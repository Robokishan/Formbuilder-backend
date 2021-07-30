var User = require("../../models/mongo/v1/User");
var jwt = require("jsonwebtoken");
const uuidv1 = require("uuid/v1");
var bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
var config = require("../../config/config");
const saltRounds = config.SALT_ROUNDS;

module.exports = {
  createUser: function (req, res) {
    let user = new User();
    user.email = req.body.email;
    user.user_name = req.body.user_name;
    user.name = req.body.name;
    user.id = uuidv1();
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      if (err) res.status(400).json({ message: `Something went wrong ${err}` });
      else {
        user.password = hash;
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
      }
    });
  },

  validateUser: function (req, res) {
    User.findOne({ email: req.body.email }, async (err, user) => {
      if ( !user ) return res.status(401).json({
        message: "bad credentials",
      });
      const { isValid } = await verifyPassword(req.body.password, user);
      if (isValid != true)
        return res.status(401).json({
          message: "bad credentials",
        });
      else {
        const accesstoken = createAccessToken(user);
        return res
          .cookie("token", accesstoken, {
            // expires: new Date(Date.now() + expiration),
            secure: false, // set to true if your using https
            httpOnly: true,
          })
          .status(200)
          .json({
            // "userId": result.userId,
            name: user.name,
            email: user.email,
            token: {
              access_token: accesstoken,
              expires_in: jwt.decode(accesstoken).exp,
              token_type: "bearer",
            },
          });
      }
    });
  },

  getOwner(req, res) {
    User.findOne({ id: req.userId }, ['id','email', "user_name", "name"], async (err, user) => {
      if(err) return res.status(400).json({
        message: err,
      });
      else {

        return res.status(200).json(user);
      }
    });
  },
};

function verifyPassword(password, user) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve({ isValid: result, id: user.id, email: user.email });
      }
    });
  });
}

const createAccessToken = (user) => {
  return sign(
    {
      userId: user.id,
      email: user.email,
      user_name: user.user_name,
    },
    config.SECRET,
    {
      expiresIn: config.JWT_EXPIRATION,
    }
  );
};
