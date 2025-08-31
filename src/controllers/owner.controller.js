const RestaurantModel = require("../models/restauran.model");

module.exports.signup = async (req, res) => {
    try {

        const { name, ownerEmail, password } = req.body;
        console.log(name)
        if (!name || !ownerEmail || !password) res.status(401).json("All fields are Required");
        const isEmailAlreadyRegistered = await RestaurantModel.findOne({ ownerEmail: ownerEmail });
        if (isEmailAlreadyRegistered) res.status(401).json("Email Already Registerd with a Restaurant");
        console.log("this line is called")
        const hashedPassword = await RestaurantModel.hashPassword(password);
        const owner = await RestaurantModel.create({
            name,
            ownerEmail,
            password: hashedPassword
        })
        const token = await owner.getJWT();
        res.cookie('token', token)
        res.status(201).json("Restaurant Created Successfully");

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
module.exports.signin = async (req, res) => {
    try {

        const { ownerEmail, password } = req.body;
        if (!ownerEmail || !password) return res.status(401).json("All fields are Required");
        const owner = await RestaurantModel.findOne({ ownerEmail });
        if (!owner) res.status(401).json("Invalid Credentials");
        const isHashedPassword = await owner.comparePassword(password);
        if (!isHashedPassword) res.status(401).json("Invalid Credentials");
        const token = await owner.getJWT();
        res.cookie('token', token);
        res.status(201).json("Logged In Successfully");

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
module.exports.createDish = async (req, res) => {
    try {
        const id = req.owner;
        if(!id) return res.status(401).json({message:"Invalid User"})
        
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}
// module.exports.PrintHelloworld = async (req,res) => {
//     res.json("Hellow world")
// }
module.exports.logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        res.cookies('token', '');


    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}