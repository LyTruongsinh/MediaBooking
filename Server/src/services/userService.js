import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (useremail, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(useremail);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ['email', 'roleId', 'password'], // only show three fields 'email', 'roleId', 'password'
          where: {
            email: useremail,
          },
          raw: true
        //   attributes: {
        //     include: ['email', 'roleId'], // define columes that you want to show
        //     exclude: ['password'] // define columes that you don't want to show
        //   }
        });
        if (user) {
            let checkPassword = await bcrypt.compareSync(password, user.password);
            if(checkPassword) {
                userData.errCode = 0;
                userData.errMsg = "Login successful";
                delete user.password; // delete passord in order to not show passord in API when test on PostMan
                userData.user = user;
            } else {
                userData.errCode = 3;
                userData.errMsg = "Password is incorrect";
            }
        } else {
          userData.errCode = 2;
          userData.errMsg = "User not found";
        }
        resolve(userData);
      } else {
        userData.errCode = 1;
        userData.errMsg = "Your's email isn't exits";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (useremail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: useremail,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
};
