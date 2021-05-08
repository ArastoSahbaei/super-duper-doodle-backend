const recipeController = require('../controllers/Recipe.controller.js')

module.exports = (app) => {
	app.post('/recipe', recipeController.create)
	app.get('/recipe', recipeController.findAll)
	app.get('/recipe/:recipeId', recipeController.findOne)
	app.put('/recipe/:recipeId', recipeController.update)
	app.delete('/recipe/:recipeId', recipeController.delete)
}