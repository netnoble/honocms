import {Hono} from "hono";
import type {RequestIdVariables} from "hono/dist/types/middleware/request-id";

//
import adminLoginRoute from '@/admin/routes/loginRoute'
import adminIndexRoute from '@/admin/routes/indexRoute'
import adminArticleRoute from '@/admin/routes/articleRoute'
import adminArticleCategoryRoute from '@/admin/routes/articleCategoryRoute'
import adminAdRoute from '@/admin/routes/adRoute'
import adminAdCategoryRoute from '@/admin/routes/adCategoryRoute'
import adminProductRoute from '@/admin/routes/productRoute'
import adminProductCategoryRoute from '@/admin/routes/productCategoryRoute'
import adminSystemRoute from '@/admin/routes/systemRoute'
import adminAdminRoute from '@/admin/routes/adminRoute'
import adminUserRoute from '@/admin/routes/userRoute'
import adminNavRoute from '@/admin/routes/navRoute'

//api
import apiPassportRoute from '@/admin/api_routes/passportRoute'
import apiSeedRoute from '@/admin/api_routes/seedRoute'
import apiArticleRoute from '@/admin/api_routes/articleRoute'
import apiArticleCategoryRoute from '@/admin/api_routes/articleCategoryRoute'
import apiAdRoute from '@/admin/api_routes/adRoute'
import apiAdCategoryRoute from '@/admin/api_routes/adCategoryRoute'
import apiProductRoute from '@/admin/api_routes/productRoute'
import apiProductCategoryRoute from '@/admin/api_routes/productCategoryRoute'
import apiSystemRoute from '@/admin/api_routes/systemRoute'
import apiPersonalRoute from '@/admin/api_routes/personalRoute'
import apiAdminRoute from '@/admin/api_routes/adminRoute'
import apiUserRoute from '@/admin/api_routes/userRoute'
import apiUploadFileRoute from '@/admin/api_routes/uploadFileRoute'
import apiNavRoute from '@/admin/api_routes/navRoute'


const app = new Hono<{
    Variables: RequestIdVariables,
}>()

app.route('/', adminIndexRoute);//需要验证cookie

app.route('/login', adminLoginRoute);//不用验证cookie
app.route('/article', adminArticleRoute);//需要验证cookie
app.route('/articleCategory', adminArticleCategoryRoute);//需要验证cookie
app.route('/ad', adminAdRoute);//需要验证cookie
app.route('/adCategory', adminAdCategoryRoute);//需要验证cookie
app.route('/product', adminProductRoute);//需要验证cookie
app.route('/productCategory', adminProductCategoryRoute);//需要验证cookie
app.route('/system', adminSystemRoute);//需要验证cookie
app.route('/admin', adminAdminRoute);//需要验证cookie
app.route('/user', adminUserRoute);//需要验证cookie
app.route('/nav', adminNavRoute);//需要验证cookie

//api
app.route('/api/passport', apiPassportRoute);//这是api不需要验证token
app.route('/api/seed', apiSeedRoute);//这是api不需要验证token

app.route('/api/article', apiArticleRoute);//这是api需要验证token
app.route('/api/articleCategory', apiArticleCategoryRoute);
app.route('/api/ad', apiAdRoute);
app.route('/api/adCategory', apiAdCategoryRoute);
app.route('/api/product', apiProductRoute);
app.route('/api/productCategory', apiProductCategoryRoute);
app.route('/api/system', apiSystemRoute);
app.route('/api/personal', apiPersonalRoute);
app.route('/api/admin', apiAdminRoute);
app.route('/api/user', apiUserRoute);
app.route('/api/uploadFile', apiUploadFileRoute);
app.route('/api/nav', apiNavRoute);

export default app;