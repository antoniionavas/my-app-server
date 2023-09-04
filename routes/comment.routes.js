const router = require("express").Router();
const Comment = require("../models/Comment.model")
const User = require("../models/User.model")

//POST /api/:userId => creo un comentario en nuestra seccion de detalles de user
router.post("/:userId", async (req, res, next) => {
  try {
    let stars = "";
    if (req.body.valoration === "1") {
      stars = "⭐";
    } else if (req.body.valoration === "2") {
      stars = "⭐⭐";
    } else if (req.body.valoration === "3") {
      stars = "⭐⭐⭐";
    } else if (req.body.valoration === "4") {
      stars = "⭐⭐⭐⭐";
    } else if (req.body.valoration === "5") {
      stars = "⭐⭐⭐⭐⭐";
      console.log("comentarios estrellas", stars);
    }
    
    //Condicional para comprobar si no se escribe nada en la descripcion del comentario
    if (req.body.description === "" || stars === "") {
      res.status(400).json({
          errorMessage:
          "Debes rellenar todos los campos para publicar tu reseña",
        });
        return;
      }
      const currentDate = new Date().getTime();
      const thisUser = await User.findById(req.params.userId);
      const newCommment = await Comment.create({
        owner: req.session.user._id,
        description: req.body.description,
        valoration: stars,
        user: thisUser,
        date: currentDate,
      });
      console.log("nuevo comentario", newCommment);
    } catch (error) {
      next(error);
    }
  });
  
//GET "/api/:userId/comment" => mostrar todos los comentarios
router.get("/:userId", async (req,res,next) => {
    try {
        const allComments = await Comment.find()
        res.json("Mostrando todos los comentarios", allComments)
    } 
    catch (error) {
        next(error)
    }
  })

//POST /api/:userId/:commentId => Elimina un comentario
router.delete(
    "/:userId/:commentId",
    async (req, res, next) => {
      try {
        const thisUser = await User.findById(req.params.userId);
        console.log("id del usuario que posee el comentario", thisUser)
        const oneComment = await Comment.findByIdAndDelete(req.params.commentId);
        console.log("comentario a borrar", oneComment);
        res.json("comentario eliminado")
      } catch (error) {
        next(error);
      }
    }
    );

module.exports = router;