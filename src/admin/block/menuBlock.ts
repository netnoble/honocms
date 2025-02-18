import {html} from "hono/html";
import {Context} from "hono";

export const menuBlock = (c:Context) => html`
    <div class="layui-side-scroll ">
        <div class="box honocms-menu">
            <div class="box-header">
                <div class="title"><a href="/admin">工作台</a></div>
            </div>
        </div>
        <div class="box honocms-menu">
            <div class="box-header">
                <div class="title">文章管理</div>
            </div>
            <div class="box-content">
                <div class="layui-row">
                    <div class="layui-col-xs6">
                        <div class="title"><a href="/admin/articleCategory/list">文章分类</a></div>
                    </div>
                    <div class="layui-col-xs6">
                        <div class="title"><a href="/admin/article/list">文章列表</a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box honocms-menu">
            <div class="box-header">
                <div class="title">产品管理</div>
            </div>
            <div class="box-content">
                <div class="layui-row">
                    <div class="layui-col-xs6">
                        <div class="title"><a href="/admin/productCategory/list">产品分类</a></div>
                    </div>
                    <div class="layui-col-xs6">
                        <div class="title"><a href="/admin/product/list">产品列表</a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box honocms-menu">
            <div class="box-header">
                <div class="title">轮播广告</div>
            </div>
            <div class="box-content">
                <div class="layui-row">
                    <div class="layui-col-xs6">
                        <div class="title"><a href="/admin/adCategory/list">轮播组管理</a></div>
                    </div>
                    <div class="layui-col-xs6">
                        <div class="title"><a href="/admin/ad/list">管理轮播</a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box honocms-menu">
            <div class="box-header">
                <div class="title">用户管理</div>
            </div>
            <div class="box-content">
                <div class="layui-row">
                    <div class="layui-col-xs6">
                        <div class="title"><a href="/admin/user/list">用户列表</a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box honocms-menu">
            <div class="box-header">
                <div class="title">系统管理</div>
            </div>
            <div class="box-content">
                <div class="layui-row">
                    <div class="layui-col-xs6">
                        <div class="title"><a href="/admin/nav/list">导航菜单</a></div>
                    </div>
                    <div class="layui-col-xs6">
                        <div class="title"><a href="/admin/system/list">站点设置</a></div>
                    </div>
                    <div class="layui-col-xs6">
                        <div class="title"><a href="/admin/admin/list">管理员列表</a></div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
`



