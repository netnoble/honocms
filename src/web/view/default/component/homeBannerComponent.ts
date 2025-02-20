import {html,raw} from "hono/html";
import {Context} from "hono";

export const homeBannerComponent = async (c: Context ) => {



    return html`
        <style>
            .honocms-home-banner{
                height: 520px;
            }
        </style>
        <div class="layui-container honocms-home-banner">
            <!-- 主要内容 -->
            <div class="layui-row layui-col-space20">
                <!-- 左侧图片 -->
                <div class="layui-col-md12">
                    
                </div>

            </div> <!-- 主要内容 -->
        </div>


    <script>
        layui.use(function () {
           
        });
    </script>
`
}




