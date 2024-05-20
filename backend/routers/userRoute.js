const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const authentication = require("../middlewares/authenticate");

router.post("/google-login", UserController.googleLogin);
router.post("/login", UserController.login);

router.post("/register", UserController.register);

router.use(authentication);
router.get("/", UserController.getUserId);
router.patch(
    "/:id/imageUrl",
    upload.single("imageUrl"),
    UserController.patchImageUrl
);
// router.patch(
//     "/:id/imgUrl",
//     upload.single("imgUrl"),
//     UserController.patchImgUrl
// );

module.exports = router;
