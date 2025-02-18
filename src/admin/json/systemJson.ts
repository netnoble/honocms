import {and, desc, eq, sql} from 'drizzle-orm';
//系统信息
export const systemSeedJson = () => {
  return [
      {
          title: "网站状态",
          key: "site_status",
          type: "radio",
          options: '[{"label": "启用", "value": "1"},{"label": "禁用", "value": "2"}]',
          value: "1",
          sort: 1,
          status: 1,
          is_deleted: 1,
          created_at:  sql`datetime('now')`,
          updated_at:  sql`datetime('now')`
      },
      {
          title: "网站名称",
          key: "site_name",
          type: "input",
          options: "",
          value: "",
          sort: 1,
          status: 1,
          is_deleted: 1,
          created_at:  sql`datetime('now')`,
          updated_at:  sql`datetime('now')`
      },
      {
          title: "网站LOGO",
          key: "site_logo",
          type: "image",
          options: "",
          value: "",
          sort: 1,
          status: 1,
          is_deleted: 1,
          created_at:  sql`datetime('now')`,
          updated_at:  sql`datetime('now')`
      },
      {
          title: "网站网址",
          key: "site_url",
          type: "input",
          options: "",
          value: "",
          sort: 1,
          status: 1,
          is_deleted: 1,
          created_at:  sql`datetime('now')`,
          updated_at:  sql`datetime('now')`
      },
      {
          title: "版权信息",
          key: "site_copyright",
          type: "textarea",
          options: "",
          value: "",
          sort: 1,
          status: 1,
          is_deleted: 1,
          created_at:  sql`datetime('now')`,
          updated_at:  sql`datetime('now')`
      },
      {
          title: "站点统计",
          key: "site_html_code",
          type: "textarea",
          options: "",
          value: "",
          sort: 1,
          status: 1,
          is_deleted: 1,
          created_at:  sql`datetime('now')`,
          updated_at:  sql`datetime('now')`
      },
  ]
}