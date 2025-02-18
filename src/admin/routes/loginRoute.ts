//src/admin/routes/login.ts
import { Hono } from "hono";
import {blankLayout} from "@/admin/layout/blankLayout";
import {loginView} from "@/admin/views/loginView";
const app = new Hono();

// 定义环境类型
// interface Env {
//     DB: any; // 你可以根据实际情况定义更具体的类型
// }

//登录页面
app.get("/", async (c) => {
    //@todo 已登录时，跳转到管理首页
    c. header('X-Message', 'Hello!');
    c. header('Content-Type', 'text/plain')
    console.log("login", "login顶顶顶")
    return c.html(blankLayout(loginView(c), c));
})

export default app;