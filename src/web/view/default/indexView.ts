import {html,raw} from "hono/html";
import {Context} from "hono";
import {homeBannerComponent} from "@/web/view/default/component/homeBannerComponent";
import {homeAdvantageComponent} from "@/web/view/default/component/homeAdvantageComponent";

export const indexView = (c:Context) =>
    html`
        <div>
            ${homeBannerComponent(c)}
        </div>
        <div>
            ${homeAdvantageComponent(c)}
        </div>
        
        
        <div class="layui-container">
            <div class="layui-row layui-col-space20">

                <!-- 右侧描述 -->
                <div class="layui-col-md12">
                    <div class="layui-panel" style="padding: 20px;">
                        <p>Honocms 是一个致力于为用户提供卓越网站构建体验的开源项目。</p>
                        <p>无论你是开发者还是普通用户，Honocms 都能为你提供强大的功能和灵活的操作方式。</p>
                        <button class="layui-btn layui-btn-lg layui-btn-normal">了解更多</button>
                    </div>
                </div>
            </div>

            <div class="layui-row layui-col-space20">

                <!-- 右侧描述 -->
                <div class="layui-col-md12">
                    <div class="layui-panel" style="padding: 20px;">
                        <p>Honocms 是一个致力于为用户提供卓越网站构建体验的开源项目。</p>
                        <p>无论你是开发者还是普通用户，Honocms 都能为你提供强大的功能和灵活的操作方式。</p>
                        <button class="layui-btn layui-btn-lg layui-btn-normal">了解更多</button>
                    </div>
                </div>
            </div>

            <div class="layui-row layui-col-space20">

                <!-- 右侧描述 -->
                <div class="layui-col-md12">
                    <div class="layui-panel" style="padding: 20px;">
                        <p>Honocms 是一个致力于为用户提供卓越网站构建体验的开源项目。</p>
                        <p>无论你是开发者还是普通用户，Honocms 都能为你提供强大的功能和灵活的操作方式。</p>
                        <button class="layui-btn layui-btn-lg layui-btn-normal">了解更多</button>
                    </div>
                </div>
            </div>

            <div class="layui-row layui-col-space20">

                <!-- 右侧描述 -->
                <div class="layui-col-md12">
                    <div class="layui-panel" style="padding: 20px;">
                        <p>Honocms 是一个致力于为用户提供卓越网站构建体验的开源项目。</p>
                        <p>无论你是开发者还是普通用户，Honocms 都能为你提供强大的功能和灵活的操作方式。</p>
                        <button class="layui-btn layui-btn-lg layui-btn-normal">了解更多</button>
                    </div>
                </div>
            </div>

            <div class="layui-row layui-col-space20">

                <!-- 右侧描述 -->
                <div class="layui-col-md12">
                    <div class="layui-panel" style="padding: 20px;">
                        <p>Honocms 是一个致力于为用户提供卓越网站构建体验的开源项目。</p>
                        <p>无论你是开发者还是普通用户，Honocms 都能为你提供强大的功能和灵活的操作方式。</p>
                        <button class="layui-btn layui-btn-lg layui-btn-normal">了解更多</button>
                    </div>
                </div>
            </div>

            <div class="layui-row layui-col-space20">

                <!-- 右侧描述 -->
                <div class="layui-col-md12">
                    <div class="layui-panel" style="padding: 20px;">
                        <p>Honocms 是一个致力于为用户提供卓越网站构建体验的开源项目。</p>
                        <p>无论你是开发者还是普通用户，Honocms 都能为你提供强大的功能和灵活的操作方式。</p>
                        <button class="layui-btn layui-btn-lg layui-btn-normal">了解更多</button>
                    </div>
                </div>
            </div>

            <div class="layui-row layui-col-space20">

                <!-- 右侧描述 -->
                <div class="layui-col-md12">
                    <div class="layui-panel" style="padding: 20px;">
                        <p>Honocms 是一个致力于为用户提供卓越网站构建体验的开源项目。</p>
                        <p>无论你是开发者还是普通用户，Honocms 都能为你提供强大的功能和灵活的操作方式。</p>
                        <button class="layui-btn layui-btn-lg layui-btn-normal">了解更多</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="layui-container">

            <!-- 功能特点 -->
            <div class="layui-row layui-col-space20" style="margin-top: 30px;">
                <h2 style="text-align: center; color: #555;">功能特点</h2>
                <div class="layui-col-md4">
                    <div class="layui-panel" style="height: 100%;">
                        <h3>易用性</h3>
                        <p>简单直观的界面设计，让你轻松上手。</p>
                    </div>
                </div>
                <div class="layui-col-md4">
                    <div class="layui-panel" style="height: 100%;">
                        <h3>可定制性</h3>
                        <p>丰富的插件和主题选择，满足你的个性化需求。</p>
                    </div>
                </div>
                <div class="layui-col-md4">
                    <div class="layui-panel" style="height: 100%;">
                        <h3>社区支持</h3>
                        <p>活跃的社区支持，帮助你解决遇到的各种问题。</p>
                    </div>
                </div>
            </div>
        </div>
        <script>
            layui.use(['table'], function(){
                let $ = layui.jquery;
                

            });
        </script>

    `



