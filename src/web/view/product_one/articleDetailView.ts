import {html,raw} from "hono/html";
import {Context} from "hono";

export const articleDetailView = (c:Context,itemDetail? :any) =>{



    return html`
        <style>
            .honocms-detail-list{}
            .honocms-detail-list .article-detail{
                padding: 20px;
            }
            .honocms-detail-list .article-detail .h1{
                font-size: 36px;
                line-height: 50px;
                padding-top: 0;
                padding-bottom: 27px;
                font-weight: 600;
            }
            .honocms-detail-list .article-detail .box-content{
                color: #2f3340;
                font-size: 14px;
                margin-bottom: 10px;
                line-height: 1.8;
                overflow: hidden;
                white-space: normal;
                word-wrap: break-word;
                word-break: normal;
            }
            .honocms-detail-list .article-detail .box-content img {
                max-width: 100%;
                height: auto;
                border-radius: 5px;
                margin: 10px auto;
                display: block;
            }
        </style>
        <div class="honocms-detail-list">
            <div class="layui-container ">
                <div class="layui-row layui-col-space20">
                    <div class="layui-col-md9">

                        <div class="box article-detail">
                            <div class="box-header">
                                <h1>${itemDetail.title}</h1>
                                <div class="sub-title"></div>
                            </div>
                            <div class="box-content">
                                ${itemDetail.content}
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



