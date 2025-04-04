import db from "../models/index";
import bcrypt from "bcryptjs";
let salt = bcrypt.genSaltSync(10);

let hashUserPassWord = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserLogin = (useremail, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(useremail);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"], // only show three fields 'email', 'roleId', 'password'
          where: {
            email: useremail,
          },
          raw: true,
          //   attributes: {
          //     include: ['email', 'roleId'], // define columes that you want to show
          //     exclude: ['password'] // define columes that you don't want to show
          //   }
        });
        if (user) {
          let checkPassword = await bcrypt.compareSync(password, user.password);
          if (checkPassword) {
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
let getAllUser = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userid === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userid && userid !== "ALL") {
        users = await db.User.findOne({
          where: {
            id: userid,
          },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let creatNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          message: "Email has been used",
        });
        return;
      }
      let hashPasswordFromBcrypt = await hashUserPassWord(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        phoneNumber: data.phonenumber,
      });
      resolve({
        errCode: 0,
        message: "Creat new User succeed",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: userid,
        },
      });
      if (!user) {
        resolve({
          errCode: 1,
          message: "User not found",
        });
        return;
      }
      await db.User.destroy({
        where: {
          id: userid,
        },
      });
      resolve({
        errCode: 0,
        message: "Delete User succeed",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "No data provided",
        });
        return;
      }
      let user = await db.User.findOne({
        where: {
          id: data.id,
        },
        raw: false,
      });
      if (!user) {
        resolve({
          errCode: 1,
          message: "User not found",
        });
        return;
      }
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      await user.save();
      resolve({
        errCode: 0,
        message: "Update User succeed!",
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUser: getAllUser,
  creatNewUser: creatNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
};
