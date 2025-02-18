import { html, raw } from "hono/html";
import { Context } from "hono";
import {getNanoid} from "@/utils/commonUtil";

export const uploadComponent = (c: Context, fieldName:string = 'file',filePath: any) => {
    const initialElementId=  getNanoid();

    return html`
        <button type="button" class="layui-btn" id="honocms-upload-${raw(initialElementId)}">
            <i class="layui-icon layui-icon-upload"></i> 单图片上传
        </button>
        <div style="width: 132px;">
            <div class="layui-upload-list">
                <input type="hidden" name="${raw(fieldName)}" value="">
                <img class="layui-upload-img" id="honocms-upload-preview-${raw(initialElementId)}" src="${raw(filePath)}" style="width: 100%; height: 92px;">
                <div id="honocms-upload-text-${raw(initialElementId)}"></div>
            </div>
            <div class="layui-progress layui-progress-big" lay-showPercent="yes" lay-filter="filter-demo${raw(fieldName)}">
                <div class="layui-progress-bar" lay-percent=""></div>
            </div>
        </div>
        


        <script>
            layui.use(function(){
                let upload = layui.upload;
                let layer = layui.layer;
                let element = layui.element;
                let $ = layui.$;
                // 单图片上传
                let uploadInst = upload.render({
                    elem: '#honocms-upload-${raw(initialElementId)}',
                    url: '/admin/api/uploadFile/upload', // 实际使用时改成您自己的上传接口即可。
                    field:'file',
                    // field:'${raw(fieldName)}',
                    before: function(obj){
                        // 预读本地文件示例，不支持ie8
                        obj.preview(function(index, file, result){
                            $('#honocms-upload-preview-${raw(initialElementId)}').attr('src', result); // 图片链接（base64）
                        });

                        element.progress('filter-demo${raw(fieldName)}', '0%'); // 进度条复位
                        layer.msg('上传中', {icon: 16, time: 0});
                    },
                    done: function(res){
                        // 若上传失败
                        if(res.code !== 200){
                            return layer.msg('上传失败');
                        }
                        $('input[name="${raw(fieldName)}"]').val(res.data.url)
                        // 上传成功的一些操作
                        // …
                        $('#honocms-upload-text-${raw(initialElementId)}').html(''); // 置空上传失败的状态
                    },
                    error: function(){
                        // 演示失败状态，并实现重传
                        let demoText = $('#honocms-upload-text-${raw(initialElementId)}t');
                        demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                        demoText.find('.demo-reload').on('click', function(){
                            uploadInst.upload();
                        });
                    },
                    // 进度条
                    progress: function(n, elem, e){
                        element.progress('filter-demo${raw(fieldName)}', n + '%'); // 可配合 layui 进度条元素使用
                        if(n == 100){
                            layer.msg('上传完毕', {icon: 1});
                        }
                    }
                });
                
            });
        </script>
    `;
}