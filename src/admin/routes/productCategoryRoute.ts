//src/admin/routes/productCategoryRoute.ts
import { Hono } from "hono";
import {adminLayout} from "@/admin/layout/adminLayout";
import {formLayout} from "@/admin/layout/formLayout";
import {authAdminMiddleware} from "@/admin/middleware/authAdminMiddleware";

import {indexView} from '@/admin/views/productCategory/index'
import {addView} from '@/admin/views/productCategory/add'
import {editView} from '@/admin/views/productCategory/edit'
import {detailItem,getParentList} from "@/admin/logic/productCategoryLogic";
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
    const categoryList = await getParentList(c);
    return c.html(formLayout(addView(c,categoryList), c));
})
//编辑
app.get("/edit", async (c) => {
    const middlewareResponse = await authAdminMiddleware(c);
    if (middlewareResponse) {
        return middlewareResponse;
    }
    const categoryList = await getParentList(c);
    const detailData = await detailItem(c);
    return c.html(formLayout(editView(c,categoryList,detailData), c));
})
export default app;