//src/routes/indexRoute.ts
import { Hono } from "hono";
import {raw ,html} from "hono/html";
// import {Header} from "../layout/header";
import {commonLayout} from "@/web/view/default/commonLayout";

const app = new Hono();

//文章列表
app.get("/list", async (c) => {
    c.header("X-Message", "Hello!");
    c.header("Content-Type", "text/html");

    const name = 'John &quot;Johnny&quot; Smith';

    // c.context.viewTitle = "新闻列表";
    const body = html`
        <p>I'm ${raw(name)}.</p>
        <a href="/article/detail?id=1">文章详情</a>
    `;

    return c.html(commonLayout(body, c));
})
//文章详情
app.get("/detail", async (c) => {
    c.header('X-Message', 'Hello!');
    c.header('Content-Type', 'text/plain')
    const name = 'John &quot;Johnny&quot; Smith'

    // 获取查询参数中的 id
    const id = c.req.query('id') || '默认ID';  // 如果没有提供 id，则使用默认值

    // c.context.viewTitle = "新闻列表";
    const body = html`
        <h1>新闻详情2</h1>
        <p>这是一个使用 Hono 框架构建的简单网页。</p>
        <p>I'm ${raw(name)}--${raw(id)}.</p>
        <a href="/public">返回首页</a>
        <a href="/article/list">返回列表</a>
        <script>
            console.log('测试')
        </script>
    `;

    return c.html(commonLayout(body, c));

})

export default app;