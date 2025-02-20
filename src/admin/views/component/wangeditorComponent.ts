import { html, raw } from "hono/html";
import { Context } from "hono";
import {getNanoid} from "@/utils/commonUtil";

export const wangeditorComponent = (c: Context, content: any) => {
    // 如果 content 是 undefined 或者 null，则提供一个默认值
    const initialContent = content ? content : '<p></p>';
    const initialElementId=  getNanoid();
    console.log('editor 444 content', initialContent);

    return html`
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/wangeditor5/5.1.23/css/style.min.css" />
        <style>
            #editor-wrapper-${raw(initialElementId)} {
                border: 1px solid #ccc;
                z-index: 100; /* 按需定义 */
            }
            #toolbar-container-${raw(initialElementId)} {
                border-bottom: 1px solid #ccc;
            }
            #editor-container-${raw(initialElementId)} {
                min-height: 300px;
            }
        </style>
        <div id="editor-wrapper-${raw(initialElementId)}">
            <div id="toolbar-container-${raw(initialElementId)}"><!-- 工具栏 --></div>
            <div id="editor-container-${raw(initialElementId)}"><!-- 编辑器 --></div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/wangeditor5/5.1.23/index.js"></script>
        <script>
            document.addEventListener("DOMContentLoaded", function() {
                const { createEditor, createToolbar, Boot } = window.wangEditor;

                const editorConfig = {
                    placeholder: 'Type here...',
                    onChange(editor) {
                    },
                };

                // 创建编辑器实例
                window.wangEditorInstance = createEditor({
                    selector: '#editor-container-${raw(initialElementId)}',
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
                    excludeKeys: [],
                };

                createToolbar({
                    editor: window.wangEditorInstance,
                    selector: '#toolbar-container-${raw(initialElementId)}',
                    config: toolbarConfig,
                    mode: 'default',
                });
            });
        </script>
    `;
};