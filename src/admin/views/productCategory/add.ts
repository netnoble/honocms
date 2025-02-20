import {html,raw} from "hono/html";
import {Context} from "hono";
import {optionCategoryTreeComponent} from '@/admin/views/component/OptionTreeComponent'

export const addView = (c:Context, categoryList:any) =>
    html`

        <div class="honocms-form-box">
            <form action="javascript:;" onsubmit="return false;" class="layui-form layuimini-form">
                <div class="layui-form-item">
                    <label class="layui-form-label required">分类名称</label>
                    <div class="layui-input-block">
                        <input type="text" name="name" lay-verify="required" lay-verType="tips"
                               lay-reqtext="请输入分类名称" placeholder="请输入分类名称" value="" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">上级分类</label>
                    <div class="layui-input-block">
                        <select lay-search="" name="parent_id">
                            <option value="0">--顶级导航--</option>
                            ${raw(optionCategoryTreeComponent(c, categoryList,0))}
                        </select>

                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">排序</label>
                    <div class="layui-input-block">
                        <input type="number" name="sort" value="0" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">状态</label>
                    <div class="layui-input-block">
                        <input type="radio" name="status" value="1" title="启用" checked>
                        <input type="radio" name="status" value="2" title="禁用">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">备注</label>
                    <div class="layui-input-block">
                        <textarea type="text" name="remark" class="layui-textarea"></textarea>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn" lay-submit lay-filter="handleSubmit">提交</button>
                    </div>
                </div>
            </form>
        </div>

        <script>

            layui.use(['form'], function () {
                let $ = layui.jquery;
                let form = layui.form;
                let urlCreateItem = '/admin/api/productCategory/create'
                form.on('submit(handleSubmit)', function (data) {
                    RequestUtil.apiPost(urlCreateItem, data.field,
                            function (res) {
                                let iframeIndex = parent.layer.getFrameIndex(window.name);
                                parent.layer.close(iframeIndex);
                                parent.location.reload();
                            },
                            function (err) {
                                console.log('Error:', err);
                            }
                    );
                });
            });
        </script>

    `



