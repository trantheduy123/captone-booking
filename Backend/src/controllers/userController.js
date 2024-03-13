import userService from "../services/userService";
import axios from "axios";
import db from "../models/index";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendmail";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password)
    return res.status(500).json({
      errCode: 1,
      message: "missing inputs parameter!",
    });

  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //All, id
  if (!id) {
    return res.status(200).json({
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);

  return res.status(200).json({
    errCode: 0,
    message: "ok",
    users,
  });
};

let handeleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleSignin = async (req, res) => {
  let message = await userService.registerNewUser(req.body);
  return res.status(200).json(message);
};

let handeleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

let handeleDeleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        errCode: 1,
        message: "Missing required parameter: id",
      });
    }

    const message = await userService.deleteUser(id);

    return res.status(200).json({
      success: true,
      message: message || "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      errCode: 500,
      message: "Internal Server Error",
    });
  }
};

let fbLogin = async (req, res, next) => {
  try {
    const { code } = req.query;
    const redirectUri = `${process.env.URL_REACT}/auth/facebook`;

    const params = new URLSearchParams();
    params.append("client_id", process.env.FB_ID);
    params.append("client_secret", process.env.FB_SECRET);
    params.append("redirect_uri", redirectUri);
    params.append("code", code);

    const response = await axios.post(
      "https://graph.facebook.com/v18.0/oauth/access_token",
      params,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = response.data;

    // Get user data from Facebook API
    const userData = await getUserData(data.access_token);

    const existingUser = await db.User.findOne({ email: userData.email });
    if (existingUser) {
      const accessToken = await signAccessToken(existingUser);
      return res.json({ user: existingUser, accessToken });
    }

    const newUser = new User({
      firstName: userData.username,
      lastName: userData.username,
      email: userData.email,
      password: generateRandomPassword(10),
      createdAt: new Date().toISOString(),
    });

    const savedUser = await newUser.save();
    const accessToken = await signAccessToken(savedUser);

    return res.json({
      user: {
        id: savedUser.id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        image: savedUser.image,
        roleId: savedUser.roleId,
        positionId: savedUser.positionId,
      },
      accessToken,
    });
  } catch (error) {
    return next(error);
  }
};

const generateRandomPassword = (length) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < length; ++i) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
};
const signAccessToken = (user) => {
  return new Promise((resolve, reject) => {
    /** Tạo payload cho token từ thông tin của user */
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      roleId: user.roleId,
    };

    /** Sử dụng JWT để ký và tạo token với payload đã tạo */
    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          /** Gửi lỗi, (từ chối) reject Promise với lỗi là 500 nếu có lỗi trong quá trình tạo token */
          console.log(err.message);
          return reject(createHttpError.InternalServerError());
        }

        /** Nếu không có lỗi, (giải quyết) resolve Promise và trả về token đã tạo */
        return resolve(token);
      }
    );
  });
};

const getUserData = async (accessToken) => {
  try {
    const response = await axios.get("https://graph.facebook.com/me", {
      params: {
        access_token: accessToken,
        fields: "id, name, email", // Specify the fields you want to retrieve
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch user data");
    }
  } catch (error) {
    throw new Error(`Error getting user data: ${error.message}`);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({
        err: 1,
        msg: "Email không được bỏ trống",
      });
    }
    const response = await userService.forgotPasswordService(email);
    if (response.err === 0) {
      const resetToken = response.passwordTokenDate;
      const html = `
        <p style=" font-weight: 500; font-size: 14px">
        You received this email because you or someone else requested a password reset
        </p>
        <p style="font-weight: 500; font-size: 14px">
        Click here to reset your password, this request will expire after 15 minutes:
        </p>
        <button style="padding: 14px; background-color: #181460; border-radius: 5px; border-style: none; cursor: pointer">
          <a href=${process.env.URL_REACT}/resetpassword/${resetToken}
            style="color:white; text-decoration-line: none; font-size: 14px; font-weight: 700">
            Update password
          </a>
        </button>
        <p style= font-weight: 500; font-size: 14px">If you did not request a password reset, you can ignore this email</p>
        <p style="font-weight: 500; font-size: 14px">Thank you </p>
        <p style="font-weight: 500; font-size: 14px"> Booking Dental Clinic will Support Team!</p>
        
        <img src='https://i.pinimg.com/564x/20/db/a3/20dba3382d22133f4f456848a3d76e70.jpg'
          style="width: 20rem; border-radius: 5px;" alt="thumbnail">
      `;
      await sendMail({
        email,
        html,
        subject: "[Booking Dental Clinic] Password Reset E-Mail",
      });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  const message = await userService.resetPasswordService(password, token);
  return res.status(200).json(message);
};

const getAllCode = async (req, res) => {
  try {
    setTimeout(async () => {
      let data = await userService.getAllCodeService(req.query.type);
      return res.status(200).json(data);
    }, 500);
  } catch (e) {
    console.log("get all code error", e);
    return res.status(200).json({
      errorCode: -1,
      errMessage: "Error from sever",
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handeleCreateNewUser: handeleCreateNewUser,
  handeleEditUser: handeleEditUser,
  handeleDeleteUser: handeleDeleteUser,
  fbLogin: fbLogin,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  handleSignin: handleSignin,
  getAllCode: getAllCode,
};
