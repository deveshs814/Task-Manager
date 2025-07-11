const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    priority :{
        type: String,
        required:true,
        enum:["Low","Medium","High"],
        default:"low"
    },
    status:{
        type: String,
        required:true,
        enum:["yetToStart","inProgress","completed"],
        default:"yetToStart"
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // optional but good practice
  },
});

module.exports = mongoose.model("task" ,taskSchema);