// const aws = require("aws-sdk");
const { S3Client } = require('@aws-sdk/client-s3')
const multer = require("multer");
const multerS3 = require("multer-s3");
const Files = require("../models/FilesModel")
const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY
    }
})

const BucketName = process.env.AWS_BUCKET_NAME

const upload = (bucketName) =>
    multer({
        storage: multerS3({
            s3,
            bucket: bucketName,
            contentDisposition: 'inline',
            contentType: function(req,file,cb){
                cb(null,file.mimetype)
            },
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.mimetype });
            },
            key: function (req, file, cb) {
                cb(null, `${Date.now()}_${file.originalname}`);
            },
        }),
    });

const uploadContentAws = (req, res, next) => {
    const uploadSingle = upload(BucketName).single(
        "upload"
    );
    uploadSingle(req, res, async (err) => {
        if (err)
            return res.status(400).json({ success: false, message: err.message });

        await Files.findOneAndUpdate({
            name: "mainList"
        }, {
            $push: {
                data: req.file
            }
        })

        res.status(200).json({ data: req.file.location });
    });
};

//get all files
const getUploadedFiles = async (req, res) => {
    try {
        const files = await Files.findOne({})
        res.status(200).json({fileCount: files?.data?.length, files})
    } catch (error) {
        res.status(401).json({ err: error.message })
    }
}

module.exports = {
    uploadContentAws,
    getUploadedFiles
}