const router = require("express").Router();
const Band = require("../models/Band.model")

//GET "/api/band" => mostrar todas las bandas
router.get("/", async (req,res,next) => {
    try {
        const allBands = await Band.find()
        res.json("mostrando todas las bandas",allBands)
    } 
    
    catch (error) {
        next(error)
    }
})

//POST "/api/band" => recibir datos para crear una nueva banda
router.post("/", async (req,res,next) => {
    try {
        console.log(req.body)
        await Band.create({
            name: req.body.name,
            genre: req.body.genre,
            city: req.body.city,
            foundationDate: req.body.foundationDate
        })
        res.json("la nueva banda ha sido creada")
    } 
    
    catch (error) {
        next(error)
    }
})

//GET "/api/band/:bandId" => envia los detalles de una banda por su id
router.get("/:bandId", async (req, res, next) => {
    try {
      const bandDetails = await Band.findById(req.params.bandId)
       res.json("detalles de una banda", bandDetails)
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
router.put("/:bandId", async (req, res, next) => {
    console.log(req.body)
    console.log(req.params)
    const {bandId} = req.params
    const {name, genre, city, foundationDate} = req.body
    
    try {
        await Band.findByIdAndUpdate(bandId, {
        name, 
        genre,
        city,
        foundationDate
        })
        res.json("los datos de la Banda han sido actualizados")

    }  catch (error) {
       next(error)
    }

})

module.exports = router;