import SingleFileModel from '../models/SingleFile.model.js'
import MultipleFileModel from '../models/MultipleFile.model.js'

const downloadFile = async (request, response) => {
	try {
		const file = await SingleFileModel.findById({  _id: request.params.id })
		console.log(file.fileName)
		response.download(`configurations/uploads/${file.fileName}`)
	} catch (error) {
		response.status(500).send({ error: error.message })
	}
}

const uploadSingleFile = async (request, response) => {
	try {
		console.log(request.file)
		const file = new SingleFileModel({
			fileName: request.file.originalname,
			filePath: request.file.path,
			fileType: request.file.mimetype,
			fileSize: fileSizeFormatter(request.file.size, 2)
		})
		await file.save()
		console.log(request.file)
		response.json({ message: "Successfully uploaded files" });
	} catch (error) {
		console.log(error)
	}
}

const getAllSingleFiles = async (request, response) => {
	try {
		const files = await SingleFileModel.find()
		response.status(200).send(files)
	} catch (error) {
		response.status(400).send(error.message)
	}
}

const multipleFileUpload = async (request, response, next) => {
	try {
		let filesArray = []
		request.files.forEach(element => {
			const file = {
				fileName: element.originalname,
				filePath: element.path,
				fileType: element.mimetype,
				fileSize: fileSizeFormatter(element.size, 2)
			}
			filesArray.push(file)
		})
		const multipleFiles = new MultipleFileModel({
			title: request.body.title,
			files: filesArray
		})
		await multipleFiles.save()
		response.status(201).send('files uploaded successfully')
	} catch (error) {
		response.status(400).send(error.message)
		console.log(error)
	}
}



const fileSizeFormatter = (bytes, decimal) => {
	if (bytes === 0) {
		return '0 bytes'
	}
	const dm = decimal || 2
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB']
	const index = Math.floor(Math.log(bytes) / Math.log(1000))
	return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index]
}

export default {
	uploadSingleFile,
	multipleFileUpload,
	getAllSingleFiles,
	downloadFile
}