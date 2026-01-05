const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    username : String,
    password : String,
    
    

})

  const Client = mongoose.model('Client',userSchema);

  module.exports =Client;