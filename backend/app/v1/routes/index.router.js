const express = require('express')
const router = express.Router()
const authenticationRoutes = require('./authentication.router.js')
const authenticationController = require('../controllers/authentication.controller.js')

router.post('/login', authenticationController.logIn)
// router.post('/signup', authenticationController.createUser)
router.post('/signup-request', authenticationController.signupRequest);
router.post('/approve-signup', authenticationController.approveSignupRequest);
router.post('/reject-signup', authenticationController.rejectSignupRequest);
// forget password remaining

// -------Authenticated Routes------
router.use('/auth', authenticationRoutes)

module.exports = router
