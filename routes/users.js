const express = require('express')
const router = express.Router()
const usersCtrl = require('../controllers/users')
const { check, validationResult } = require('express-validator');


router.post('/signup',[check('email').isEmail().withMessage('Email is invalid'),check('password').isLength({min:3,max:20}).withMessage('Password is not valid')], usersCtrl.signup)
router.post('/login', usersCtrl.login)
router.get('/',usersCtrl.getAll)

module.exports = router;