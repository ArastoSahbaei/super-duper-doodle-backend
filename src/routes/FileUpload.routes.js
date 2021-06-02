import FileUploadController from '../controllers/FileUpload.controller.js'
import multer from 'multer'

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "configurations/uploads/")
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})

const upload = multer({ storage: fileStorageEngine })

const routes = application => {
	application.post('/fileupload/single', upload.single('files'), FileUploadController.uploadSingleFile);
	application.post('/fileupload/multiple', upload.array('files'), FileUploadController.multipleFileUpload)
	application.get('/getallfiles', FileUploadController.getAllSingleFiles)
	application.get('/download/:id', FileUploadController.downloadFile);
}

export default { routes }