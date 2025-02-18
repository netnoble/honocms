//src/admin/routes/navRoute.ts
import { Hono } from "hono";
import {adminLayout} from "@/admin/layout/adminLayout";
import {formLayout} from "@/admin/layout/formLayout";
import {authAdminMiddleware} from "@/admin/middleware/authAdminMiddleware";

import {indexView} from '@/admin/views/nav/index'
import {addView} from '@/admin/views/nav/add'
import {editView} from '@/admin/views/nav/edit'
import {detailItem} from "@/admin/logic/navLogic";
import {getParentList} from "@/admin/logic/navLogic";


const app = new Hono();

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