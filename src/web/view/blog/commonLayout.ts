import { Context } from "hono";
import { html, raw } from "hono/html";
import {HtmlEscaped, HtmlEscapedString} from "hono/dist/types/utils/html";
import {headerLayout} from "./headerLayout";
import {footerLayout} from "./footerLayout";

export function commonLayout(content: (string & HtmlEscaped) | Promise<HtmlEscapedString>, c: Context) {
    return html`
        <!DOCTYPE html>
        <html lang="zh">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <title>ces</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/layui/2.9.21/css/layui.css"/>
            <link rel="stylesheet" href="/style/common.css">
            <link rel="stylesheet" href="/style/blog/style.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/layui/2.9.21/layui.js"></script>
        </head>
        <body>
        <div class="wp">
            ${headerLayout(c)}
            <main>
                ${content}
            </main>
            ${footerLayout(c)}
            <footer>
                <p>&copy; 2025 Hono 示例</p>
            </footer>
        </div>
        </body>
        </html>
    `;
}