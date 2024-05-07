const express = require('express')
const authorizeBearerToken = require('../middlewares/jsonwebtoken')
const AuthController = require('../controllers/AuthController')

const authRouter = () => {
    const router = express.Router();

    const controller = AuthController();

    router.post('/register', controller.register);

    router.post('/login', controller.login);
    router.get("/test", controller.test);

    // router.use(authorizeBearerToken);

    return router;
}

module.exports = authRouter
