const ImageObject = require('../models/ImageObject')
const asyncHandler = require('express-async-handler')


const ImageController = () => {
    const createImage = asyncHandler(async (req, res) => {
        try {
            console.log(req.body)
            const { imageLink, category, userID, username } = req.body;
            console.log(imageLink, category, userID, username)
            const newImage = new ImageObject({ imageLink, category, user: userID, username });
            await newImage.save();
            res.status(201).json({ message: 'Image created successfully', data: newImage });
        } catch (error) {
            res.status(500).json({ message: 'Failed to create image', error: error.message });
        }
    });

    const updateImage = asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            const { category } = req.body;
            console.log("updateImage", id, category)
            const updatedImage = await ImageObject.findByIdAndUpdate(id, { category: category }, { new: true });
            if (!updatedImage) {
                return res.status(404).json({ message: 'Image not found' });
            }
            res.status(200).json({ message: 'Image updated successfully', data: updatedImage });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update image', error: error.message });
        }
    });

    const deleteImage = asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            const deletedImage = await ImageObject.findByIdAndDelete(id);
            if (!deletedImage) {
                return res.status(404).json({ message: 'Image not found' });
            }
            res.status(200).json({ message: 'Image deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete image', error: error.message });
        }
    });

    const getAllImages = asyncHandler(async (req, res) => {
        try {
            const images = await ImageObject.find({});
            res.status(200).json({ message: 'Images retrieved successfully', data: images });
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve images', error: error.message });
        }
    });

    const getImagesByUserId = asyncHandler(async (req, res) => {
        try {
            const { userID } = req.params;
            const images = await ImageObject.find({ user: userID });
            if (!images.length) {
                return res.status(404).json({ message: 'No images found for this user' });
            }
            res.status(200).json({ message: 'Images retrieved successfully', data: images });
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve images', error: error.message });
        }
    });
        
    return {
        createImage,
        updateImage,
        deleteImage,
        getAllImages,
        getImagesByUserId
    }
}

module.exports = ImageController;

