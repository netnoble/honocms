import { html,raw } from "hono/html";
import { Context } from "hono";
import {uploadComponent} from "@/admin/views/compontent/uploadComponent";

export const indexView = (c:Context, listData:any) =>
    html`
        <blockquote class="layui-elem-quote">
            网站信息
        </blockquote>
        <div class="honocms-form-box">
            <form action="javascript:;" onsubmit="return false;" class="layui-form layuimini-form">
                ${listData.map((item: any) => {
                    // 根据type属性判断要渲染的控件类型
                    let inputElement;
                    switch(item.type) {
                        case 'input':
                            inputElement = html`<input type="text" name="${item.key}" value="${item.value || ''}" class="layui-input">`;
                            break;
                        case 'image':
                            inputElement = html` ${raw(uploadComponent(c,item.key,item.value))}`;
                            break;
                        case 'radio':
                            // options数据结构 [{"label": "启用", "value": "1"},{"label": "禁用", "value": "2"}]
                            const radioOptions = item.options.map((option:any) =>
                                    html`<input type="radio" name="${item.key}" value="${option.value}" ${item.value === option.value ? 'checked' : ''} title="${option.label}">`
                            );
                            inputElement =  html`${raw(radioOptions.join(''))}`;
                            break;
                        case 'textarea':
                            inputElement = html`<textarea name="${item.key}" class="layui-textarea">${item.value || ''}</textarea>`;
                            break;
                        default:
                            inputElement = html``;
                    }

                    return html`
                        <div class="layui-form-item">
                            <label class="layui-form-label">${item.title}</label>
                            <div class="layui-input-block honocms-form-item">
                                ${inputElement}
                            </div>
                        </div>
                        
                    `;
                })}
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
                let urlCreateItem = '/admin/api/system/update'
                form.on('submit(handleSubmit)', function (data) {
                    // 检查并删除 'file' 属性
                    if ('file' in data.field) {
                        delete data.field['file'];
                    }
                    // 使用Object.entries()方法将对象转换为键值对数组
                    const keyValueArray = Object.entries(data.field);
                    // 转换为期望的格式
                    let formattedData = keyValueArray.map(([key, value]) => ({
                        key: key,
                        value: value
                    }));
                    RequestUtil.apiPost(urlCreateItem, formattedData,
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
        
    `;