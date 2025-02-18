import { Context } from "hono";
import { html, raw } from "hono/html";
import {HtmlEscaped, HtmlEscapedString} from "hono/dist/types/utils/html";
import {headerLayout} from "./headerLayout";
import {footerLayout} from "./footerLayout";
import { menuBlock } from "../block/menuBlock";
import {navBlock} from "../block/navBlock";

export function adminLayout(content: (string & HtmlEscaped) | Promise<HtmlEscapedString>, c: Context) {
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
            <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/fontawesome.min.css" media="all">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/layui/2.9.21/css/layui.css"/>
            <link rel="stylesheet" href="/admin/common.css"/>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/layui/2.9.21/layui.js"></script>
            <script src="/js/requestUtil.js"></script>
        </head>
        <body class="layui-layout layui-layout-admin honocms-layout-default">


        <div class="layui-header">
            <div class="layui-logo layui-hide-xs honocms-bg-black">管理</div>
            ${navBlock(c)}
        </div>
        <div class="layui-side layui-bg-gray">
            ${menuBlock(c)}
        </div>
        <div class="layui-body">
            
            
            <!-- 内容主体区域 -->
            <div style="padding: 15px;">
               
                <div class="layui-card layui-panel">
                   
                    <div class="layui-card-body">
                        ${content}
                    </div>
                </div>
                <br><br>
            </div>
            
            
            
            
        </div>
        <div class="layui-footer">
            <!-- 底部固定区域 -->
            ${footerLayout(c)}
        </div>
        </div>
        
        
        
        
        

        <script>
            //JS 
            layui.use(['element', 'layer', 'util'], function(){
                let element = layui.element;
                let layer = layui.layer;
                let util = layui.util;
                let $ = layui.$;

                // layer.msg('展开左侧菜单的操作', {icon: 0});
                
                //头部事件
                util.event('lay-header-event', {
                    menuLeft: function(othis){ // 左侧菜单事件
                        layer.msg('展开左侧菜单的操作', {icon: 0});
                    },
                    menuRight: function(){  // 右侧菜单事件
                        layer.open({
                            type: 1,
                            title: '更多',
                            content: '<div style="padding: 15px;">处理右侧面板的操作</div>',
                            area: ['260px', '100%'],
                            offset: 'rt', // 右上角
                            anim: 'slideLeft', // 从右侧抽屉滑出
                            shadeClose: true,
                            scrollbar: false
                        });
                    }
                });
            });
        </script>
        </body>
        </html>
    `;
}