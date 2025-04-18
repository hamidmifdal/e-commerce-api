import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes_user from '../routes/routerUser.js';
import routes_product from '../routes/routerProduct.js'
import errorHandler from '../middlewares/errorHandler.js';
import logger from '../utils/logger.js';
//static url image
const __static = ('/images', express.static('public'))
const corsOptions = {
        origin: function (origin, callback) {
          // Allow requests with no origin (like mobile apps or curl requests)
          if (!origin) return callback(null, true);
          
          // You could also check against a whitelist of allowed origins here
          // if (allowedOrigins.includes(origin)) {
          //   return callback(null, true);
          // }
          
          // For this example, we'll allow all origins
          callback(null, true);
        },
        credentials: true
      };
const app = express();
const Middleware = {
Global : [express.json(), express.urlencoded({ extended: true }),
        cors(corsOptions),
        helmet(), compression(), morgan('dev', { stream: logger.stream }),
        __static,cookieParser(process.env.COOKIES_SUCRET)
]}
// Middleware
// app.use('/static', express.static('public'))
Middleware.Global.forEach(mw=> app.use(mw))

// Routes
app.use('/api/v1/auth/user', routes_user);
app.use('/api/v1/auth/product', routes_product);

// Error Handling
app.use(errorHandler);

export default app;
