//src/admin/routes/adCategoryRoute.ts
import { Hono } from "hono";
import {adminLayout} from "@/admin/layout/adminLayout";
import {formLayout} from "@/admin/layout/formLayout";
import {authAdminMiddleware} from "@/admin/middleware/authAdminMiddleware";


import {indexView} from '@/admin/views/adCategory/index'
import {addView} from "@/admin/views/adCategory/add";
import {editView} from "@/admin/views/adCategory/edit";
import {detailItem} from "@/admin/logic/adCategoryLogic";

const app = new Hono();
//列表
app.get("/list", async (c) => {
    const middlewareResponse = await authAdminMiddleware(c);
    if (middlewareResponse) {
        return middlewareResponse;
    }
    // c. header('X-Message', 'Hello!');
    // c. header('Content-Type', 'text/plain')
    return c.html(adminLayout(indexView(c), c));
})

//添加
app.get("/add", async (c) => {
    const middlewareResponse = await authAdminMiddleware(c);
    if (middlewareResponse) {
        return middlewareResponse;
    }
    return c.html(formLayout(addView(c), c));
})
//编辑
app.get("/edit", async (c) => {
    const middlewareResponse = await authAdminMiddleware(c);
    if (middlewareResponse) {
        return middlewareResponse;
    }
    const detailData = await detailItem(c);
    return c.html(formLayout(editView(c,detailData), c));
})

export default app;