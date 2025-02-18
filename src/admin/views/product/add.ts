import {html,raw} from "hono/html";
import {Context} from "hono";
import {wangeditorComponent} from '@/admin/views/compontent/wangeditorComponent'
import {uploadComponent} from '@/admin/views/compontent/uploadComponent'
import {uploadMultipleComponent} from '@/admin/views/compontent/uploadMultipleComponent'
import {optionItemTreeComponent} from '@/admin/views/compontent/OptionTreeComponent'

export const addView = (c:Context, categoryList:any) => {

    return html`
        <div class="honocms-form-box">
            <form action="javascript:;" onsubmit="return false;" class="layui-form layuimini-form">
                <div class="layui-form-item">
                    <label class="layui-form-label required">标题</label>
                    <div class="layui-input-block">
                        <input type="text" name="title" lay-verify="required" lay-verType="tips"
                               lay-reqtext="请输入标题" placeholder="请输入标题" value="" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">分类</label>
                    <div class="layui-input-block">
                        <select lay-search="" name="category_id">
                            ${raw(optionItemTreeComponent(c, categoryList,0))}
                        </select>

                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">关键词</label>
                    <div class="layui-input-block">
                        <input type="text" name="keywords" value="" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">描述</label>
                    <div class="layui-input-block">
                        <input type="text" name="description" value="" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label ">封面图</label>
                    <div class="layui-input-block">
                        ${raw(uploadComponent(c,'file_path',''))}
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
                    <label class="layui-form-label ">内容</label>
                    <div class="layui-input-block">
                        ${raw(wangeditorComponent(c,''))}
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
                let urlCreateItem = '/admin/api/product/create'
                form.on('submit(handleSubmit)', function (data) {
                    // 检查并删除 'file' 属性
                    if ('file' in data.field) {
                        delete data.field['file'];
                    }
                    // if (!window.wangEditorInstance) {
                    //     console.error("wangEditor instance is not ready yet.");
                    //     return false; // 防止表单提交
                    // }
                    // 获取 wangEditor 中的内容
                    // 将富文本内容添加到要提交的数据中
                    data.field.content = window.wangEditorInstance.getHtml();

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

}


