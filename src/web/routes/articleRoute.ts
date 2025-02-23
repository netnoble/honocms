//src/routes/indexRoute.ts
import { Hono } from "hono";
import {raw ,html} from "hono/html";
import {commonLayout} from "@/web/view/default/commonLayout";
import {articleIndexView} from "@/web/view/default/articleIndexView"
import {articleListView} from "@/web/view/default/articleListView"
import {articleDetailView} from "@/web/view/default/articleDetailView"
import {getDetail, getList} from "@/web/logic/articleLogic";

const app = new Hono();

//文章列表
app.get("/index", async (c) => {

    return c.html(commonLayout(articleIndexView(c), c));
})
//文章列表
app.get("/list", async (c) => {
    const seoInfo = {
        title: '',
        keywords: '',
        description: '',
    }
    const itemList = await getList(c);
    console.log('itemList',itemList)
    return c.html(commonLayout(articleListView(c,itemList), c,seoInfo));
})
//文章详情
app.get("/detail", async (c) => {

    const seoInfo = {
        title: '',
        keywords: '',
        description: '',
    }
    const itemDetail = await getDetail(c);
    return c.html(commonLayout(articleDetailView(c,itemDetail), c,seoInfo));

})

export default app;