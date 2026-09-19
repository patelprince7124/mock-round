const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username:String,
     email:String,
     password:String,
     confirm_password:String,
     status:Boolean,
     created_date:String,
     updated_date:String,

});
module.exports=mongoose.model("admin",adminSchema)




