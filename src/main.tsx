//src/main.ts
import { Hono } from 'hono';
import {html} from 'hono/html'
import type { RequestIdVariables } from 'hono/request-id'
import { getRouterName, showRoutes } from 'hono/dev'


import adminApp from "@/admin";
import webApp from "@/web";


const app = new Hono<{
    Variables: RequestIdVariables,
}>()

// app.get("/public/*", async (ctx) => {
//     return await ctx.env.ASSETS.fetch(ctx.req.raw);
// });


/**
 * admin模块-end
 */

// 将 web 应用直接挂载到根路径或其他指定路径下
app.route('/admin', adminApp);
app.route('/', webApp);




// app.notFound((c) => {
//     // return c.text('自定义 404 信息', 404)
//     return c.html(`
//     <!DOCTYPE html>
//     <html lang="zh">
//     <head>
//         <meta charset="UTF-8">
//         <title>新闻详情</title>
//     </head>
//     <body>
//         <h1>404</h1>
//
//     </body>
//     </html>
//     `)
// })

//show all routes
// showRoutes(app, {
//     verbose: true,
// })

// 导出默认实例以供启动脚本使用
export default app;