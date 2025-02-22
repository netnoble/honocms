import {html,raw} from "hono/html";
import {Context} from "hono";
import {getAdDetail, getAdList} from "@/web/logic/adLogic";

export const homeAdvantageComponent = async (c: Context ) => {

    const adAdvantageHeader = await getAdDetail(c,'home-advantage-header');
    const adAdvantageList = await getAdList(c,'home-advantage-content');


    const htmlAdvantageList = adAdvantageList.map((item:any) => {
        // 如果没有子菜单，构建普通菜单项
        return `
            <div class="layui-col-md4">
                <div class="block">
                    <div class="image">
                    <a href="${item.url}" target="${item.link_type}">
                        <img class="img" src="${item.file_path}"/>
                    </a>
                    </div>
                    <div class="title">
                        <a href="${item.url}" target="${item.link_type}">${item.name}</a>
                    </div>
                    <div class="sub-title">${item.field_one}</div>
                </div>
            </div>
            
        `;
    }).join('');

    return html`
        <style>
            .honocms-home-advantage {
                text-align: center;
            }

            .honocms-home-advantage .box-header {
                margin-top: 70px;
                margin-bottom: 30px;
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
                margin: 40px 0;
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
            .honocms-home-advantage .box-content .block{
                margin: 20px 0;
                padding: 30px 30px;
                border: 1px solid #ebebeb;
                border-radius: 6px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
            }
        </style>
        <div class="honocms-home-advantage">
            <div class="layui-container ">
                <!-- 主要内容 -->
                
                <div class="box-header">
                    <div class="title">${raw(adAdvantageHeader?.name)}</div>
                    <div class="sub-title">${raw(adAdvantageHeader?.field_one)}</div>
                </div>
                <div class="box-content">
                    <div class="layui-row layui-col-space30">
                        <!-- 左侧图片 -->
                        ${raw(htmlAdvantageList)}
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




