const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://root:1234567890@test.tzv3isg.mongodb.net/online-wallet")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    firstName:{
        type:String,
        require:true,
        minLength:6
    },
    lastName:{
        type:String,
        require:true,
        trim:true,
        maxLength:50
    },
    password:{
        type:String,
        require:true,
        trim:true,
        maxLength:50

    },
})

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}