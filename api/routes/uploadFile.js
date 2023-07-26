
const { uploadContentAws,getUploadedFiles, deleteObjectFromBucketAndDb} = require('../controllers/uploadControllerAws')
const { verifyTokenAndAdmin } = require('../middleware/verifyToken')


const router = require('express').Router()


router.route("/").get(getUploadedFiles)
router.route("/upload/aws").post(uploadContentAws)
router.route("/aws/delete").post(deleteObjectFromBucketAndDb)

module.exports = router