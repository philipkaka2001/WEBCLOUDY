const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

//Create token
const createToken = (id) => {
    return jwt.sign({id}, "Philip super secret key", {
        expiresIn: maxAge,
    })
};
//Email already create
const handleErrors = (err) => {
    let errors = {email: "", password: ""};
    if(err.message ==="incorect Email")
        errors.email = "That email is not registered";
    
        if(err.message ==="incorect password")
        errors.email = "That password is incorect";
    
        if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }
    //xac thuc ng dung
    if(err.message.includes("User validation failed")){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message;  
        });
    }
    return errors;
};

module.exports.register = async (req, res, next) => {
    try{
        const {email, password} =req.body;
        const user = await UserModel.create({ email, password});
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCrdentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });
        res.status(201).json({user: user._id, created: true});
    }catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({errors, created: false});
    }
};

module.exports.login = async (req, res, next) => {
    try{
        const {email, password} =req.body;
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCrdentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });
        res.status(200).json({user: user._id, created: true});
    }catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({errors, created: false});
    }
};