import mongoose from 'mongoose'
const { Schema } = mongoose

const singleFileSchema = new Schema({
	fileName: {
		type: String,
		required: true
	},
	filePath: {
		type: String,
		required: true
	},
	fileType: {
		type: String,
		required: true
	},
	fileSize: {
		type: String,
		required: true
	}
}, { timestamps: true });


const SingleFileModel = mongoose.model('SingleFile', singleFileSchema);
export default SingleFileModel