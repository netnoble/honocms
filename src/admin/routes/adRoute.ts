//src/admin/routes/adRoute.ts
import { Hono } from "hono";
import {adminLayout} from "@/admin/layout/adminLayout";
import {formLayout} from "@/admin/layout/formLayout";
import {indexView} from '@/admin/views/ad'
import {authAdminMiddleware} from "@/admin/middleware/authAdminMiddleware";
import {addView} from "@/admin/views/ad/add";
import {editView} from "@/admin/views/ad/edit";
import {listItem} from "@/admin/logic/adCategoryLogic";
import {detailItem} from "@/admin/logic/adLogic";

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
    const category = await listItem(c);
    console.log(category,'category')
    return c.html(formLayout(addView(c,category), c));
})
//编辑
app.get("/edit", async (c) => {
    const middlewareResponse = await authAdminMiddleware(c);
    if (middlewareResponse) {
        return middlewareResponse;
    }
    const category = await listItem(c);
    const detailData = await detailItem(c);
    console.log(detailData,'detailData')
    return c.html(formLayout(editView(c,category,detailData), c));
})
export default app;