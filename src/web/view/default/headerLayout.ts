import {html,raw} from "hono/html";
import {Context} from "hono";
import {getNavList} from "@/web/logic/navLogic";
import {getAdList} from "@/web/logic/adLogic";

export const headerLayout = async (c: Context ) => {
    //查询nav信息
    const navList = await getNavList(c);
    const adList = await getAdList(c,'nav_top_right');

    const renderedNav = navList.map((item:any) => {
        // 判断是否有子菜单
        if (item.children && item.children.length > 0) {
            // 如果有子菜单，构建带有下拉选项的菜单项
            const childrenItems = item.children.map((child:any) =>
                `<dd><a href="">${child.name}</a></dd>`
            ).join('');

            return `
            <li class="layui-nav-item">
                <a href="javascript:;">${item.name}</a>
                <dl class="layui-nav-child">
                    ${childrenItems}
                </dl>
            </li>
        `;
        } else {
            // 如果没有子菜单，构建普通菜单项
            return `
            <li class="layui-nav-item">
                <a href="">${item.name}</a>
            </li>
        `;
        }
    }).join('');

    const topRightNav = adList.map((item:any) => {
        // 如果没有子菜单，构建普通菜单项
        return `
            <a href="${item.url}" target="${item.link_type}">${item.name}</a>
        `;
    }).join('');




    return html`
    
    <header class="honocms-header">
        <nav class="layui-container">
            <div class="layui-row">
                <div class=" layui-col-xs11 layui-col-md2">
                    <div class="honocms-logo">
                        <a href="#" class="">HonoCMS</a>
                    </div>
                   
                </div>
                <div class="layui-col-xs1 honocms-nav-icon layui-hide">
                    <i class="layui-icon layui-icon-shrink-right" lay-on="handleClickNav"></i>
                </div>
                
                <div class=" layui-col-xs12 layui-col-md8 honocms-nav">
                    <ul class="layui-nav layui-bg-white">
                        ${raw(renderedNav)}
                    </ul>
                </div>
                <div class="layui-col-xs12 layui-col-md2 honocms-nav-right">
                    ${raw(topRightNav)}
                </div>
            </div>
            
            <div id="honocms-side-nav" style="display: none">
                <ul class="layui-nav layui-nav-tree layui-bg-white">
                    ${raw(renderedNav)}
                </ul>

                <div class="honocms-side-nav-footer">
                    ${raw(topRightNav)}
                </div>
                
            </div>
            
            
            
        </nav>
    </header>


    <script>
        layui.use(function () {
            let element = layui.element;
            let layer = layui.layer;
            let util = layui.util;
            let $ = layui.$;
            // 初始化导航栏
            element.render('nav');

            util.on('lay-on', {
                'handleClickNav':function(){
                    layer.open({
                        type: 1,
                        offset: 'l',
                        title: 'HonoCMS',
                        anim: 'slideRight', // 从左往右
                        area: ['260px', '100%'],
                        shade: 0,
                        move: false,
                        shadeClose: false,
                        id: 'ID-demo-layer-direction-l',
                        content: $('#honocms-side-nav')
                    });
                }
            })
        });
    </script>
`
}

