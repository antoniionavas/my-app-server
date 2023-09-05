const router = require("express").Router();
const Offer = require("../models/Offer.model")
const Band = require("../models/Band.model")

//GET "/api/offer" => mostrar todas las ofertas
router.get("/", async (req,res,next) => {
    try {
        const allOffers = await Offer.find()
        res.json("Mostrando todas las ofertas disponibles",allOffers)
    } 
    catch (error) {
        next(error)
    }
})

//POST "/api/offer" => recibir datos para crear una nueva oferta
router.post("/create", async (req,res,next) => {
    try {
        console.log(req.body)
        const currentDate = new Date().getTime();
        console.log(currentDate)
        const thisBand = await Band.findById(req.params._id);
        const response = await Offer.create({
            band: thisBand,
            title: req.body.title,
            genre: req.body.genre,
            description: req.body.description,
            salary: req.body.salary,
            offerType: req.body.offerType,
            initialDate: currentDate,
            finalDate: req.body.finalDate,
        })
        res.json("nueva oferta creada")
        console.log("esta es mi oferta creada",response)
    } 
    
    catch (error) {
        next(error)
    }
})

//GET "/api/offer/:offerId" => envia los detalles de una oferta por su id
router.get("/:offerId", async (req, res, next) => {
    try {
      const response = await Offer.findById(req.params.offerId)
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

module.exports = router;