import {html,raw} from "hono/html";
import {Context} from "hono";
import {uploadComponent} from "@/admin/views/component/uploadComponent";

export const editView = (c:Context, adCategory:any, detailData:any) => {
    return html`
        <div class="honocms-form-box">
            <form action="javascript:;" onsubmit="return false;" class="layui-form layuimini-form">
                <input type="hidden" name="id" value="${raw(detailData.id)}">
                <div class="layui-form-item">
                    <label class="layui-form-label required">名称</label>
                    <div class="layui-input-block">
                        <input type="text" name="name" lay-verify="required" lay-verType="tips"
                               lay-reqtext="请输入名称" placeholder="请输入名称" value="${raw(detailData.name)}" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">分类</label>
                    <div class="layui-input-block">
                        <select lay-search="" name="category_id">
                            ${adCategory.map((item: any) => html`
                                    <option value="${item.id}" ${detailData.category_id == item.id ? 'selected' : ''}>${item.name}</option>
                                `)}
                        </select>
                        
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label ">封面图</label>
                    <div class="layui-input-block">
                        ${raw(uploadComponent(c,'file_path',detailData.file_path))}
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">链接</label>
                    <div class="layui-input-block">
                        <input type="text" name="url" value="${raw(detailData.url)}" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">排序</label>
                    <div class="layui-input-block">
                        <input type="number" name="sort" value="${raw(detailData.sort)}" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">跳转方式</label>
                    <div class="layui-input-block">
                        <input type="radio" name="link_type" value="_self" title="当前窗口" ${detailData.link_type == '_self' ? 'checked' : ''}>
                        <input type="radio" name="link_type" value="_blank" title="新窗口" ${detailData.link_type == '_blank' ? 'checked' : ''}>
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
                    <label class="layui-form-label ">扩展字段1</label>
                    <div class="layui-input-block">
                        <input type="text" name="field_one" value="${raw(detailData.field_one)}" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">扩展字段2</label>
                    <div class="layui-input-block">
                        <input type="text" name="field_two" value="${raw(detailData.field_two)}" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">扩展字段3</label>
                    <div class="layui-input-block">
                        <input type="text" name="field_three" value="${raw(detailData.field_three)}" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">备注</label>
                    <div class="layui-input-block">
                        <textarea type="text" name="remark" class="layui-textarea">${raw(detailData.remark)}</textarea>
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
                let urlCreateItem = '/admin/api/ad/update'
                form.on('submit(handleSubmit)', function (data) {
                    // 检查并删除 'file' 属性
                    if ('file' in data.field) {
                        delete data.field['file'];
                    }
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



