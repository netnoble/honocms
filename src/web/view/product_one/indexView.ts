import {html,raw} from "hono/html";
import {Context} from "hono";
import {homeBannerComponent} from "@/web/view/default/component/homeBannerComponent";
import {homeAdvantageComponent} from "@/web/view/default/component/homeAdvantageComponent";
import {homeBusinessComponent} from "@/web/view/default/component/homeBusinessComponent";

export const indexView = (c:Context) =>
    html`
        <div>
            ${homeBannerComponent(c)}
        </div>
        <div>
            ${homeAdvantageComponent(c)}
        </div>
        <div>
            ${homeBusinessComponent(c)}
        </div>
        
        
        
        
        <script>
            layui.use(['table'], function(){
                let $ = layui.jquery;
                

            });
        </script>

    `



