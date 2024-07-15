import  mongoose  from "mongoose"
import  bcrypt  from "bcryptjs"
import { DB_STRING } from "./config.js"
import { number } from "zod"

mongoose.connect(DB_STRING)

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
        text:true,
        require:true,
        maxLength:50
    },
    lastName:{
        type:String,
        text:true,
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
        const salt = await bcrypt.genSalt(10)
    
        // Hash the password along with the generated salt
        user.password = await bcrypt.hash(user.password, salt) 
        next();
    } catch(err){
        next(err)
    }

})

userSchema.methods.comparePassword = function(userPassword) {
    return bcrypt.compare(userPassword, this.password)
}

export const User = mongoose.model("User", userSchema)

const accountSchema = mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

accountSchema.pre('save', async function(next) {
    if(!this.isModified('balance')){
        next()
    }

    this.balance = this.balance*100
})

export const Account = mongoose.model("Account", accountSchema)
