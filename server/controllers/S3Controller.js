const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs")

// Configure AWS to use promise
AWS.config.setPromisesDependency(require('bluebird'));

// Configure the region and credentials

const s3 = new AWS.S3({
    region: process.env.REGION, // Change to your region
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});


const S3Controller = () => {

    const uploadFile = async (req, res) => {
        console.log("trying to upload file")
        const { name, image } = req.body;
        console.log("image", req.body.name, image)
        console.log("req", req)
        if (!image) {
            return res.status(400).json({ message: 'image is required' });
        }
        console.log("trying to upload image2")

        const s3Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${uuidv4()}-${name}`,
            Body: fs.createReadStream(image.path),
        };
        console.log(s3Params)

        console.log("trying to upload to s3")
        
        try {
            const data = await s3.upload(s3Params).promise();
            console.log("dta", data)
            res.status(200).json({ message: 'image uploaded successfully', data: data.Location });
        } catch (error) {
            res.status(500).json({ message: 'Failed to upload image', error: error.message });
        }
    };

    const getFile = async (req, res) => {
        const { key } = req.params;
        if (!key) {
            return res.status(400).json({ message: 'File key is required' });
        }

        const s3Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key
        };

        try {
            const data = await s3.getObject(s3Params).promise();
            res.status(200).send(data.Body);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve file', error: error.message });
        }
    };

    const deleteFile = async (req, res) => {
        const { key } = req.params;
        if (!key) {
            return res.status(400).json({ message: 'File key is required' });
        }

        const s3Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key
        };

        try {
            await s3.deleteObject(s3Params).promise();
            res.status(200).json({ message: 'File deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete file', error: error.message });
        }
    };

    const listAllFiles = async (req, res) => {
        const s3Params = {
            Bucket: process.env.S3_BUCKET_NAME
        };

        try {
            const data = await s3.listObjectsV2(s3Params).promise();
            const files = data.Contents.map(file => ({
                Key: file.Key,
                LastModified: file.LastModified,
                Size: file.Size
            }));
            res.status(200).json({ message: 'Files retrieved successfully', data: files });
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve files', error: error.message });
        }
    };

    return {
        uploadFile,
        getFile,
        deleteFile,
        listAllFiles
    };
};

module.exports = S3Controller;

