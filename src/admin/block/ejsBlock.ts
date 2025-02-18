import { html, raw } from "hono/html";
import { Context } from "hono";

// 示例数组数据
const articles = [
    { id: 1, title: "文章1", content: "这是文章1的内容" },
    { id: 2, title: "文章2", content: "这是文章2的内容" },
    { id: 3, title: "文章3", content: "这是文章3的内容" }
];

// 渲染数组数据
const articlesHtml = articles.map(article => html`
    <div class="article">
        <h2>${article.title}</h2> <!-- 直接插入普通文本 -->
        <p>${article.content}</p> <!-- 直接插入普通文本 -->
        <a href="/article/${article.id}">查看详情</a>
    </div>
`).join(""); // 将数组中的 HTML 片段拼接成一个字符串

export const ejsBlock = (c: Context) => html`
    ${raw(articlesHtml)} <!-- 使用 raw 确保 HTML 内容不被转义 -->
`;