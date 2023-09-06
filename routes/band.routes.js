const router = require("express").Router();
const Band = require("../models/Band.model")
const isAuthenticated = require("../middlewares/isAuthenticated");

//GET "/api/band" => mostrar todas las bandas
router.get("/", async (req,res,next) => {
    try {
        const allBands = await Band.find()
        console.log("todas las bandas")
        res.json(allBands)
    } 
    catch (error) {
        next(error)
    }
})

//POST "/api/band" => recibir datos para crear una nueva banda
router.post("/create", isAuthenticated, async (req,res,next) => {
    try {
        console.log(req.body)
        const response = await Band.create({
            name: req.body.name,
            genre: req.body.genre,
            city: req.body.city,
            owner: req.payload._id,
            foundationDate: req.body.foundationDate
        })
        console.log("La nueva banda ha sido creada")
        res.json(response)
    } 
    catch (error) {
        next(error)
    }
})

//GET "/api/band/:bandId/details" => envia los detalles de una banda por su id
router.get("/:bandId/details", async (req, res, next) => {
    try {
      const bandDetails = await Band.findById(req.params.bandId)
       res.json(bandDetails)
       console.log("detalles de una banda")
    }
    catch (error) {
        next(error)
    }
})

//DELETE "/api/band/:bandId" => borrar una banda por su id
router.delete("/:bandId", async (req, res, next) => {
    const {bandId} = req.params
    try {
        await Band.findByIdAndDelete(bandId)
        res.json("banda eliminada")
    }  catch (error) {
       next(error)
    }
})

//PUT "/api/band/:bandId" => actualizar toda la info de una banda
router.put("/:bandId/edit", async (req, res, next) => {
    console.log(req.body)
    console.log(req.params)
    const {bandId} = req.params
    console.log("el id de la banda es",req.params.bandId)
    const {name, genre, city, foundationDate} = req.body
    
    try {
        await Band.findByIdAndUpdate(bandId, {
        name, 
        genre,
        city,
        foundationDate
        })
        console.log(bandId)
        res.json("los datos de la Banda han sido actualizados")

    }  catch (error) {
       next(error)
    }
})

module.exports = router;