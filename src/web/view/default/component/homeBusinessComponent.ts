import {html,raw} from "hono/html";
import {Context} from "hono";
import {getAdDetail} from "@/web/logic/adLogic";

export const homeBusinessComponent = async (c: Context ) => {

    const adBanner = await getAdDetail(c,'home-banner');
    console.log('adBanner',adBanner);
    return html`
        <style>
            .honocms-home-business {
                background: #fbfdff;
            }

            .honocms-home-business .box-header {
                margin-bottom: 30px;
                text-align: center;
                padding-top: 70px;
            }

            .honocms-home-business .box-header .title {
                font-size: 38px;
                color: #2b3346;
                line-height: 1.5;
                font-weight: 600;
            }
            .honocms-home-business .box-header .sub-title {
                font-size: 15px;
                color: #5a6071;
                margin-top: 10px;
            }
            .honocms-home-business .box-content {
                margin: 40px 0;
            }
            .honocms-home-business .box-content .image{
                height: 160px;
                text-align: center;
                display: inline-block;
            }
            .honocms-home-business .box-content .image .img{
                width: 100%;
                height: 160px;
                
            }
            .honocms-home-business .box-content .title{
                font-weight: bold;
                font-size: 16px;
                color: #43464d;
                text-align: center;
                margin-top: 20px;
            }
            .honocms-home-business .box-content .sub-title{
                font-size: 15px;
                color: #6f7480;
                line-height: 25px;
                text-align: center;
                margin-top: 15px;
            }
            .honocms-home-business .box-content .block{
                margin: 20px 0;
                padding: 26px 20px;
                border: 1px solid #ebebeb;
                border-radius: 6px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
            }
        </style>
        <div class="honocms-home-business">
            <div class="layui-container ">
                <!-- 主要内容 -->
                
                <div class="box-header">
                    <div class="title">探索HonoCMS商业化服务：开启您的数字成功之旅</div>
                    <div class="sub-title">HonoCMS为您提供一站式解决方案，通过我们的专业商业化服务，帮助您打造个性化、高效的网站与应用平台。</div>
                </div>
                <div class="box-content">
                    <div class="layui-row layui-col-space30">
                        <!-- 左侧图片 -->
                        <div class="layui-col-md4">
                            <div class="block">
                                <div class="image"><img class="img" src="https://www.huocms.com/static/home/images/new_index/new01.jpg"/></div>
                                <div class="title">定制化开发</div>
                                <div class="sub-title">便捷下载，代码全部开源，无加密，且免费可以商用</div>
                            </div>
                        </div>
                        <div class="layui-col-md4">
                            <div class="block">
                                <div class="image"><img class="img" src="https://www.huocms.com/static/home/images/new_index/new01.jpg"/></div>
                                <div class="title">全面支持与维护</div>
                                <div class="sub-title">便捷下载，代码全部开源，无加密，且免费可以商用</div>
                            </div>
                        </div>

                        <div class="layui-col-md4">
                            <div class="block">
                                <div class="image"><img class="img" src="https://www.huocms.com/static/home/images/new_index/Advantage_ico01.png"/></div>
                                <div class="title">优化升级服务</div>
                                <div class="sub-title">专业的培训课程和咨询服务，助力您的团队快速掌握HonoCMS的最佳实践。</div>
                            </div>
                        </div>
                        <div class="layui-col-md4">
                            <div class="block">
                                <div class="image"><img class="img" src="https://www.huocms.com/static/home/images/new_index/Advantage_ico02.png"/></div>
                                <div class="title">开源、免费、可商用</div>
                                <div class="sub-title">便捷下载，代码全部开源，无加密，且免费可以商用</div>
                            </div>
                        </div>

                        <div class="layui-col-md4">
                            <div class="block">
                                <div class="image"><img src="https://www.huocms.com/static/home/images/new_index/Advantage_ico01.png"/></div>
                                <div class="title">开源、免费、可商用</div>
                                <div class="sub-title">便捷下载，代码全部开源，无加密，且免费可以商用</div>
                            </div>
                        </div>
                        <div class="layui-col-md4">
                            <div class="block">
                                <div class="image"><img src="https://www.huocms.com/static/home/images/new_index/Advantage_ico02.png"/></div>
                                <div class="title">开源、免费、可商用</div>
                                <div class="sub-title">便捷下载，代码全部开源，无加密，且免费可以商用</div>
                            </div>
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




