import { Router } from "express";
import * as AuthProduct from '../controllers/AuthProduct.js'
import * as VS from '../utils/Schema/ProductCreate.js'
import Auth from '../middlewares/Auth_User.js' 
const router = Router()

router.post('/create', Auth, AuthProduct.localStorage.single('image'), VS.ValidateProducts(VS.newProducts), AuthProduct.CreateProduct)
router.patch('/update/:id', Auth, VS.ValidateProducts(VS.editeProducts), AuthProduct.UpdateProducts)
router.delete('/delete/:_id', Auth, AuthProduct.removeProduts)
router.get('/post',Auth, AuthProduct.localStorage.single('image'), AuthProduct.GetAllProduct)


export default router;