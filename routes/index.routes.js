const router = require("express").Router();
const uploader = require("../middlewares/cloudinary.js");


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter);

const userRouter = require("./user.routes")
router.use("/user", userRouter);

const bandRouter = require("./band.routes.js");
router.use("/band", bandRouter);

const offerRouter = require("./offer.routes.js");
router.use("/offer", offerRouter);

const commentRouter = require("./comment.routes.js");
router.use("/comment", commentRouter);


// POST "/api/upload" => ruta que sube la img de perfil del usuario al cloudinary
router.post("/upload", uploader.single("image"), (req, res, next) => {

  if (!req.file) {
    next("No file uploaded!");
    return;
  }

  res.json({ profileImg: req.file.path });
});


module.exports = router;
