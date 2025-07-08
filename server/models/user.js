const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    tasks:[{
        type:Schema.Types.ObjectId,
        ref:"task",
    }]
});

module.exports = mongoose.model("User" ,userSchema);