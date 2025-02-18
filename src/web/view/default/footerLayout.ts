import {html} from "hono/html";
import {Context} from "hono";

export const footerLayout = (c:Context) => html`
  <footer>
      <div class="layui-container">
          <address>My Address...</address>
      </div>
    
  </footer>
`