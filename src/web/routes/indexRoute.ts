//src/routes/indexRoute.ts
import { Hono } from "hono";
import {commonLayout} from "@/web/view/default/commonLayout";
import {indexView} from "@/web/view/default/indexView"
import {getSystemInfo} from "@/web/logic/systemLogic";

const app = new Hono();
app.get("/", async (c:any) => {
    const seoInfo = {
        title: await getSystemInfo(c, "site_name"),
        keywords: await getSystemInfo(c, "site_keywords"),
        description: await getSystemInfo(c, "site_description"),
    }
    return c.html(commonLayout(indexView(c), c, seoInfo));
})

export default app;