import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import passport from 'passport'

import Configuration from './configurations/Configurations.js'
import Middlewares from './src/middlewares/Middlewares.js'
import UserRoutes from './src/routes/User.routes.js'
import RecipeRoutes from './src/routes/Recipe.routes.js'
import FileUpload from './src/routes/FileUpload.routes.js'
import NewsLetterSubscriptionRoutes from './src/routes/NewsLetterSubscription.routes.js'
import passportConfig from './configurations/passport-config.js'

const application = express()
application.use(passport.initialize())
application.use(cors({ credentials: true }))
application.use(express.json())
application.use(helmet())
application.use(morgan('common'))

passportConfig.registerUserini()
passportConfig.login()

UserRoutes.routes(application)
FileUpload.routes(application)
RecipeRoutes.routes(application)
NewsLetterSubscriptionRoutes.routes(application)

application.use(Middlewares.notFound)
application.use(Middlewares.errorHandler)

Configuration.connectToDatabase()
Configuration.connectToPort(application)