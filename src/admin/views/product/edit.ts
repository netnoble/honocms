import {html,raw} from "hono/html";
import {Context} from "hono";
import {wangeditorComponent} from '@/admin/views/component/wangeditorComponent'
import {uploadComponent} from '@/admin/views/component/uploadComponent'
import {optionItemTreeComponent} from '@/admin/views/component/OptionTreeComponent'
export const editView = (c:Context, categoryList:any, detailData:any) => {

    return html`
        <div class="honocms-form-box">
            <form action="javascript:;" onsubmit="return false;" class="layui-form layuimini-form">
                <input type="hidden" name="id" value="${raw(detailData.id)}">
                <div class="layui-form-item">
                    <label class="layui-form-label required">标题</label>
                    <div class="layui-input-block">
                        <input type="text" name="title" lay-verify="required" lay-verType="tips"
                               lay-reqtext="请输入标题" placeholder="请输入标题" value="${raw(detailData.title)}" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">分类</label>
                    <div class="layui-input-block">
                        <select lay-search="" name="category_id">
                            ${raw(optionItemTreeComponent(c, categoryList,detailData.category_id))}
                        </select>

                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">关键词</label>
                    <div class="layui-input-block">
                        <input type="text" name="keywords" value="${raw(detailData.keywords)}" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">描述</label>
                    <div class="layui-input-block">
                        <input type="text" name="description" value="${raw(detailData.description)}" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">封面图</label>
                    <div class="layui-input-block">
                        ${raw(uploadComponent(c,'file_path',detailData.file_path))}
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">状态</label>
                    <div class="layui-input-block">
                        <input type="radio" name="status" value="1" title="启用" ${detailData.status == 1 ? 'checked' : ''}>
                        <input type="radio" name="status" value="2" title="禁用" ${detailData.status == 2 ? 'checked' : ''}>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">内容</label>
                    <div class="layui-input-block">
                        ${raw(wangeditorComponent(c, detailData.content))}
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
                let urlCreateItem = '/admin/api/product/update'
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


