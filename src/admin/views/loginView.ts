import {html,raw} from "hono/html";
import {Context} from "hono";

const name = 'John &quot;Johnny&quot; Smith'

export const loginView = (c:Context) =>
    html`
        <div class="honocms-login">
            <div class="wp">
                <div style="height: 260px;"></div>
                <div class="layui-row">

                    <div class="layui-col-xs4">&nbsp;</div>
                    <div class="layui-col-xs4 login-form">
                        <div class="box ">
                            <div class="box-header">
                                <div class="title">登录管理系统</div>
                            </div>
                            <div class="box-content">


                                <form class="layui-form" onsubmit="return false;">
                                    <div class="demo-login-container">
                                        <div class="layui-form-item">
                                            <div class="layui-input-wrap">
                                                <div class="layui-input-prefix">
                                                    <i class="layui-icon layui-icon-username"></i>
                                                </div>
                                                <input type="text" name="username" value="admin" lay-verify="required"
                                                       placeholder="用户名" lay-reqtext="请填写用户名"
                                                       autocomplete="off" class="layui-input" lay-affix="clear">
                                            </div>
                                        </div>
                                        <div class="layui-form-item">
                                            <div class="layui-input-wrap">
                                                <div class="layui-input-prefix">
                                                    <i class="layui-icon layui-icon-password"></i>
                                                </div>
                                                <input type="password" name="password" value="123456"
                                                       lay-verify="required" placeholder="密   码"
                                                       lay-reqtext="请填写密码" autocomplete="off" class="layui-input"
                                                       lay-affix="eye">
                                            </div>
                                        </div>

                                        <div class="layui-form-item">
                                            <button class="layui-btn layui-btn-fluid" lay-submit
                                                    lay-filter="demo-login">登录
                                            </button>
                                        </div>

                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>

                    <div class="layui-col-xs4"></div>


                </div>
                <div></div>


            </div>
        </div>


        <script>
            layui.use(['form', 'layer', 'jquery'], function () {
                let form = layui.form;
                let layer = layui.layer;
                let $ = layui.jquery; // 从Layui中获取jQuery对象
                // 提交事件
                form.on('submit(demo-login)', function (data) {
                    let field = data.field; // 获取表单字段值
                    // 显示填写结果，仅作演示用
                    layer.alert(JSON.stringify(field), {
                        title: '当前填写的字段值'
                    });
                    // 此处可执行 Ajax 等操作
                    // 发送Ajax请求
                    $.ajax({
                        url: '/admin/api/passport/login', // 替换为你的登录接口地址
                        type: 'POST',
                        contentType: "application/json;charset=utf-8",
                        data: JSON.stringify(field), // 将表单数据转换为JSON字符串
                        success: function (res) {
                            console.log('res.data.token', res.data.token)
                            // 假设接口返回的状态码是200表示成功
                            if (res.code === 200) {
                                // 存储token到本地缓存
                                layui.data('Authorization', {
                                    key: 'token',
                                    value: res.data.token // 假设返回的json中有token字段
                                });
                                // let token = layui.data('Authorization').token;
                                // console.log('res.token.token', token)
                                // 登录成功，跳转到管理后台首页
                                window.location.href = "/admin";
                            } else {
                                // 登录失败，显示错误信息
                                layer.alert(res.message || '登录失败', {
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
                    return false; // 阻止默认 form 跳转
                });
            });
        </script>

    `




