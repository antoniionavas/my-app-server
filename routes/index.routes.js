const router = require("express").Router();


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


module.exports = router;
