import RecipeModel from '../models/Recipe.model.js'
import UserModel from '../models/User.model.js'

const createRecipe = async (request, response) => {
	if (!request.body.title) { return response.status(400).send({ message: "Recipe title is required" }) }

	const recipe = new RecipeModel({
		userId: request.body.userId,
		title: request.body.title || "untitled recipe",
		duration: request.body.duration,
		ingrediens: request.body.ingrediens,
		description: request.body.description,
		originCountry: request.body.originCountry,
		language: request.body.language,
		views: request.body.views
	})

	try {
		const user = await UserModel.findById({ _id: request.body.userId })
		user.createdRecipes.push(recipe)
		recipe.createdByUser = user
		await recipe.save()
		const savedRecipe = await user.save()
		response.status(201).send(savedRecipe)
	} catch (error) {
		response.status(500).send({ message: error.message })
	}
}

const getAllRecipes = async (request, response) => {
	try {
		const databaseResponse = await RecipeModel.find().populate('createdByUser')
		response.status(200).send(databaseResponse)
	} catch (error) {
		response.status(500).send({ message: error.message })
	}
}

const findRecipeById = (request, response) => {
	RecipeModel.findById(request.params.recipeId)
		.then(recipe => {
			if (!recipe) { return response.status(404).send({ message: "Recipe not found with id " + request.params.recipeId }) }
			response.send(recipe)
		})
		.catch(err => {
			if (err.kind === 'ObjectId') { return response.status(404).send({ message: "Recipe not found with id " + request.params.recipeId }) }
			return response.status(500).send({ message: "Error retrieving Recipe with id " + request.params.recipeId })
		})
}

const updateRecipe = (request, response) => {
	if (!request.body) { return response.status(400).send({ message: "Recipe content can not be empty" }) }

	RecipeModel.findByIdAndUpdate(request.params.recipeId, {
		title: request.body.title || "Untitled Recipe",
		content: request.body.content
	}, { new: true })
		.then(recipe => {
			if (!recipe) { return response.status(404).send({ message: "Recipe not found with id " + request.params.recipeId }) }
			response.send(recipe)
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return response.status(404).send({ message: "Recipe not found with id " + request.params.recipeId })
			}
			return response.status(500).send({ message: "Error updating Recipe with id " + request.params.recipeId })
		})
}

const deleteRecipe = (request, response) => {
	RecipeModel.findByIdAndRemove(request.params.recipeId)
		.then(recipe => {
			if (!recipe) {
				return response.status(404).send({ message: "Recipe not found with id " + request.params.recipeId })
			}
			response.send({ message: "Recipe deleted successfully!" })
		})
		.catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return response.status(404).send({ message: "Recipe not found with id " + request.params.recipeId })
			}
			return response.status(500).send({ message: "Could not delete Recipe with id " + request.params.recipeId })
		})
}

const searchRecipe = (request, response) => {

}

export default {
	createRecipe,
	getAllRecipes,
	updateRecipe,
	findRecipeById,
	deleteRecipe
}