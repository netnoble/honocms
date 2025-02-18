import {html,raw} from "hono/html";
import {Context} from "hono";

export const indexView = (c:Context) =>
    html`
        <blockquote class="layui-elem-quote">
            导航菜单
        </blockquote>
        <table class="layui-hide" id="honocms-table-list"></table>
        <script type="text/html" id="honocms-table-toolbar">
            <div class="layui-btn-container">
                <button class="layui-btn layui-btn-sm" lay-event="handleClickAdd">添加导航</button>
            </div>
        </script>
        <script type="text/html" id="honocms-table-tools">
            <div class="layui-btn-container">
                <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="handleClickEdit">编辑</a>
                <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="handleClickDelete">删除</a>
            </div>
        </script>
        <script>
            layui.use(['table', 'treeTable'], function () {
                let table = layui.table;
                let treeTable = layui.treeTable;
                let $ = layui.jquery;
                // 渲染
                let tableElem = 'honocms-table-list'
                let urlTableList = '/admin/api/nav/list'
                let urlTableAdd = '/admin/nav/add'
                let urlTableEdit = '/admin/nav/edit?id='
                let urlTableDelete = '/admin/api/nav/delete'
                treeTable.render({
                    elem: '#' + tableElem,
                    url: urlTableList, // 此处为静态模拟数据，实际使用时需换成真实接口
                    page: false,
                    parseData: function (res) { // res 即为原始返回的数据
                        return {
                            "code": res.code === 200 ? 0 : res.code, // 解析接口状态
                            "message": res.message || '', // 解析提示文本
                            "count": res.total || 0, // 解析数据长度
                            "data": res.data || [] // 解析数据列表
                        };
                    },
                    tree: {
                        view: {
                            showIcon: true,
                            iconOpen: 'tree-table-icon layui-icon layui-icon-folder-open',
                            iconClose: 'tree-table-icon layui-icon layui-icon-folder',
                            iconLeaf: 'tree-table-icon layui-icon layui-icon-folder',
                            // 默认展开全部
                            expandAllDefault: true
                        }
                    },
                    defaultToolbar: [//右上角图标工具
                        {
                            // 扩展工具
                            title: '提示', // 标题
                            name: 'tips', // name
                            layEvent: 'LAYTABLE_TIPS', // 事件标识
                            icon: 'layui-icon-refresh', // 图标 className
                            onClick: function (obj) { // 点击事件 - 2.9.12+
                                console.log(obj); // 查看返回的对象成员
                            }
                        },
                        'filter', 'exports', 'print', // 内置工具
                    ],
                    toolbar: '#honocms-table-toolbar',
                    // defaultToolbar:"",//右上角图标工具
                    cols: [[
                        // {type: 'radio', fixed: 'left'},
                        {field: 'id', title: 'ID', width: 80, unresize: true},
                        {field: 'name', title: '分类名称'},
                        {field: 'remark', title: '备注', width: 200},
                        {field: 'sort', title: '排序', width: 80},
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
                        {field: 'created_at', title: '时间', width: 200},
                        {title: "操作", fixed: 'right', width: 160, align: 'center', toolbar: "#honocms-table-tools"},
                    ]],

                });

                // 头工具栏事件
                treeTable.on('toolbar(' + tableElem + ')', function (obj) {
                    let layEvent = obj.event; // 获取 lay-event 对应的值
                    let trData = obj.data;
                    
                    if (layEvent === 'LAYTABLE_TIPS') {
                        // layer.msg('你点击了提示按钮');
                        treeTable.reloadData(tableElem)
                    } else if (layEvent === 'handleClickAdd') {
                        openPage('添加导航', urlTableAdd)
                    }
                });
                // 单元格工具事件
                treeTable.on('tool(' + tableElem + ')', function (obj) {
                    let layEvent = obj.event; // 获取 lay-event 对应的值
                    let trData = obj.data;
                    
                    if (layEvent === 'handleClickEdit') {
                        openPage('编辑导航', urlTableEdit + trData.id)
                    } else if (layEvent === 'handleClickDelete') {
                        deleteItem(urlTableDelete, trData.id, tableElem);
                    }
                });

                function openPage(title, content, area = ['960px', '800px']) {
                    console.log('编辑', content)
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
                                    treeTable.reload(tableId);
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



