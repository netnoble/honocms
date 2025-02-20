import { Context } from "hono";
import { html, raw } from "hono/html";
import {HtmlEscaped, HtmlEscapedString} from "hono/dist/types/utils/html";
import {headerLayout} from "./headerLayout";
import {footerLayout} from "./footerLayout";
import {getSystemInfo} from "@/web/logic/systemLogic";

export const commonLayout = async (content: (string & HtmlEscaped) | Promise<HtmlEscapedString>, c: Context, seoInfo?: any) => {

    return html`
        <!DOCTYPE html>
        <html lang="zh">
        <head>
            
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <title>${seoInfo.title}</title>
            ${raw(await getSystemInfo(c, "site_html_code"))}
            <meta name="keywords" content="${seoInfo.keywords}">
            <meta name="description" content="${seoInfo.description}">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/layui/2.9.21/css/layui.css"/>
            <link rel="stylesheet" href="/style/common.css">
            <link rel="stylesheet" href="/style/default/style.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/layui/2.9.21/layui.js"></script>
        </head>
        <body>
        <div class="wp">
            ${headerLayout(c)}
            <div class="honocms-body">
                ${content}
            </div>
            ${footerLayout(c, await getSystemInfo(c, "site_copyright"))}
            
        </div>
        </body>
        </html>
    `;
}