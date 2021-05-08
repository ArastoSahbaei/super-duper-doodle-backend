const recipeModel = require('../models/Recipe.model.js')

exports.create = (req, res) => {
	if (!req.body.title) { return res.status(400).send({ message: "Recipe title is required" }) }

	const recipe = new recipeModel({
		title: req.body.title || "untitled recipe",
		duration: req.body.duration,
		ingrediens: req.body.ingrediens,
		description: req.body.description,
		originCountry: req.body.originCountry,
		language: req.body.language,
		views: req.body.views
	})

	recipe.save()
		.then(data => { res.send(data) })
		.catch(err => { res.status(500).send({ message: err.message || "Some error occurred while creating the data." }) })
}

exports.findAll = (req, res) => {
	recipeModel.find()
		.then(recipe => { res.send(recipe) })
		.catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving data." }) })
}

exports.findOne = (req, res) => {
	recipeModel.findById(req.params.recipeId)
		.then(recipe => {
			if (!recipe) { return res.status(404).send({ message: "Recipe not found with id " + req.params.recipeId }) }
			res.send(recipe)
		})
		.catch(err => {
			if (err.kind === 'ObjectId') { return res.status(404).send({ message: "Recipe not found with id " + req.params.recipeId }) }
			return res.status(500).send({ message: "Error retrieving Recipe with id " + req.params.recipeId })
		})
}

exports.update = (req, res) => {
	if (!req.body) { return res.status(400).send({ message: "Recipe content can not be empty" }) }

	recipeModel.findByIdAndUpdate(req.params.recipeId, {
		title: req.body.title || "Untitled Recipe",
		content: req.body.content
	}, { new: true })
		.then(recipe => {
			if (!recipe) { return res.status(404).send({ message: "Recipe not found with id " + req.params.recipeId }) }
			res.send(recipe)
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({ message: "Recipe not found with id " + req.params.recipeId })
			}
			return res.status(500).send({ message: "Error updating Recipe with id " + req.params.recipeId })
		})
}

exports.delete = (req, res) => {
	recipeModel.findByIdAndRemove(req.params.recipeId)
		.then(recipe => {
			if (!recipe) {
				return res.status(404).send({ message: "Recipe not found with id " + req.params.recipeId })
			}
			res.send({ message: "Recipe deleted successfully!" })
		})
		.catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({ message: "Recipe not found with id " + req.params.recipeId })
			}
			return res.status(500).send({ message: "Could not delete Recipe with id " + req.params.recipeId })
		})
}