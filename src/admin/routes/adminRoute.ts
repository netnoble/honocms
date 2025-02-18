//src/admin/routes/adminRoute.ts
import { Hono } from "hono";
import {adminLayout} from "@/admin/layout/adminLayout";
import {formLayout} from "@/admin/layout/formLayout";
import {indexView} from '@/admin/views/admin'
import {authAdminMiddleware} from "@/admin/middleware/authAdminMiddleware";
import {addView} from "@/admin/views/admin/add";
import {editView} from "@/admin/views/admin/edit";
import {detailItem} from "@/admin/logic/adminLogic";

const app = new Hono();

app.get("/list", async (c) => {
    const middlewareResponse = await authAdminMiddleware(c);
    if (middlewareResponse) {
        return middlewareResponse;
    }
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