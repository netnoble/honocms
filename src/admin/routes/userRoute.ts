//src/admin/routes/userRoute.ts
import { Hono } from "hono";
import {adminLayout} from "@/admin/layout/adminLayout";
import {formLayout} from "@/admin/layout/formLayout";
import {authAdminMiddleware} from "@/admin/middleware/authAdminMiddleware";
import {indexView} from '@/admin/views/user'

const app = new Hono();

app.get("/list", async (c) => {
    // 首先调用中间件并检查是否有响应（例如重定向）
    const middlewareResponse = await authAdminMiddleware(c);
    if (middlewareResponse) {
        // 如果中间件返回了响应（如重定向），则返回该响应
        return middlewareResponse;
    }
    return c.html(adminLayout(indexView(c), c));
})

export default app;