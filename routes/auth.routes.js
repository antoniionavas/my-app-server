const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require ("../models/User.model")
const jwt = require("jsonwebtoken")
const isAuthenticated = require("../middlewares/isAuthenticated")


//POST "/api/auth/signup" => registrar el usuario
router.post("/signup", async (req,res,next) => {

        console.log("body",req.body)
        const profileImg = "https://res.cloudinary.com/dzesrymee/image/upload/v1693588315/default-profile_ftagxc.jpg"
        const {
            username, 
            email, 
            password, 
            confirmPassword,
            genre, 
            dateborn, 
            city, 
            offerType,  
        } = req.body

         //VALIDACIONES 
        //validar todos los campos llenos
        if (!username || !email || !password || !confirmPassword || !genre || !dateborn || !city || !offerType) {
            res
            .status(404)
            .json({ errorMessage: "Todos los campos deben estar llenos" });
            return;
        }

        //validar que coinciden password
        if (password !== confirmPassword){
            res
            .status(404)
            .json({ errorMessage: "Las contraseñas no coinciden" });
        return;
        }

        //validar que el email tenga el formato pedido: usuario@dominio
        const regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (regexEmail.test(email) === false) {
            res
            .status(404)
            .json({errorMessage: "El email introducido no es válido." });
        return;
        }

        //validar que la contraseña tenga los caracteres pedidos: mayusc, minusc, caracter especial y leng: +=8
        const regexPassword =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        if (regexPassword.test(password, confirmPassword) === false) {
        res.status(400).json({errorMessage:
            "La contraseña debe contener mínimo una mayuscula, una minuscula, un caracter especial y tener 8 caracteres o más",
        });
        return;
        }
    
    try {

        //comprobamos si el usuario existe a traves del nombre / email
        const userFound = await User.findOne({
        $or: [{ email: email }, { username: username }],
        });
        // console.log(userFound);
        if (userFound !== null) {
        res.status(400).json({
          errorMessage:
            "Ya existe un usuario con el mismo nombre de usuario o correo electronico",
        });
        return;
        }

        //ciframos contraseña
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        console.log(hashPassword)

        //crear usuario 
        await User.create({
            username: username,
            email: email,
            password: hashPassword,
            genre: genre,
            city: city, 
            dateborn: dateborn, 
            offerType: offerType,
            profileImg: profileImg
        })
        res.json("usuario creado")
    }     
    catch (error) {
        next(error)
    }
})

//POST "/api/auth/login" => validar credenciales y crear la sesión del usuario
router.post("/login", async (req,res,next) => {

    const {email, password } = req.body
    console.log(req.body)

    //VALIDACIONES  
    try {
        // que exista el usuario
        const foundUser = await User.findOne({email})
        console.log(foundUser)
        if (foundUser === null){
            res
            .status(400)
            .json({ errorMessage: "Usuario no registrado" });
          return;
        }

        // contraseña correcta 
        const isPasswordValid = await bcrypt.compare(password, foundUser.password)
        if (isPasswordValid === false){
            res
            .status(400)
            .json({ errorMessage: "Contraseña no válida" });
          return;
        }

        //crea la sesion con sistema token
        const payload = {
            _id: foundUser._id,
            email: foundUser.email,
            role: foundUser.role
        }
        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {algorithm:"HS256", expiresIn:"3d"}
        )
        res.json({authToken})
    } 
    
    catch (error) {
        next(error)
    }
})

//GET "/api/auth/verify" => indica al frontend que el usuario está activo 
router.get("/verify", isAuthenticated, (req,res,next) => {
    console.log(req.payload)
    res.json(req.payload)
})

module.exports = router;