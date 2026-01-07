require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET;
const {createNewUser,updateUserById,authenticateUser} = require('../helpers/helper');
const { getDailyTasksForUser } = require('../helpers/helper');


exports.register = async(req,res)=>{
    try{
        const {username,password} = req.body
        const newUser = await createNewUser({username,password})
        res.status(201).json(newUser)



    }catch(err){
        res.status(500).json({message:'error registering user'})

    }

}
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Authenticate user credentials
        const user = await authenticateUser(username, password);

        // Check if secret key is missing
        if (!secretKey) {
            return res.status(500).send('Internal server error: secret key is missing');
        }

        // Invalid credentials
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

        // Fetch dashboard data (daily tasks)
        try {
            const dailyTasks = await getDailyTasksForUser(user.name);
            const dashboardInfo = {
                username: user.username,
                role: user.role,
                dailyTasks
            };

            // Send the response with token and dashboard info
            res.json({ message: 'Logged in successfully', token, dashboard: dashboardInfo });

        } catch (error) {
            // Handle error in fetching dashboard data
            console.error('Error fetching daily tasks:', error);
            return res.status(500).json({ message: 'Error fetching dashboard data' });
        }

    } catch (error) {
        // General error handling (for cases like database issues, etc.)
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateUserProfile = async(req,res)=>{
    try {
        const{username,password,role}     = req.body
        await updateUserById(req.user.userId,{username,password,role})
        res.json({message:'user has been updated'})
    } catch (error) {
        res.status(500).send('Error upating user')
        
    }
}