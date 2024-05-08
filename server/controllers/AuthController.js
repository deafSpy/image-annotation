const joi = require('joi');
const bcrypt = require('bcrypt');
const Account = require('../models/Account');
const { signToken } = require('../middlewares/jsonwebtoken');
const asyncHandler = require('express-async-handler')

const AuthController = () => {

    const register = asyncHandler(async (request, response) => {
        try {
            // Validate request data
            await joi.object({
                email: joi.string().email().required(),
                username: joi.string().required(),
                first_name: joi.string().required(),
                last_name: joi.string().required(),
                password: joi.string().required(),
            }).validateAsync(request.body);
        } catch (error) {
            return response.status(400).json({
                error: 'ValidationError',
                message: error.message,
            });
        }

        try {
            const { email, username, first_name, last_name, password } = request.body;

            // Verify account email as unique
            const existingAccount = await Account.findOne({ email });
            if (existingAccount) {
                return response.status(400).json({
                    error: 'Duplicate Email',
                    message: 'An account already exists with that email',
                });
            }

            // Verify account username as unique
            const existingUsername = await Account.findOne({ username });
            if (existingUsername) {
                return response.status(400).json({
                    error: 'Duplicate Username',
                    message: 'An account already exists with that username',
                });
            }

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            
            // Create account
            const newAccount = new Account({ email, username, first_name, last_name, password: hash });
            await newAccount.save();
            
            // Generate access token
            const token = signToken({ uid: newAccount._id, role: newAccount.role });
            
            response.status(201).json({
                message: 'Successfully registered',
                data: {
                    id: newAccount._id,
                    email: newAccount.email,
                    username: newAccount.username,
                    first_name: newAccount.first_name,
                    last_name: newAccount.last_name,
                },
                token,
            });
        } catch (error) {
            console.error(error);
            return response.status(500).send();
        }
    });

    const login = asyncHandler(async (request, response) => {
        try {
            // Validate request data
            await joi.object({
                email: joi.string().email().required(),
                password: joi.string().required(),
            }).validateAsync(request.body);
        } catch (error) {
            return response.status(400).json({
                error: 'ValidationError',
                message: error.message,
            });
        }

        try {
            const { email, password } = request.body;

            // Get account from DB, and verify existence
            const foundAccount = await Account.findOne({ email });
            if (!foundAccount) {
                return response.status(400).json({
                    message: 'Bad credentials',
                });
            }

            // Decrypt and verify password
            const passOk = await bcrypt.compare(password, foundAccount.password);
            if (!passOk) {
                return response.status(400).json({
                    message: 'Bad credentials',
                });
            }

            // Generate access token
            const token = signToken({ uid: foundAccount._id, role: foundAccount.role });

            response.status(200).json({
                message: 'Successfully logged-in',
                data: { email: foundAccount.email, id: foundAccount._id },
                token,
            });
        } catch (error) {
            console.error(error);
            return response.status(500).send();
        }
    })

    return {
        register,
        login
    }
}

module.exports = AuthController;
