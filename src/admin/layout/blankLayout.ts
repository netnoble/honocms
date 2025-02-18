import { Context } from "hono";
import { html, raw } from "hono/html";
import {HtmlEscaped, HtmlEscapedString} from "hono/dist/types/utils/html";
import {headerLayout} from "./headerLayout";
import {footerLayout} from "./footerLayout";
import { menuBlock } from "../block/menuBlock";
import {navBlock} from "../block/navBlock";

export function blankLayout(content: (string & HtmlEscaped) | Promise<HtmlEscapedString>, c: Context) {
    return html`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>管理</title>
            <meta name="keywords" content="">
            <meta name="description" content="">
            <meta name="renderer" content="webkit">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
            <meta name="apple-mobile-web-app-status-bar-style" content="black">
            <meta name="apple-mobile-web-app-capable" content="yes">
            <meta name="format-detection" content="telephone=no">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/layui/2.9.21/css/layui.css"/>
            <link rel="stylesheet" href="/admin/common.css"/>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/layui/2.9.21/layui.js"></script>
        </head>
        <body class="layui-layout honocms-login">
        ${content}
        <div class="layui-footer">
            <!-- 底部固定区域 -->
            ${footerLayout(c)}
        </div>


        <script>
            //JS 
            layui.use(['element', 'layer', 'util'], function () {
                let element = layui.element;
                let layer = layui.layer;
                let util = layui.util;
                let $ = layui.$;
            });
        </script>
        </body>
        </html>
    `;
}