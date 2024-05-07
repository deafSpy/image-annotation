const express = require('express');
const S3Controller = require('../controllers/S3Controller');

const s3Router = () => {
    const router = express.Router();
    const controller = S3Controller();

    router.get('/get/:key', controller.uploadFile);
    router.post('/upload', controller.uploadFile);
    router.delete('/delete/:key', controller.deleteFile);
    router.get('/files', controller.listAllFiles);

    return router;
}

module.exports = s3Router;
