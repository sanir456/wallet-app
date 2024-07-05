const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

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
        maxLength:50
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
    },
})

userSchema.pre('save', async function(next) {
    const user = this
    if(!user.isModified('password')){
        next()
    }

    try {
        const salt = await bcrypt.getSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
        next()
    } catch (err) {
        next(err)
    }
})

userSchema.method.comparePassword = async (userPassword) => {
    return bcrypt.compare(userPassword, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}