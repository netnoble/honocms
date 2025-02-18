import {Hono} from "hono";
import type {RequestIdVariables} from "hono/dist/types/middleware/request-id";
import indexRoute from '@/web/routes/indexRoute'
import articleRoute from '@/web/routes/articleRoute'
const webApp = new Hono<{
    Variables: RequestIdVariables,
}>()

webApp.route('/', indexRoute);
webApp.route('/article', articleRoute);

export default webApp;