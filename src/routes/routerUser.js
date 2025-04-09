import express from 'express';
import * as VS from '../utils/Schema/UserLogin.js'
import * as AuthUser from '../controllers/AuthUser.js'
import { uploade } from '../controllers/AuthUser.js';
import Auth from '../middlewares/Auth_User.js';
const router = express.Router();
//VS => ValidateSchema
router.post('/login', VS.ValidateSchemaUser(VS.SchemaUserLogin), AuthUser.Login)
router.post('/register', VS.ValidateSchemaUser(VS.SchemaUserRegister) , AuthUser.Register,)
router.post('/upload/profile/image', Auth, uploade.single('photo'),AuthUser.UploadPhoto)
router.patch('/upload/profile', Auth, VS.ValidateUpdateUser(VS.SchemaUpdateUser),AuthUser.UpdateUser )

router.get('/profile', Auth, AuthUser.Profile)

export default router;
