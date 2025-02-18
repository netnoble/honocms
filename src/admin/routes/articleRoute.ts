//src/admin/routes/articleRoute.ts
import { Hono } from "hono";
import {adminLayout} from "@/admin/layout/adminLayout";
import {formLayout} from "@/admin/layout/formLayout";
import {indexView} from '@/admin/views/article'
import {authAdminMiddleware} from "@/admin/middleware/authAdminMiddleware";
import {addView} from "@/admin/views/article/add";
import {editView} from "@/admin/views/article/edit";
import {getListTree} from "@/admin/logic/articleCategoryLogic";
import {detailItem} from "@/admin/logic/articleLogic";

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
    const categoryList = await getListTree(c);
    return c.html(formLayout(addView(c,categoryList), c));
})
//编辑
app.get("/edit", async (c) => {
    const middlewareResponse = await authAdminMiddleware(c);
    if (middlewareResponse) {
        return middlewareResponse;
    }
    const categoryList = await getListTree(c);
    const detailData = await detailItem(c);
    return c.html(formLayout(editView(c,categoryList,detailData), c));
})
export default app;