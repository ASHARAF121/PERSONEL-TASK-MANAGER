const express = require('express')
const Router = express.Router()
const Controller = require('../controllers/controller')

const checkAuth = require('../middlewares/middleware')



Router.post('/register', Controller.register)
Router.post('/login', Controller.login)
// Router.get('/profile', checkAuth, Controller.dashboardData)
Router.put('/update', checkAuth, Controller.updateUserProfile)


module.exports = Router;    