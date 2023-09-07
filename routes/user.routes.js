const router = require("express").Router();
const User = require("../models/User.model");
const Band = require("../models/Band.model")
const isAuthenticated = require("../middlewares/isAuthenticated");
const uploader = require("../middlewares/cloudinary.js");

//GET /api/user/list-users => listamos todo los usuarios de nuestra web
router.get("/list-users", async (req, res, next) => {
    try {
      const allUsers = await User.find( { role: "user" });
      console.log("lista de usuarios mostrada")
      res.json(allUsers)
    } 
    catch (error) {
      next(error);
    }
});

//GET "/api/user/my-profile" => envia los detalles de un usuario por su id
router.get("/my-profile", isAuthenticated, async (req, res, next) => {
    try {
      const response = await User.findById(req.payload._id).populate("bandFav")
       res.json(response)
    }
    
    catch (error) {
        next(error)
    }
})

//DELETE "/api/user/delete/:userId" => borrar usuario por su id
router.delete("/delete/:userId", isAuthenticated, async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.json("el usuario ha sido borrado")

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
        genre,
        dateborn,
        city,
        profileImg,
        offerType,} = req.body
    
    try {
       
        let datebornToUpdate = dateborn;
       
        //condicional que si no introduces fecha nueva no actualiza y deja la anterior
        if (!dateborn) {
            datebornToUpdate = dateborn;
        }
            
    
        await User.findByIdAndUpdate(userId, {
        username, 
        genre, 
        dateborn: datebornToUpdate, 
        city,
        profileImg, 
        offerType,
        })
        res.json("usuario actualizado")

    }  catch (error) {
       next(error)
    }
})

//POST /user/:bandId/fav => Añadimos a las bandas favoritas de la base de datos 
router.post("/:bandId/fav", isAuthenticated, async (req, res, next) => {
    try {
      const oneBand = await Band.findById(req.params.bandId);
      const user = await User.findById(req.payload._id);
  
      if (user.bandFav.includes(oneBand)) {
        await User.findByIdAndUpdate(req.payload._id, {
          $pull: { bandFav: oneBand },
        });
      } else {
        await User.findByIdAndUpdate(req.payload._id, {
          $addToSet: { bandFav: oneBand },
        });
      }
      console.log("la banda",oneBand)
      console.log("user", user)
      res.json("La banda se ha añadido a las bandas favs")
    } catch (error) {
      next(error);
    }
  });
  
//POST /user/:bandId/fav => Eliminamos la banda de favoritas de la base de datos los lugares
router.post("/:bandId/delete", isAuthenticated, async (req, res, next) => {
    try {
      const oneBand = await Band.findById(req.params.bandId);
      const deleteBandFav = await User.findByIdAndUpdate(req.payload._id, {
        $pull: { bandFav: req.params.bandId },
      });
      console.log(oneBand)
      console.log(deleteBandFav)
      res.json("La banda se ha eliminado de las bandas favs")
    } catch (error) {
      next(error);
    }
  });



module.exports = router;



