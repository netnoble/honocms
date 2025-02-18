//src/admin/routes/indexRoute.ts
import { Hono } from "hono";
import {raw ,html} from "hono/html";
import {getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie,} from 'hono/cookie'
import {adminLayout} from "@/admin/layout/adminLayout";
import {headerLayout} from "@/admin/layout/headerLayout";
import {authAdminMiddleware} from "@/admin/middleware/authAdminMiddleware";

const app = new Hono();

app.get("/", async (c) => {
    // 首先调用中间件并检查是否有响应（例如重定向）
    const middlewareResponse = await authAdminMiddleware(c);
    if (middlewareResponse) {
        // 如果中间件返回了响应（如重定向），则返回该响应
        return middlewareResponse;
    }
    c. header('X-Message', 'Hello!');
    c. header('Content-Type', 'text/plain')
    const name = 'John &quot;Johnny&quot; Smith'
    setCookie(c, 'delicious_cookie', 'macha12345678')
    let cookie = getCookie(c, 'delicious_cookie')
    console.log('dsdede',getCookie(c, 'delicious_cookie'))
    // c.context.viewTitle = "新闻列表";
    const body = html`
        <h1>admin后台</h1>
        ${headerLayout(c)}
        
        <p>这是一个使用 Hono 框架构建的简单网页。</p>
        <p>这是一个cookie  ${cookie}</p>
        <p>I'm ${raw(name)}.</p>
        <a href="article/list">文章列表</a>
        <script>
            console.log('测试')
        </script>
    `;

    return c.html(adminLayout(body, c));
})

export default app;