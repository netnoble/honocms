import {html,raw} from "hono/html";
import {Context} from "hono";
import {uploadComponent} from "@/admin/views/compontent/uploadComponent";

export const addView = (c:Context, adCategory:any) => {

    // const options = adCategory.map((item:any) => html`
    //     <option value="${item.id}">${item.name}</option>
    // `);
    return html`
        <div class="honocms-form-box">
            <form action="javascript:;" onsubmit="return false;" class="layui-form layuimini-form">
                <div class="layui-form-item">
                    <label class="layui-form-label required">名称</label>
                    <div class="layui-input-block">
                        <input type="text" name="name" lay-verify="required" lay-verType="tips"
                               lay-reqtext="请输入名称" placeholder="请输入名称" value="" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">分类</label>
                    <div class="layui-input-block">
                        <select lay-search="" name="category_id">
                            ${adCategory.map((item: any) => html`
                                    <option value="${item.id}">${item.name}</option>
                                `)}
                        </select>
                        
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">封面图</label>
                    <div class="layui-input-block">
                        ${raw(uploadComponent(c,'file_path',''))}
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">链接</label>
                    <div class="layui-input-block">
                        <input type="text" name="url" value="" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label ">排序</label>
                    <div class="layui-input-block">
                        <input type="number" name="sort" value="0" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">跳转方式</label>
                    <div class="layui-input-block">
                        <input type="radio" name="link_type" value="_self" title="当前窗口" checked>
                        <input type="radio" name="link_type" value="_blank" title="新窗口">
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
                let urlCreateItem = '/admin/api/ad/create'
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


