const express = require("express");
const { register } = require("../controller/AuthController");
const { index, detail, detailByEmail, destroy, update } = require("../controller/UserController");
const validationMiddleware = require("../middleware/ValidationMiddleware");
const { registerValidator } = require("../validator/AuthValidator");
const router = express.Router();


router.get("/", (req, res) => {
  res.json({
    status: "Ok",
  });
});

// GET USER ALL //
router.get('/users',index)
// GET USER DETAIL // 
router.get('/users/:id',detail)
//GET USER EMAIL//
router.get('/users/email/:email',detailByEmail)
//DELETE//
router.delete('/users/:id',destroy)
// UPDATE //
router.put('/users/update/:id',update)

// REGISTER //
router.post("/register", registerValidator, validationMiddleware, register);


module.exports = router;
