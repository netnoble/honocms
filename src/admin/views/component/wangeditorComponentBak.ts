import { html, raw } from "hono/html";
import { Context } from "hono";

export const wangeditorComponent = (c: Context, content: any) => {
    // 如果 content 是 undefined 或者 null，则提供一个默认值
    const initialContent = content ? content : '<p>测试2</p>';
    console.log('editor 444 content', initialContent);

    return html`
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/wangeditor5/5.1.23/css/style.min.css" />
        <style>
            #editor-wrapper {
                border: 1px solid #ccc;
                z-index: 100; /* 按需定义 */
            }
            #toolbar-container {
                border-bottom: 1px solid #ccc;
            }
            #editor-container {
                min-height: 300px;
            }
            #editor-content-textarea {
                width: 100%;
                height: 100px;
                outline: none;
                border: 1px solid #ccc;
            }
        </style>
        <div id="editor-wrapper">
            <div id="toolbar-container"><!-- 工具栏 --></div>
            <div id="editor-container"><!-- 编辑器 --></div>
            <!-- 显示内容 -->
            <textarea id="editor-content-textarea" style="display: none"></textarea>
            <div id="editor-submit">完成</div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/wangeditor5/5.1.23/index.js"></script>
        <script>
            document.addEventListener("DOMContentLoaded", function() {
                // 查找提交按钮并添加点击事件监听器
                const submitButton = document.getElementById('editor-submit');
                const editorContainerDisplay = document.getElementById('editor-container');
                const textareaDisplay = document.getElementById('editor-content-textarea');
               
                // 自定义 HTML 源码菜单
                class MyMenu {
                    constructor() {
                        this.title = 'HTML';
                        this.tag = 'button';
                        this.key = 'htmlCode';
                    }
                    getValue(editor) {
                        return '';
                    }
                    isActive(editor) {
                        return false;
                    }
                    isDisabled(editor) {
                        return false;
                    }
                    exec(editor, value) {
                        // 切换到 HTML 源码模式
                        const html = editor.getHtml();
                        console.log('test----1111',html)
                        // document.getElementById('editor-content-textarea').value = html;
                        // 如果当前是富文本模式，切换到 HTML 源码模式
                        textareaDisplay.value = html; // 将编辑器内容赋值给 textarea
                        textareaDisplay.style.display = 'block'; // 显示 textarea
                        editorContainerDisplay.style.display = 'none'; // 隐藏编辑器
                        textareaDisplay.focus(); // 将焦点切换到 textarea
                    }
                }
                const myMenuConf = {
                    key: 'htmlCode',
                    factory() {
                        return new MyMenu();
                    }
                };
                const { createEditor, createToolbar, Boot } = window.wangEditor;
                // 注册自定义菜单
                Boot.registerMenu(myMenuConf);

                const editorConfig = {
                    placeholder: 'Type here...',
                    onChange(editor) {
                        const html = editor.getHtml();
                        console.log('更改中', html);
                        document.getElementById('editor-content-textarea').value = html;
                    },
                };

                // 创建编辑器实例
                window.wangEditorInstance = createEditor({
                    selector: '#editor-container',
                    config: editorConfig,
                    mode: 'default',
                });

                // 设置初始内容
                if (window.wangEditorInstance) {
                    setTimeout(() => {
                        window.wangEditorInstance.setHtml('${raw(initialContent)}');
                    }, 0);
                }

                const toolbarConfig = {
                    insertKeys: {
                        index: 0,
                        keys: ['htmlCode'],
                    },
                    excludeKeys: [],
                };

                createToolbar({
                    editor: window.wangEditorInstance,
                    selector: '#toolbar-container',
                    config: toolbarConfig,
                    mode: 'default',
                });

                submitButton.addEventListener('click', function() {
                    // 隐藏textarea
                    textareaDisplay.style.display = 'none';
                    editorContainerDisplay.style.display = 'block';
                    
                    console.log('dedede',textareaDisplay.value)
                    window.wangEditorInstance.setHtml(textareaDisplay.value);

                    editorContainerDisplay.focus();
                });
            });
        </script>
    `;
};