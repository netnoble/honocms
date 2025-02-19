import {html, raw} from "hono/html";
import {Context} from "hono";

export const footerLayout = (c:Context,siteInfo?:any) => html`
    <div class="honocms-height-10"></div>
    <footer>
      <div class="layui-container">
      </div>
    
      <div class="honocms-copyright">
          <div class="layui-container">
              ${raw(siteInfo)}
          </div>
      </div>
  </footer>
`