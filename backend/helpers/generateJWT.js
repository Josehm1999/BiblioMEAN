import jwt from "jsonwebtoken";
import moment from "moment";

const generarJWT = (userLogin) => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id: userLogin._id,
      name: userLogin.name,
      role: userLogin.role,
      iat: moment().unix(),
    };

    jwt.sign(
      payload,
      process.env.SK_JWT,
      {
        expiresIn: "8h",
      },
      (err, token) => {
        if (err) {
          reject("Error generating JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generarJWT;
