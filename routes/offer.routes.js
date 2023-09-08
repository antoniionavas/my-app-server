const router = require("express").Router();
const Offer = require("../models/Offer.model")
const Band = require("../models/Band.model")
const User = require("../models/User.model")
const isAuthenticated = require("../middlewares/isAuthenticated");

//GET "/api/offer" => mostrar todas las ofertas
router.get("/", async (req,res,next) => {
    try {
        const allOffers = await Offer.find()
        console.log("Mostrando todas las ofertas disponibles")
        res.json(allOffers)
    } 
    catch (error) {
        next(error)
    }
})

//POST "/api/offer" => recibir datos para crear una nueva oferta
router.post("/:bandId/details/createOffer", async (req,res,next) => {
    try {
        console.log(req.body)
        const currentDate = new Date().getTime();
        console.log(currentDate)
        const response = await Offer.create({
            band: req.params.bandId,
            title: req.body.title,
            genre: req.body.genre,
            description: req.body.description,
            salary: req.body.salary,
            offerType: req.body.offerType,
            initialDate: currentDate,
            finalDate: req.body.finalDate,
        })
        res.json(response)
        console.log("esta es mi oferta creada")
    } 
    
    catch (error) {
        next(error)
    }
})

//GET "/api/offer/:offerId/details" => envia los detalles de una oferta por su id
router.get("/:offerId/details", async (req, res, next) => {
    try {
      const response = await Offer.findById(req.params.offerId).populate("band")
      res.json(response)
    }
    
    catch (error) {
        next(error)
    }
})

//DELETE "/api/offer/:offerId" => borrar oferta por su id
router.delete("/:offerId", async (req, res, next) => {
    const {offerId} = req.params
    try {
        await Offer.findByIdAndDelete(offerId)
        res.json("oferta borrada correctamente")

    }  catch (error) {
       next(error)
    }

})

//PUT "/api/offer/:offerId" => actualizar toda la info de una oferta
router.put("/:offerId", async (req, res, next) => {
    console.log(req.body)
    console.log(req.params)

    const {offerId} = req.params
    const {title, genre, description, salary, offerType, initialDate, finalDate} = req.body
    
    try {
        await Offer.findByIdAndUpdate(offerId, {
        title,
        genre, 
        description,
        salary,
        offerType,
        initialDate,
        finalDate
        })
        res.json("oferta actualizada correctamente")

    }  catch (error) {
       next(error)
    }
})

//POST /offer/:offerId/subscribers => Añadimos user de suscriptores de la oferta
router.post("/:offerId/subscribers", isAuthenticated, async (req, res, next) => {
    try {
      const oneOffer = await Offer.findById(req.params.offerId);
      const user = await User.findById(req.payload._id);
  
      if (oneOffer.subscribers.includes(user)) {
        await Offer.findByIdAndUpdate(req.params.offerId, {
          $pull: { subscribers: user },
        });
      } else {
        await Offer.findByIdAndUpdate(req.params.offerId, {
          $addToSet: { subscribers: user },
        });
      }
      console.log("la oferta",oneOffer)
      console.log("user", user)
      res.json("El usuario se ha inscrito a la oferta")
    } catch (error) {
      next(error);
    }
  });
  
//POST /offer/:offerId/subscribers => Elimino user de suscriptores de la oferta
router.post("/:offerId/subscribers/delete", isAuthenticated, async (req, res, next) => {
    try {
      const oneUser = await User.findById(req.payload._id);
      const deleteSubscriber = await Offer.findByIdAndUpdate(req.params.offerId, {
        $pull: { subscribers: req.payload._id },
      });
      console.log("id de la oferta",req.params.offerId)
      console.log(deleteSubscriber)
      res.json("El usuario se ha eliminado de la oferta")
    } catch (error) {
      next(error);
    }
  });



module.exports = router;