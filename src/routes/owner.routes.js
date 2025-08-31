const express = require('express');
const { signup, signin, PrintHelloworld, createDish } = require('../controllers/owner.controller');
const { auth } = require('../middlewares/auth');
const router = express.Router();
router.post('/signup',signup)
router.post('/signin',signin)
router.get('/hello',auth,createDish)


module.exports = router;