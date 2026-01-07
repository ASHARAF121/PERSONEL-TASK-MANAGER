const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    username : String,
    password : String,
    role : {type:String,default:'user'}

    
    

})

  const Client = mongoose.model('Client',ClientSchema);

  module.exports =Client;