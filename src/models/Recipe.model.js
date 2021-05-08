const mongoose = require('mongoose')
const { Schema } = mongoose

const recipeSchema = Schema({
	title: String,
	duration: Number,
	ingrediens: String,
	description: String,
	originCountry: String,
	language: String,
	views: Number,
	createdByUser: [{
		type: Schema.Types.ObjectId,
		ref: "user"
	}]
}, {
	timestamps: true
})

module.exports = mongoose.model('recipe', recipeSchema)