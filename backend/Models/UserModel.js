const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    email:{
    type: String,
    require: [true, "Email is required"],
    unique: true,
    },
    password:{
        type: String,
        require: [true, "Password is required"],
    },
    name:{
        type: String,
        require: true,
        
    },
    gioitinh:{
        type: String,
        require: true,
        
    },
    lop:{
        type: String,
        require: true,
        
    },
    phone:{
        type: Number,
        require: true
    }
        
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorect password");
    }
    throw Error("incorect Email");
};

module.exports = mongoose.model("User", userSchema);