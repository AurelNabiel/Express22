const express = require("express");
const { register, login, authme } = require("../controller/AuthController");
const paginationMiddleware = require("../middleware/paginationMiddleware")
const { index, detail, detailByEmail, destroy, update, createMany } = require("../controller/UserController");
const validationMiddleware = require("../middleware/ValidationMiddleware");
const { registerValidator } = require("../validator/AuthValidator");
const jwtMiddleware = require("../middleware/jwtMiddleware")
const router = express.Router();


router.get("/", (req, res) => {
  res.json({
    status: "Ok",
  });
});
router.post("/register", registerValidator, validationMiddleware, register);
// LOGIN //
router.post("/login", login);
//CREATE//
router.post("/users/create", createMany)


// router.use(jwtMiddleware)
router.use(paginationMiddleware)
// GET USER ALL //
router.get('/users',index)
// AUTHME //
router.get("/authme", authme);
// GET USER DETAIL // 
router.get('/users/:id',detail)
//GET USER EMAIL//
router.get('/users/email/:email',detailByEmail)
//DELETE//
router.delete('/users/:id',destroy)
// UPDATE //
router.put('/users/update/:id',update)
// REGISTER //




module.exports = router;
