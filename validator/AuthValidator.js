const { check } = require("express-validator");
const UserModel = require("../models").paket;

const registerValidator = [
  check("productName").isLength({ min: 1 }).withMessage("Product Wajib Diisi"),
  check("valueProduct").isLength({ min: 1 }).withMessage("jumlah Product Wajib Diisi"),
  check("oneProduct").isLength({ min: 1 }).withMessage("harga Product Wajib Diisi"),
  check("codeProduct")
    .custom((value) => {
      return UserModel.findOne({ where: { codeProduct: value } }).then((user) => {
        if (user) {
          return Promise.reject("Code Telah Digunakan");
        }
      });
    }),
];


module.exports={registerValidator}