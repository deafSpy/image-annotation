const ImageObject = require('../models/ImageObject')


const ImageController = () => {
    const createImage = async (req, res) => {
        try {
            const { imageLink, category, userID } = req.body;
            const newImage = new ImageObject({ imageLink, category, user: userID });
            await newImage.save();
            res.status(201).json({ message: 'Image created successfully', data: newImage });
        } catch (error) {
            res.status(500).json({ message: 'Failed to create image', error: error.message });
        }
    };

    const updateImage = async (req, res) => {
        try {
            const { id } = req.params;
            const { imageLink, category, userID } = req.body;
            const updatedImage = await ImageObject.findByIdAndUpdate(id, { imageLink, category, user: userID }, { new: true });
            if (!updatedImage) {
                return res.status(404).json({ message: 'Image not found' });
            }
            res.status(200).json({ message: 'Image updated successfully', data: updatedImage });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update image', error: error.message });
        }
    };

    const deleteImage = async (req, res) => {
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
    };

    const getAllImages = async (req, res) => {
        try {
            const images = await ImageObject.find({});
            res.status(200).json({ message: 'Images retrieved successfully', data: images });
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve images', error: error.message });
        }
    };

    const getImagesByUserId = async (req, res) => {
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
    };
        
    return {
        createImage,
        updateImage,
        deleteImage,
        getAllImages,
        getImagesByUserId
    }
}

module.exports = ImageController;

