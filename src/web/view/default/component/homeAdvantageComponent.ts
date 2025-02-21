import {html,raw} from "hono/html";
import {Context} from "hono";
import {getAdDetail} from "@/web/logic/adLogic";

export const homeAdvantageComponent = async (c: Context ) => {

    const adBanner = await getAdDetail(c,'home-banner');
    console.log('adBanner',adBanner);
    return html`
        <style>
            .honocms-home-advantage {
                text-align: center;
            }

            .honocms-home-advantage .box-header {
                margin-top: 50px;
            }

            .honocms-home-advantage .box-header .title {
                font-size: 38px;
                color: #2b3346;
                line-height: 1.5;
                font-weight: 600;
            }
            .honocms-home-advantage .box-header .sub-title {
                font-size: 15px;
                color: #5a6071;
                margin-top: 10px;
            }
            .honocms-home-advantage .box-content {
            }
            .honocms-home-advantage .box-content .image{
                width: 52px;
                height: 50px;
                text-align: center;
                display: inline-block;
            }
            .honocms-home-advantage .box-content .title{
                font-weight: bold;
                font-size: 16px;
                color: #43464d;
                text-align: center;
                margin-top: 20px;
            }
            .honocms-home-advantage .box-content .sub-title{
                font-size: 15px;
                color: #6f7480;
                line-height: 25px;
                text-align: center;
                margin-top: 15px;
            }
        </style>
        <div class="honocms-home-advantage">
            <div class="layui-container ">
                <!-- 主要内容 -->
                
                <div class="box-header">
                    <div class="title">HonoCMS 核心优势</div>
                    <div class="sub-title">做企业官网当然要选一套好用的CMS</div>
                </div>
                <div class="box-content">
                    <div class="layui-row layui-col-space20">
                        <!-- 左侧图片 -->
                        <div class="layui-col-md4">
                            <div class="image"><img src="https://www.huocms.com/static/home/images/new_index/Advantage_ico01.png"/></div>
                            <div class="title">开源、免费、可商用</div>
                            <div class="sub-title">便捷下载，代码全部开源，无加密，且免费可以商用</div>
                        </div>
                        <div class="layui-col-md4">
                            <div class="image"><img src="https://www.huocms.com/static/home/images/new_index/Advantage_ico02.png"/></div>
                            <div class="title">开源、免费、可商用</div>
                            <div class="sub-title">便捷下载，代码全部开源，无加密，且免费可以商用</div>
                        </div>
                        <div class="layui-col-md4">
                            <div class="image"></div>
                            <div class="title">开源、免费、可商用</div>
                            <div class="sub-title">便捷下载，代码全部开源，无加密，且免费可以商用</div>
                        </div>
                        <div class="layui-col-md4">
                            <div class="image"></div>
                            <div class="title">开源、免费、可商用</div>
                            <div class="sub-title">便捷下载，代码全部开源，无加密，且免费可以商用</div>
                        </div>
                        <div class="layui-col-md4">
                            <div class="image"></div>
                            <div class="title">开源、免费、可商用</div>
                            <div class="sub-title">便捷下载，代码全部开源，无加密，且免费可以商用</div>
                        </div>
                    </div> <!-- 主要内容 -->
                </div>
            </div>
        </div>


        <script>
            layui.use(function () {

            });
        </script>
    `
}




