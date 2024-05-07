const express = require('express');
const UserController = require('../controllers/UserController');

const userRouter = () => {
    
    const router = express.Router();
    const controller = UserController();

    router.post('/', controller.createUser);
    router.put('/:id', controller.updateUser);
    router.delete('/:id', controller.deleteUser);
    router.get('/:id', controller.getUserById);
    router.get('/name/:name', controller.getUserByName);
    router.get('/', controller.listUsers);

    return router;
}

module.exports = userRouter;
