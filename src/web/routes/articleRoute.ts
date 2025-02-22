//src/routes/indexRoute.ts
import { Hono } from "hono";
import {raw ,html} from "hono/html";
// import {Header} from "../layout/header";
import {commonLayout} from "@/web/view/default/commonLayout";
import {articleIndexView} from "@/web/view/default/articleIndexView"
import {articleListView} from "@/web/view/default/articleListView"
import {articleDetailView} from "@/web/view/default/articleDetailView"

const app = new Hono();

//文章列表
app.get("/index", async (c) => {

    return c.html(commonLayout(articleIndexView(c), c));
})
//文章列表
app.get("/list", async (c) => {

    return c.html(commonLayout(articleListView(c), c));
})
//文章详情
app.get("/detail", async (c) => {


    return c.html(commonLayout(articleDetailView(c), c));

})

export default app;