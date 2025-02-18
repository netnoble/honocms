import { Context } from "hono";
import { html, raw } from "hono/html";
import {HtmlEscaped, HtmlEscapedString} from "hono/dist/types/utils/html";
import {headerLayout} from "./headerLayout";
import {footerLayout} from "./footerLayout";

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
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/layui/2.9.21/css/layui.css"
                  integrity="sha512-zaj280vn612WMqoKaMNLpGcAVZpSMatiM7MTFwYAHB0dMygshkMFc7hNgO/3IL2ngwwsVdsFEEvNIJOkxEk9VQ=="
                  crossorigin="anonymous" referrerpolicy="no-referrer"/>
            <link rel="stylesheet" href="/layuimini/css/layuimini.css" media="all">
            <link rel="stylesheet" href="/layuimini/css/themes/default.css" media="all">
          
            <script src="https://cdnjs.cloudflare.com/ajax/libs/layui/2.9.21/layui.js"
                    integrity="sha512-I1HbBx1mr3Zq8aOLBL622ju6Jwpb2BF8wUElwiL3kAluC3hCe4K2r10eWhoZVOzBU5aNaDoxWP4TCX0kGXy9qw=="
                    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        </head>
        <body class="layui-layout-body layuimini-all">

        <div class="layui-layout layui-layout-admin">

            <div class="layui-header header">
                <div class="layui-logo layuimini-logo"></div>

                <div class="layuimini-header-content">
                    <a>
                        <div class="layuimini-tool"><i title="展开" class="fa fa-outdent" data-side-fold="1"></i></div>
                    </a>

                    <!--电脑端头部菜单-->
                    <ul class="layui-nav layui-layout-left layuimini-header-menu layuimini-menu-header-pc layuimini-pc-show">
                    </ul>

                    <!--手机端头部菜单-->
                    <ul class="layui-nav layui-layout-left layuimini-header-menu layuimini-mobile-show">
                        <li class="layui-nav-item">
                            <a href="javascript:;"><i class="fa fa-list-ul"></i> 选择模块</a>
                            <dl class="layui-nav-child layuimini-menu-header-mobile">
                            </dl>
                        </li>
                    </ul>

                    <ul class="layui-nav layui-layout-right">

                        <li class="layui-nav-item" lay-unselect>
                            <a href="javascript:;" data-refresh="刷新"><i class="fa fa-refresh"></i></a>
                        </li>
                        <li class="layui-nav-item" lay-unselect>
                            <a href="javascript:;" data-clear="清理" class="layuimini-clear"><i
                                    class="fa fa-trash-o"></i></a>
                        </li>
                        <li class="layui-nav-item mobile layui-hide-xs" lay-unselect>
                            <a href="javascript:;" data-check-screen="full"><i class="fa fa-arrows-alt"></i></a>
                        </li>
                        <li class="layui-nav-item layuimini-setting">
                            <a href="javascript:;">admin</a>
                            <dl class="layui-nav-child">
                                <dd>
                                    <a href="javascript:;" layuimini-content-href="page/user-setting.html"
                                       data-title="基本资料"
                                       data-icon="fa fa-gears">基本资料<span class="layui-badge-dot"></span></a>
                                </dd>
                                <dd>
                                    <a href="javascript:;" layuimini-content-href="page/user-password.html"
                                       data-title="修改密码" data-icon="fa fa-gears">修改密码</a>
                                </dd>
                                <dd>
                                    <hr>
                                </dd>
                                <dd>
                                    <a href="javascript:;" class="login-out">退出登录</a>
                                </dd>
                            </dl>
                        </li>
                        <li class="layui-nav-item layuimini-select-bgcolor" lay-unselect>
                            <a href="javascript:;" data-bgcolor="配色方案"><i class="fa fa-dashboard"></i></a>
                        </li>
                    </ul>
                </div>
            </div>

            <!--无限极左侧菜单-->
            <div class="layui-side layui-bg-black layuimini-menu-left">
            </div>

            <!--初始化加载层-->
<!--            <div class="layuimini-loader">-->
<!--                <div class="layuimini-loader-inner"></div>-->
<!--            </div>-->

            <!--手机端遮罩层-->
            <div class="layuimini-make"></div>

            <!-- 移动导航 -->
            <div class="layuimini-site-mobile"><i class="layui-icon"></i></div>

            <div class="layui-body">

                <div class="layuimini-tab layui-tab-rollTool layui-tab" lay-filter="layuiminiTab" lay-allowclose="true">
                    <ul class="layui-tab-title">
                        <li class="layui-this" id="layuiminiHomeTabId" lay-id=""></li>
                    </ul>
                    <div class="layui-tab-control">
                        <li class="layuimini-tab-roll-left layui-icon layui-icon-left"></li>
                        <li class="layuimini-tab-roll-right layui-icon layui-icon-right"></li>
                        <li class="layui-tab-tool layui-icon layui-icon-down">
                            <ul class="layui-nav close-box">
                                <li class="layui-nav-item">
                                    <a href="javascript:;"><span class="layui-nav-more"></span></a>
                                    <dl class="layui-nav-child">
                                        <dd><a href="javascript:;" layuimini-tab-close="current">关 闭 当 前</a></dd>
                                        <dd><a href="javascript:;" layuimini-tab-close="other">关 闭 其 他</a></dd>
                                        <dd><a href="javascript:;" layuimini-tab-close="all">关 闭 全 部</a></dd>
                                    </dl>
                                </li>
                            </ul>
                        </li>
                    </div>
                    <div class="layui-tab-content">
                        <div id="layuiminiHomeTabIframe" class="layui-tab-item layui-show"></div>
                    </div>
                    <div class="layuimini-footer">Copyright © 2013-2024 xx Cloud. All Rights Reserved. xxx 版权所有
                    </div>
                </div>
            </div>
        </div>

        <script src="/layuimini/js/lay-config.js?v=2.0.0" charset="utf-8"></script>
        <script src="/layuimini/apijs/init.js" charset="utf-8"></script> <!--演示获取数据时使用，生产中删除此行 -->

        <script>
            // layui.use(['jquery', 'layer', 'miniAdmin', 'miniTongji'], function () {
            //     let $ = layui.jquery,
            //             layer = layui.layer,
            //             miniAdmin = layui.miniAdmin,
            //             miniTongji = layui.miniTongji;
            //
            //     let options = {
            //         // iniUrl: "api/init.json", // 初始化接口
            //         clearUrl: "/layuimini/api/clear.json", // 缓存清理接口
            //         data: getJson(),            // 演示使用，生产中删除此行，使用iniUrl配置请求的接口地址
            //         urlHashLocation: true,      // 是否打开hash定位
            //         bgColorDefault: 0,          // 主题默认配置【主题种类型共12种，填写数字：0-11】
            //         multiModule: true,          // 是否开启多模块
            //         menuChildOpen: false,       // 是否默认展开菜单
            //         leftMenuIsHide: false,      // 左侧折叠菜单是否隐藏，默认是展开
            //         loadingTime: 0,             // 初始化加载时间
            //         pageAnim: true,             // iframe窗口动画
            //         maxTabNum: 20,              // 最大的tab打开数量
            //         clickHomeTabRefresh: false   // 是否每次点击tab刷新，默认是false关闭
            //     };
            //     miniAdmin.render(options);
            //
            //     $('.login-out').on("click", function () {
            //         layer.msg('退出登录成功', function () {
            //             window.location = 'page/login-3.html';
            //         });
            //     });
            // });
        </script>


        </body>
        </html>
    `;
}