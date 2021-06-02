import mongoose from 'mongoose'
const { Schema } = mongoose

const mulitipleFileSchema = new Schema({
	title: {
		type: String,
		/* required: true */
	},
	files: [Object]
}, { timestamps: true })

const MultipleFileModel = mongoose.model('MultipleFile', mulitipleFileSchema)
export default MultipleFileModel