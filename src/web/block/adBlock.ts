import {html} from "hono/html";
import {Context} from "hono";

export const footerLayout = (c:Context) => html`
  <footer>
    <address>My Address...</address>
  </footer>
`



