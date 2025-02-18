import {html} from "hono/html";
import {Context} from "hono";

export const footerLayout = (c:Context) => html`
    <div class="wp">
        <footer class="honocms-text-center">
            底部固定区域2
        </footer>
    </div>

`