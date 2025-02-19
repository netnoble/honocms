import {html, raw} from "hono/html";
import {Context} from "hono";

export const footerLayout = (c:Context,seoInfo?:any) => html`
  <footer>
      <div class="layui-container">
          ${raw(seoInfo.site_copyright)}
      </div>
    
  </footer>
`