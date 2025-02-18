//src/admin/routes/systemRoute.ts
import { Hono } from "hono";
import {adminLayout} from "@/admin/layout/adminLayout";

import {authAdminMiddleware} from "@/admin/middleware/authAdminMiddleware";
import {indexView} from '@/admin/views/system'
import {listItem} from "@/admin/logic/systemLogic";

const app = new Hono();

app.get("/list", async (c) => {
    // 首先调用中间件并检查是否有响应（例如重定向）
    const middlewareResponse = await authAdminMiddleware(c);
    if (middlewareResponse) {
        // 如果中间件返回了响应（如重定向），则返回该响应
        return middlewareResponse;
    }
    const result = await listItem(c)
    console.log(result)

    return c.html(adminLayout(indexView(c,result), c));
})

export default app;