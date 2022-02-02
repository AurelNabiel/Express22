const UserModel = require("../models").usr;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { validationResult } = require("express-validator");

const register = async (req, res) => {
  try {
    let body = req.body;
    body.password = await bcrypt.hashSync(body.password, 10);
    const users = await UserModel.create(body);
    console.log(users);

    res.status(200).json({
      status: "Succes",
      messege: "Register Berhasil",
    });
  } catch (error) {}
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (user === null) {
      return res.status(422).json({
        status: "Fail",
        msg: "Email belum terdaftar",
      });
    }

    const verify = bcrypt.compareSync(password, user.password);

    if (!verify) {
      return res.status(422).json({
        status: "fail",
        msg: "Password tidak cocok",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    return res.json({
      status: "Success",
      msg: "Anda berhasil login",
      token: token,
    });
  } catch (err) {}
};

module.exports = { register, login };
