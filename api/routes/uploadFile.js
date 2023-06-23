
const { uploadContentAws,getUploadedFiles} = require('../controllers/uploadControllerAws')
const { verifyTokenAndAdmin } = require('../middleware/verifyToken')


const router = require('express').Router()


router.route("/").get(getUploadedFiles)
router.route("/upload/aws").post(verifyTokenAndAdmin,uploadContentAws)

module.exports = router