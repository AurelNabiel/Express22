const UserModel = require("../models").paket;
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
  try {
    let body = req.body;
    const users = await UserModel.create(body);
    console.log(users);

    res.status(200).json({
      status: "Succes",
      messege: "Register Berhasil",
    });
  } catch (error) {
    console.log(error)
  }
};

module.exports = { register };
