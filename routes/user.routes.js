const router = require("express").Router();
const User = require("../models/User.model")

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

//GET "/api/user/:userId" => envia los detalles de un usuario por su id
router.get("/:userId", async (req, res, next) => {

    try {
      const response = await User.findById(req.params.userId)
       res.json(response)
    }
    
    catch (error) {
        next(error)
    }

})

//DELETE "/api/user/:userId" => borrar usuario por su id
router.delete("/:userId", async (req, res, next) => {
    const {userId} = req.params
    try {
        await User.findByIdAndDelete(userId)
        res.json("el usuario ha sido borrado", userId)

    }  catch (error) {
       next(error)
    }
})

//PUT "/api/user/:userId" => actualizar toda la info de un usuario
router.put("/:userId", async (req, res, next) => {
    console.log(req.body)
    console.log(req.params)
    //falta la img con cloudinary
    const {userId} = req.params
    const { 
        username, 
        email, 
        password, 
        confirmPassword,
        genre, 
        dateborn, 
        city,
        offerType,} = req.body
    
    try {
        await User.findByIdAndUpdate(userId, {
        username, 
        email, 
        password, 
        confirmPassword,
        genre, 
        dateborn, 
        city,
        profileImg, 
        offerType,
        })
        res.json("usuario actualizado", userId)

    }  catch (error) {
       next(error)
    }
})





