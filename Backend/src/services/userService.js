import { rejects } from "assert";
import db from "../models/index";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Op } from "sequelize";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password); // false
          if (check) {
            userData.errCode = 0;
            (userData.errMessage = `OK`),
              delete user.password,
              (userData.user = user);
          } else {
            userData.errCode = 3;
            userData.errMessage = `Wrong password`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in your system. Please try other email`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
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

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "All") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "All") {
        users = await db.User.findOne({
          where: { id: userId },
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

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email exist
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "your email is already in used, please try another email !",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
        });
      }

      resolve({
        errCode: 0,
        errMessage: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundUser = await db.User.findOne({
        where: { id: userId },
      });

      if (!foundUser) {
        resolve({
          errCode: 2,
          errMessage: "The user doesn't exist",
        });
      }

      await db.User.destroy({
        where: { id: userId },
      });
      resolve({
        errCode: 0,
        errMessage: "The user is deleted",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if 'id' is missing in the data
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter: id",
        });
        return; // Return to avoid proceeding further
      }

      // Find the user by 'id'
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });

      // Check if the user is found
      if (user) {
        // Update user data
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;
        user.roleId = data.roleId;
        user.gender = data.gender;
        user.positionId = data.positionId;
        if (data.avatar) {
          user.image = data.avatar;
        }

        // Save the updated user
        await user.save();

        resolve({
          errCode: 0,
          errMessage: "Update the user succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const forgotPasswordService = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email }, // Using the 'email' parameter directly
        raw: false,
      });

      if (!response) {
        resolve({
          err: 1,
          msg: "This email is not registered",
        });
      } else {
        if (response instanceof db.User) {
          const resetToken = crypto.randomBytes(32).toString("hex");
          response.passwordToken = resetToken;
          response.passwordTokenDate = Date.now() + 5 * 60 * 1000; // Thời gian token: 5p

          // Saving the changes to the database
          const savedResponse = await response.save();
          console.log(savedResponse); // Log the saved response

          resolve({
            err: 0,
            passwordTokenDate: resetToken,
            msg: "The message has been sent to your email",
          });
        } else {
          resolve({
            err: 1,
            msg: "Error during password reset",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });

const resetPasswordService = async (password, token) => {
  try {
    // Check if 'token' is missing in the data
    if (!token) {
      return {
        err: 1,
        msg: "Missing required parameter: token",
      };
    }
    let user = await db.User.findOne({
      where: { passwordToken: token },
      passwordTokenDate: { [Op.gt]: Date.now() },
      raw: false,
    });

    if (!user) {
      return {
        err: 1,
        msg: "Bạn đã hết thời hạn thay đổi mật khẩu, vui lòng thử lại!",
      };
    }

    if (user) {
      user.password = hashPassword(password);
      user.passwordToken = null;
      user.passwordTokenDate = null;

      console.log(user);

      // Save the updated user
      await user.save();

      return {
        err: 0,
        msg: "Đổi mật khẩu thành công",
      };
    }
  } catch (error) {
    return {
      err: -1,
      msg: "An unexpected error occurred during password reset.",
      error: error.message || "Unknown error",
    };
  }
};

let registerNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email exist
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "your email is already in used, please try another email !",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          address: data.address,
          phonenumber: data.phonenumber,
        });
      }
      resolve({
        errCode: 0,
        errMessage: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, rejects) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters !",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      rejects(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  forgotPasswordService: forgotPasswordService,
  resetPasswordService: resetPasswordService,
  registerNewUser: registerNewUser,
  getAllCodeService: getAllCodeService,
};
