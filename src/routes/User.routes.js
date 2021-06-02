import UserController from '../controllers/User.controller.js'
import Middlewares from '../middlewares/Middlewares.js'
import multer from 'multer'

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "configurations/uploads/")
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})

const upload = multer({ storage: fileStorageEngine }).single('files')

const routes = application => {
	application.get('/authtest', Middlewares.checkToken, UserController.testingAuthenticatedRoute)
	application.post('/user/login', UserController.login)
	application.post('/user/register', UserController.registerNewUser)
	application.get('/user', UserController.getAllUsers)
	application.get('/user/:userId', UserController.getUserByID)
	application.get('/searchuser', UserController.getUserWithQuery)
	application.put('/user/:userId', UserController.updateUser)
	application.delete('/user/:userId', UserController.deleteUserWithID)
	application.post('/forgotpassword', UserController.forgotPassword)
	application.put('/updatepassword', UserController.updatePassword)
	application.put('/resetpassword', UserController.resetPassword)
	application.put('/favouriterecipes', UserController.updateFavouriteRecipes)
	application.post('/user/updateAvatar', upload, UserController.uploadFile);

}

export default { routes }