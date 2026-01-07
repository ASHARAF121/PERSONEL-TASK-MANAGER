const User =  require('../models/client');
const Task = require('../models/task'); // Make sure you have a Task model

exports.createNewUser = async(data)=>{
    try {
        const newUser =  new User(data)
        await  newUser.save();
        return {message:'user has been registered'}
        
    } catch (error) {

        throw new Error('error creating new user')
        
    }

}

exports.getUserById = async(userId)=>{
    try {
        const user = await User.findById(userId).select('-password');
        return user;
    } catch (error) {
        throw new Error('failed to get user')
        
    }

}


exports.updateUserById = async(updateid,updatedata)=>{
    try {
        await User.findByIdAndUpdate(updateid,updatedata);
        return {message : 'user has been updated'}
        
    } catch (error) {
        throw new Error('error updating user')
        
    }

} 

exports.authenticateUser = async(username,password)=>{
    try {
        
        const user = await User.findOne({username,password})
   
        // console.log(user);
        if(!user){
            throw new Error('invalid cresdentials')
        }
        return user;
    } catch (error) {
       
        throw new Error('authentication')
        
    }
}
exports.getDailyTasksForUser = async(userId) => {
    try {
        // Fetch tasks for the user from MongoDB
        const tasks = await Task.find({ userId }).lean();
        return tasks;
    } catch (error) {
        throw new Error('error fetching daily tasks');
    }   
};
