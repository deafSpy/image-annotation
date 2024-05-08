const express = require('express');

const authRouter = require('./authRouter');
const imageRouter = require('./imageRouter');
const userRouter = require('./userRouter');
const s3Router = require('./s3Router');


const routes = (app) => {

    app.use('/api/auth', authRouter())
    app.use('/api/image', imageRouter())
    app.use('/api/user', userRouter())
    app.use('/api/s3', s3Router())


}

module.exports = routes;
