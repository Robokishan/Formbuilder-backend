const { sign } = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var config = require("../../config/config");
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

  module.exports = {
      verifyPassword,
      createAccessToken
  }