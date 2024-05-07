const express = require('express');
const imageController = require('../controllers/imageController');

const imageRouter = () => {
    const router = express.Router();
    const controller = imageController();

    // Route to handle image creation
    router.post('/create', controller.createImage);

    // Route to handle image update
    router.put('/update/:id', controller.updateImage);

    // Route to handle image deletion
    router.delete('/delete/:id', controller.deleteImage);

    // Route to get all images
    router.get('/all', controller.getAllImages);

    // Route to get images by user ID
    router.get('/user/:userID', controller.getImagesByUserId);

    return router
}

module.exports = imageRouter;
