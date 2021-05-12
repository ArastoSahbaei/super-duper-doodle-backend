import recipeController from '../controllers/Recipe.controller.js'

const routes = application => {
	application.post('/recipe', recipeController.createRecipe)
	application.get('/recipe', recipeController.getAllRecipes)
	application.get('/recipe/:recipeId', recipeController.findRecipeById)
	application.put('/recipe/:recipeId', recipeController.updateRecipe)
	application.delete('/recipe/:recipeId', recipeController.deleteRecipe)
}

export default { routes }