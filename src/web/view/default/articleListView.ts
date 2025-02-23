import {html,raw} from "hono/html";
import {Context} from "hono";

export const articleListView = (c:Context,itemList? :any) =>{


    const htmlItemList = itemList?.map((item:any) => {
        // 如果没有子菜单，构建普通菜单项
        return `
            <li>
                <div class="left">
                    <a href="/article/detail/${item.id}">
                        <img alt="" class="img" src="${item.file_path}"/>
                    </a>
                </div>
                <div class="right">
                    <div class="title">
                        <a href="/article/detail/${item.id}">${item.id}</a>
                    </div>
                    <div class="sub-title">${item.id}</div>
                    <div class="time">${item.id}</div>
                </div>
            </li>
            
        `;
    }).join('');

    return html`
        <style>
            .honocms-article-list{}
            .honocms-article-list .box-content{}
            .honocms-article-list .box-content ul{
                position: relative;
            }
            .honocms-article-list .box-content ul li{
                align-items: stretch;
                border-bottom: 1px solid rgb(26 26 26 / 7%);
                display: flex;
                overflow: hidden;
                padding: 20px;
                height: 140px;;
            }
            .honocms-article-list .box-content .left{
                flex-grow: 0;
                flex-shrink: 0;
                padding-right: 20px;
                position: relative;
                width: 30%;
            }
            .honocms-article-list .box-content .left .img{
                height: 100%;
                object-fit: cover;
                width: 100%;
                border-radius: 6px;
            }
            .honocms-article-list .box-content .right{
                display: grid;
                grid-template-rows: min-content auto 24px;
                row-gap: 0;
                width: 100%;
            }

            .honocms-article-list .box-content ul .right .title{
                color: #1a1a1a;
                max-height: 56px;
                text-decoration: none;
                font-size: 18px;
                line-height: 26px;
                margin-bottom: 6px;
            }
            .honocms-article-list .box-content ul .right .sub-title{
                font-size: 14px;
                height: 20px;
                line-height: 20px;
                overflow: hidden;
            }
            .honocms-article-list .box-content ul .right .time{

            }
        </style>
        <div class="honocms-article-list">
            <div class="layui-container ">
                <div class="layui-row layui-col-space20">
                    <div class="layui-col-md9">

                        <div class="box">
                            <div class="box-header">

                            </div>
                            <div class="box-content">
                                <ul>
                                    ${raw(htmlItemList)}
                                </ul>
                            </div>
                            <div class="box-footer">

                            </div>
                        </div>







                    </div>
                    <div class="layui-col-md3">
                        12
                    </div>
                </div>
            </div>
        </div>
        
    `
}


