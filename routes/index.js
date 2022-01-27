const express = require("express");
const { register } = require("../controller/AuthController");
const { index, detail, detailByCode, destroy, update } = require("../controller/UserController");
const validationMiddleware = require("../middleware/ValidationMiddleware");
const { registerValidator } = require("../validator/AuthValidator");
const router = express.Router();


router.get("/", (req, res) => {
  res.json({
    status: "Ok",
  });
});


// GET USER ALL //
router.get('/product',index)
// // GET USER DETAIL // 
router.get('/product/:id',detail)
// //GET USER CODE//
router.get('/product/code/:codeProduct',detailByCode)

// //DELETE//
router.delete('/product/:id',destroy)
// UPDATE //
router.put('/product/update/:id',update)

// REGISTER //
router.post("/register",registerValidator, validationMiddleware, register);


module.exports = router;
