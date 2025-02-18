import {html} from "hono/html";
import {Context} from "hono";

export const navBlock = (c:Context) => html`
    <!-- 头部区域（可配合layui 已有的水平导航） -->
    <ul class="layui-nav layui-layout-left">
        <li class="layui-nav-item layui-hide-xs"><a href="/" target="_blank">前台首页</a></li>
        <li class="layui-nav-item layui-hide-xs"><a href="javascript:;">交流群</a></li>
        <li class="layui-nav-item layui-hide-xs"><a href="javascript:;">技术支持</a></li>
        <li class="layui-nav-item">
            <a href="javascript:;">nav groups</a>
            <dl class="layui-nav-child">
                <dd><a href="javascript:;">menu 11</a></dd>
                <dd><a href="javascript:;">menu 22</a></dd>
                <dd><a href="javascript:;">menu 33</a></dd>
            </dl>
        </li>
    </ul>
    <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item layui-hide layui-show-sm-inline-block">
            <a href="javascript:;">
                <img src="//unpkg.com/outeres@0.0.10/img/layui/icon-v2.png" class="layui-nav-img">
                admin
            </a>
            <dl class="layui-nav-child">
                <dd><a href="javascript:;">个人资料</a></dd>
                <dd><a href="javascript:;">修改密码</a></dd>
                <dd><a href="javascript:;" lay-on="handleLogout">退出登录</a></dd>
            </dl>
        </li>
        <li class="layui-nav-item" lay-header-event="menuRight" lay-unselect>
            <a href="javascript:;">
                <i class="layui-icon layui-icon-more-vertical"></i>
            </a>
        </li>
    </ul>

    <script>
        layui.use(['util', 'layer'], function() {
            let util = layui.util;
            let layer = layui.layer;
            let $ = layui.jquery; // 从Layui中获取jQuery对象
            util.on({
                
                handleLogout:function () {
                    let token = layui.data('Authorization').token;
                    // 发送Ajax请求
                    $.ajax({
                        url: '/admin/api/passport/logout', // 替换为你的登录接口地址
                        type: 'POST',
                        contentType: "application/json;charset=utf-8",
                        headers:{
                            'Authorization':'Bearer '+token
                        },
                        data: JSON.stringify({}), // 将表单数据转换为JSON字符串
                        success: function (res) {
                            // 假设接口返回的状态码是200表示成功
                            if (res.code === 200) {
                                layui.data('Authorization', null);
                                window.location.href = "/admin/login"
                            } else {
                                // 登录失败，显示错误信息
                                layer.alert(res.message || '退出失败', {
                                    title: '错误'
                                });
                            }
                        },
                        error: function () {
                            // 请求出错时的处理
                            layer.alert('请求失败，请稍后再试', {
                                title: '错误'
                            });
                        }
                    });
                    
                    
                }
            });
            
        });
    </script>
    
`



