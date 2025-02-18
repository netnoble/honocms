//src/routes/indexRoute.ts
import { Hono } from "hono";
import {commonLayout} from "@/web/view/default/commonLayout";
import {indexView} from "@/web/view/default/indexView"


// function generateThemeModules(basePath: string, themes: string[]): { [key: string]: () => Promise<any> } {
//     let modules: { [key: string]: () => Promise<any> } = {};
//     themes.forEach(theme => {
//         modules[theme] = () => import(/* @vite-ignore */ `${basePath}/${theme}/index`);
//     });
//     return modules;
// }
//
// const themeModules = {
//     ...generateThemeModules("@/web/view", ["default", "red", /* 其他主题 */]),
//     // 如果有特殊处理的主题，可以在这里单独添加
// };
const app = new Hono();
app.get("/", async (c:any) => {

    return c.html(commonLayout(indexView(c), c));
})

export default app;