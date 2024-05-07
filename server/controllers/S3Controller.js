const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Configure AWS to use promise
AWS.config.setPromisesDependency(require('bluebird'));

// Configure the region and credentials
AWS.config.update({
    region: process.env.REGION, // Change to your region
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const s3 = new AWS.S3();

const S3Controller = () => {
    const uploadFile = async (req, res) => {
        const { file } = req;
        if (!file) {
            return res.status(400).json({ message: 'File is required' });
        }

        const s3Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${uuidv4()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };

        try {
            const data = await s3.upload(s3Params).promise();
            res.status(200).json({ message: 'File uploaded successfully', data: data.Location });
        } catch (error) {
            res.status(500).json({ message: 'Failed to upload file', error: error.message });
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

