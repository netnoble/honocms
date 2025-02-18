import {html} from "hono/html";
import {Context} from "hono";

export const navDefaultBlock = (c: Context ) =>
    html`
        <header>
            <img src="/images/logo.png" style="width: 60px;height: 60px" alt="">
            <nav>
                <a href="/public">首页 ly</a>
                <a href="/article/list">新闻列表</a>
                header
            </nav>
        </header>
    `

