const router = require("express").Router();
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const uploader = require("../middlewares/cloudinary.js");

//GET /api/user/list-users => listamos todo los usuarios de nuestra web
router.get("/list-users", async (req, res, next) => {
    try {
      const allUsers = await User.find({ role: "user" });
      res.json("lista de usuarios mostrada", allUsers)
    } 
    
    catch (error) {
      next(error);
    }
});

//GET "/api/user/my-profile" => envia los detalles de un usuario por su id
router.get("/my-profile", isAuthenticated, async (req, res, next) => {
    try {
      const response = await User.findById(req.payload._id)
       res.json(response)
    }
    
    catch (error) {
        next(error)
    }
})

//DELETE "/api/user/auto-delete" => borrar usuario por su id
router.delete("/auto-delete", isAuthenticated, async (req, res, next) => {
    const userId = req.payload._id
    try {
        await User.findByIdAndDelete(userId)
        res.json("el usuario ha sido borrado", userId)

    }  catch (error) {
       next(error)
    }
})

//PUT "/api/user/update" => actualizar toda la info de un usuario
router.put("/update", isAuthenticated, uploader.single("profileImg"), async (req, res, next) => {
    console.log(req.body)
    const userId = req.payload._id;

    const { 
        username, 
        email, 
        password, 
        confirmPassword,
        genre,
        dateborn,
        profileImg, 
        city,
        offerType,} = req.body
    
    try {
        let datebornToUpdate = dateborn;
        let profileImgUpdate = req.body.profileImg;

        //condicional que si no introduces fecha nueva no actualiza y deja la anterior
        if (!dateborn) {
            datebornToUpdate = dateborn;
        }
        //condicional que si no introduces foto nueva no actualiza y deja la anterior
        if (!req.file) {
            profileImgUpdate = profileImg;
        }

        await User.findByIdAndUpdate(userId, {
        username, 
        email, 
        password, 
        confirmPassword,
        genre, 
        dateborn: datebornToUpdate, 
        city,
        profileImg: profileImgUpdate, 
        offerType,
        })
        res.json("usuario actualizado", userId)

    }  catch (error) {
       next(error)
    }
})

module.exports = router;



