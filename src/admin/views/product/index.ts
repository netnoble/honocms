import {html,raw} from "hono/html";
import {Context} from "hono";

export const indexView = (c:Context) =>
    html`
        <blockquote class="layui-elem-quote">
            产品列表
        </blockquote>
        <table class="layui-hide" id="honocms-table-list"></table>
        <script type="text/html" id="honocms-table-toolbar">
            <div class="layui-btn-container">
                <button class="layui-btn layui-btn-sm" lay-event="handleClickAdd">添加产品</button>
            </div>
        </script>
        <script type="text/html" id="honocms-table-tools">
            <div class="layui-btn-container">
                <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="handleClickEdit">编辑</a>
                <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="handleClickDelete">删除</a>
            </div>
        </script>
        <script>
            layui.use(['table'], function(){
                let table = layui.table;
                let $ = layui.jquery;
                // 渲染
                let tableElem = 'honocms-table-list'
                let urlTableList = '/admin/api/product/list'
                let urlTableAdd = '/admin/product/add'
                let urlTableEdit = '/admin/product/edit?id='
                let urlTableDelete = '/admin/api/product/delete'
                table.render({
                    elem: '#'+tableElem,
                    url: urlTableList, // 此处为静态模拟数据，实际使用时需换成真实接口
                    page: false,
                    parseData: function(res){ // res 即为原始返回的数据
                        return {
                            "code": res.code===200 ? 0 : res.code, // 解析接口状态
                            "message": res.message || '', // 解析提示文本
                            "count": res.data.count||0, // 解析数据长度
                            "data": res.data.list||[] // 解析数据列表
                        };
                    },
                    defaultToolbar:[//右上角图标工具
                        {
                            // 扩展工具
                            title: '提示', // 标题
                            name: 'tips', // name
                            layEvent: 'LAYTABLE_TIPS', // 事件标识
                            icon: 'layui-icon-refresh', // 图标 className
                            onClick: function(obj) { // 点击事件 - 2.9.12+
                                console.log(obj); // 查看返回的对象成员
                            }
                        },
                        'filter', 'exports', 'print', // 内置工具
                    ],
                    toolbar: '#honocms-table-toolbar',
                    // defaultToolbar:"",//右上角图标工具
                    cols: [[
                        // {type: 'radio', fixed: 'left'},
                        {field:'id', title:'ID', width:80, unresize: true},
                        {field:'title', title:'标题'},
                        {
                            field: 'status', title: '状态', width: 100, templet: function (d) {
                                let str = ''
                                if (d.status === 1) {
                                    str = '启用'
                                } else {
                                    str = '禁用'
                                }
                                return str;
                            }
                        },
                        {field:'created_at', title:'添加时间', width:160},
                        {title: "操作", fixed: 'right', width: 160, align: 'center', toolbar: "#honocms-table-tools"},
                    ]],

                });

                // 头工具栏事件
                table.on('toolbar('+tableElem+')', function(obj){
                    let layEvent = obj.event; // 获取 lay-event 对应的值
                    let trData = obj.data;

                    if (layEvent === 'LAYTABLE_TIPS') {
                        // layer.msg('你点击了提示按钮');
                        table.reloadData(tableElem)
                    }else if(layEvent === 'handleClickAdd'){
                        openPage('添加产品',urlTableAdd)
                    }
                });
                // 单元格工具事件
                table.on('tool('+tableElem+')', function(obj){
                    let layEvent = obj.event; // 获取 lay-event 对应的值
                    let trData = obj.data;

                    if (layEvent === 'handleClickEdit'){
                        openPage('编辑产品',urlTableEdit + trData.id)
                    }else if (layEvent === 'handleClickDelete'){
                        deleteItem(urlTableDelete, trData.id, tableElem);
                    }
                });

                function openPage(title, content, area = ['82%', '90%']) {
                    let index = layer.open({
                        title: title,
                        type: 2,
                        shade: 0.2,
                        maxmin: true,
                        shadeClose: false,
                        area: area,
                        content: content,
                    });
                    $(window).on("resize", function () {
                        layer.full(index);
                    });
                }

                function deleteItem(url, id, tableId) {
                    layer.confirm('确定要删除吗？', {icon: 3, title: '提示'}, function (index) {
                        RequestUtil.apiPost(url, {id: id},
                                function (res) {
                                    table.reload(tableId);
                                    // 关闭确认弹窗
                                    layer.close(index);

                                    // 可以在这里添加一个成功消息提示
                                    layer.msg('删除成功', {icon: 1});
                                },
                                function (err) {
                                    layer.msg(res.msg, {icon: 2});
                                }
                        );
                    });
                }

            });
        </script>

    `



