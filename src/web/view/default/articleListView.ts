import {html,raw} from "hono/html";
import {Context} from "hono";

export const articleListView = (c:Context) =>{


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
                                    <li>
                                        <div class="right">
                                            <div class="title">
                                                <a href="/article/detail/12">微动态容易出爆款的领域有四大类，分别是新闻，故事，家庭情感，鸡汤。这四大类中最受欢迎的是什么？是情感题材。</a>
                                            </div>
                                            <div class="sub-title">微动态容易出爆款的领域有四大类，分别是新闻，故事，家庭情感，鸡汤。这四大类中最受欢迎的是什么？是情</div>
                                            <div class="time">2024-09-02</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="left">
                                            <a href="">
                                                <img alt="" class="img" src="https://pic.rmb.bdstatic.com/bjh/4ba6f0ef7da669647ea953fb50dde7b08384.png@c_1,w_1177,h_785,x_0,y_0"/>
                                            </a>
                                        </div>
                                        <div class="right">
                                            <div class="title">
                                                <a href="#">微动态容易出爆款的领域有四大类，分别是新闻，故事，家庭情感，鸡汤。这四大类中最受欢迎的是什么？是情感题材。</a>
                                            </div>
                                            <div class="sub-title">微动态容易出爆款的领域有四大类，分别是新闻，故事，家庭情感，鸡汤。这四大类中最受欢迎的是什么？是情</div>
                                            <div class="time">2024-09-02</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="left">
                                            <img alt="" class="img" src="https://pic.rmb.bdstatic.com/bjh/4ba6f0ef7da669647ea953fb50dde7b08384.png@c_1,w_1177,h_785,x_0,y_0"/>
                                        </div>
                                        <div class="right">
                                            <div class="title">
                                                <a href="#">微动态容易出爆款的领域有四大类，分别是新闻，故事，家庭情感，鸡汤。这四大类中最受欢迎的是什么？是情感题材。</a>
                                            </div>
                                            <div class="sub-title"></div>
                                            <div class="time">2024-09-02</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="right">
                                            <div class="title">
                                                <a href="#">微动态容易出爆款的领域有四大类，分别是新闻，故事，家庭情感，鸡汤。这四大类中最受欢迎的是什么？是情感题材。</a>
                                            </div>
                                            <div class="sub-title"></div>
                                            <div class="time">2024-09-02</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="left">
                                            <img alt="" class="img" src="https://pic.rmb.bdstatic.com/bjh/4ba6f0ef7da669647ea953fb50dde7b08384.png@c_1,w_1177,h_785,x_0,y_0"/>
                                        </div>
                                        <div class="right">
                                            <div class="title">
                                                <a href="#">微动态容易出爆款的领域有四大类，分别是新闻，故事，家庭情感，鸡汤。这四大类中最受欢迎的是什么？是情感题材。</a>
                                            </div>
                                            <div class="sub-title"></div>
                                            <div class="time">2024-09-02</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="left">
                                            <img alt="" class="img" src="https://pic.rmb.bdstatic.com/bjh/4ba6f0ef7da669647ea953fb50dde7b08384.png@c_1,w_1177,h_785,x_0,y_0"/>
                                        </div>
                                        <div class="right">
                                            <div class="title">
                                                <a href="#">微动态容易出爆款的领域有四大类，分别是新闻，故事，家庭情感，鸡汤。这四大类中最受欢迎的是什么？是情感题材。</a>
                                            </div>
                                            <div class="sub-title"></div>
                                            <div class="time">2024-09-02</div>
                                        </div>
                                    </li>
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


