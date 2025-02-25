import {html,raw} from "hono/html";
import {Context} from "hono";
import {getAdDetail} from "@/web/logic/adLogic";

export const homeBannerComponent = async (c: Context ) => {

    const adBanner = await getAdDetail(c,'home-banner');
    console.log('adBanner',adBanner);
    return html`
        <style>
            .honocms-home-banner {
                height: 520px;
                text-align: center;
                background: #e1f0fe;
                /* 调整了渐变的颜色，使整体色调更偏向温暖 */
                background-image: -webkit-linear-gradient(left, #FBFBFF, #eae8e8 26%, #f6e4fe 52%, #e9effb 76%, #E9EFFF);
            }

            .honocms-home-banner .box-header {
                margin-top: 130px;
            }

            .honocms-home-banner .box-header h1 {
                font-size: 4.5rem;
                font-weight: bold;
            }
            .honocms-home-banner .box-content {
                font-size: 20px;
                line-height: 40px;
            }
        </style>
        <div class="honocms-home-banner">
            <div class="layui-container ">
                <!-- 主要内容 -->
                <div class="layui-row layui-col-space20">
                    <!-- 左侧图片 -->
                    <div class="layui-col-md12">
                        <div class="box-header">
                            <h1>${raw(adBanner?.name)}</h1>
                        </div>
                        <div class="box-content">
                            ${raw(adBanner?.field_one)}
                        </div>
                    </div>

                </div> <!-- 主要内容 -->
            </div>
        </div>


        <script>
            layui.use(function () {

            });
        </script>
    `
}




