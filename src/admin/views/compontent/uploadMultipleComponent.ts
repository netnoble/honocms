import { html, raw } from "hono/html";
import { Context } from "hono";
import {getNanoid} from "@/utils/commonUtil";

export const uploadMultipleComponent = (c: Context, content: any) => {
    const initialElementId=  getNanoid();

    return html`
        <div class="layui-upload">
            <button type="button" class="layui-btn" id="honocms-upload-${raw(initialElementId)}">
                <i class="layui-icon layui-icon-upload"></i> 多图片上传
            </button>
            <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 11px;">
                预览图：
                <div class="layui-upload-list" id="honocms-upload-preview-${raw(initialElementId)}"></div>
            </blockquote>
        </div>
        
        
        
        <script>
            layui.use(function(){
                let upload = layui.upload;
                let layer = layui.layer;
                let element = layui.element;
                let $ = layui.$;
                // 多图片上传
                upload.render({
                    elem: '#honocms-upload-${raw(initialElementId)}',
                    url: '', // 实际使用时改成您自己的上传接口即可。
                    multiple: true,
                    before: function(obj){
                        // 预读本地文件示例，不支持ie8
                        obj.preview(function(index, file, result){
                            $('#honocms-upload-preview-${raw(initialElementId)}').append('<img src="'+ result +'" alt="'+ file.name +'" style="width: 90px; height: 90px;">')
                        });
                    },
                    done: function(res){
                        // 上传完毕
                        // …
                    }
                });
            });
        </script>
    `;
}